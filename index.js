
const API_KEY = /*Your api key here*/;

function watchUsernameFormSubmit() {
  $('#get-repos-form').on('submit', e => {
    e.preventDefault();
    $('#errors').html('');
    $('#results').html('');

    const username = $('#repos').val().toLowerCase();
    if(!repos.length){
      return $('#errors').html('Please enter a username');
    }
    $('#repos').val('');
    getReposFromApi(username);
  })
}

function getReposFromApi(username){
  const url = `https://api.github.com/users/${username}/repos`;

  const settings = {
    headers: new Headers({
      'Authorization':{
        'token': API_KEY
      }
    })
  }

  fetch(url, settings)
    .then(res => {
      if (res.ok){
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(results => {
      if(!results.length){
        $('#errors').html("Sorry, we could not find any results for that username");
      }
      decorateResults(results)
    })
    .catch(e => {
      $('#errors').html(e);
    });
}

function decorateResults(results){
  const decorated = results.map(result => {
    return decorateSingleResult(result);
  })
  $('#results').html(decorated);
}


function decorateSingleResult(result){
  return `
    <li>
      <h2>${result.name}:
        <a href="${result.html_url}">${result.name} repo</a>
      </h2>
    </li>
  `;
}

$(watchUsernameFormSubmit);

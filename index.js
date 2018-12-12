
function watchUsernameFormSubmit() {
  $('#get-repos-form').on('submit', e => {
    e.preventDefault();
    console.log('called');
    $('#errors').html('');
    $('#results').html('');

    const username = $('#repos').val().toLowerCase();
    if(repos.length === 0){
      return $('#errors').html('Please enter a username');
    }
    $('#repos').val('');
    getReposFromApi(username);
  })
}

function getReposFromApi(breed){
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  fetch(url)
    .then(res => {
      if (res.ok){
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(results => {
      decorateResults(results.message)
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


function decorateSingleResult(result,breed){
  const decorated =  `
    <li>
      <img src="${result}" alt="A random image of ${breed} breed">
    </li>
  `;
  $('#results').html(decorated);
}

$(watchUsernameFormSubmit);

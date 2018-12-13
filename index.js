
const API_KEY = /*Your api key here*/;

function watchFormSubmit() {
  $('#get-parks-form').on('submit', e => {
    e.preventDefault();
    $('#errors').html('');
    $('#results').html('');

    const states = $('#states').val().toLowerCase();
    const limit = $('#result-count').val();

    $('#states').val('');
    $('#result-count').val('');
    getParksFromApi(states,limit);
  })
}

function getParksFromApi(states, limit = 10){
  const url = `https://api.nps.gov/api/v1/parks?stateCode=${states}&limit=${limit}&api_key=${API_KEY}&start=0&fields=addresses`;

  fetch(url)
    .then(res => {
      if (res.ok){
        return res.json();
      }
      throw new Error(res.statusText);
    })
    .then(results => {
      if(!results.data.length){
        $('#errors').html("Sorry, we could not find any results for that query");
      }
      console.log(results);
       decorateResults(results.data);
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
  const address = result.addresses.filter(address => !"Physical".localeCompare(address.type))[0];
  return `
    <li>
      <h2>${result.fullName}:</h2>
        <a href="${result.url}">${result.name} Website</a>
        <h3>Description:</h3>
        <p>${result.description}</p>
        <h3>Address:</h3>
        <p>${address.line1}  ${address.city}  ${address.stateCode} ${address.postalCode}</p>
        <hr>
    </li>
  `;
}

$(watchFormSubmit);

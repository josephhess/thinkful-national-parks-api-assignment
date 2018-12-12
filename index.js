
function watchDogFormSubmit() {
  $('#get-dogs-form').on('submit', e => {
    e.preventDefault();
    $('#errors').html('');
    $('#results').html('');

    const breed = $('#dog-breed').val().toLowerCase();
    if(breed.length === 0){
      return $('#errors').html('Please enter a breed');
    }
    $('#dog-breed').val('');
    getDogsFromApi(breed);
  })
}

function getDogsFromApi(breed){
  const url = `https://dog.ceo/api/breed/${breed}/images/random`;
  fetch(url)
    .then(res => res.json())
    .then(results => {
      if (results.status === 'error'){
        throw new Error(`${results.message}, please try again`)
      }
      decorateSingleResult(results.message)
    })
    .catch(e => {
      $('#errors').html(e);
    });
}

function decorateSingleResult(result,breed){
  const decorated =  `
    <li>
      <img src="${result}" alt="A random image of ${breed} breed">
    </li>
  `;
  $('#results').html(decorated);
}

$(watchDogFormSubmit);


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
    .then(res => {
      if (res.status === 200){
        return res.json();
      } else {
        throw new Error('That breed was not found, please try a different breed');
      }
    })
    .then(results => {
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

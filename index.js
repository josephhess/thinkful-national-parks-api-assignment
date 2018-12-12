const BASE_URL = 'https://dog.ceo/api/breeds/image/random/';

function watchDogFormSubmit() {
  $('#get-dogs-form').on('submit', e => {
    e.preventDefault();
    const count = $('#dog-count').val();
    $('#dog-count').val(3);
    getDogsFromApi(count);
  })
}


function getDogsFromApi(count){
  const url = `${BASE_URL}${count}`;
  fetch(url)
    .then(res => res.json())
    .then(results => console.log(results.message))
    .catch(e => console.log(e));
}

$(watchDogFormSubmit);

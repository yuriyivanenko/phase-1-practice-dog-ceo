const imageDiv = document.querySelector('#dog-image-container')
const dogBreedsUL = document.querySelector('#dog-breeds')
const breedFilter = document.querySelector('#breed-dropdown')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

const allBreedsArray = []

const fetchRandomDog = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(handleRandomSuccess)
    .catch(handleError)
}

const fetchBreeds = (url) => {
  fetch(url)
    .then(res => res.json())
    .then(handleBreedsSuccess)
    .catch(handleError)
}

const filterBreeds = (e) => {
  if(e.target.value !== 'all'){
    const filteredArray = allBreedsArray.filter(breed => breed.charAt(0) === e.target.value)
    renderBreed(filteredArray)
  }else{
    renderBreed(allBreedsArray)
  }
  window.scrollBy({
    top: 200,
    behavior: 'smooth'
  })
}

const handleRandomSuccess = (data) => data.message.forEach(renderImage)

const handleBreedsSuccess = (data) => {
  for(const breed in data.message){
    allBreedsArray.push(breed)
  }
  renderBreed(allBreedsArray)
}

const capitalizeBreed = (breedString) => breedString.charAt(0).toUpperCase() + breedString.slice(1)

const renderBreed = (breedsArray) => {
  dogBreedsUL.innerHTML = ''
  breedsArray.forEach(breed => {
    const li = document.createElement('li')
    li.textContent = capitalizeBreed(breed)
    li.addEventListener('click', changeColor)
    dogBreedsUL.appendChild(li)
  })
}

const renderImage = (image) => {
  const img = document.createElement('img')
  img.src = image
  img.style.width = '500px'
  imageDiv.appendChild(img)
}

const changeColor = (e) => e.target.style.color = getRandomColor()

function getRandomColor() {
  const hexLetters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += hexLetters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const handleError = (error) => {
  console.log(error)
  alert('Something went wrong when fetching! Check the console.')
}

const setFilter = () => breedFilter.value = 'all'

const initApp = () => {
  fetchRandomDog(imgUrl)
  fetchBreeds(breedUrl)
  document.addEventListener('DOMContentLoaded', setFilter)
  breedFilter.addEventListener('change', filterBreeds)
}

initApp()


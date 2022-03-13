//Buttons
const frontDropBtn = document.querySelector('.skills__frontend-btn');
const designDropBtn = document.querySelector('.skills__design-btn');
const backendDropBtn = document.querySelector('.skills__backend-btn');
//Blocks
const frontList = document.querySelector('.skills__list-frontend');
const designList = document.querySelector('.skills__list-design');
const backendList = document.querySelector('.skills__list-backend');

frontDropBtn.addEventListener('click', () => {
  if(frontList.classList.contains('skills__list')){
    frontList.classList.toggle('skills__list-active')
  }
})

designDropBtn.addEventListener('click', () => {
  if(designList.classList.contains('skills__list')){
    designList.classList.toggle('skills__list-active')
  }
})

backendDropBtn.addEventListener('click', () => {
  if(backendList.classList.contains('skills__list')){
    backendList.classList.toggle('skills__list-active')
  }
})
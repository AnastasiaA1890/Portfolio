//Buttons
const frontDropBtn = document.querySelector('.skills__frontend-btn');
const designDropBtn = document.querySelector('.skills__design-btn');
const backendDropBtn = document.querySelector('.skills__backend-btn');
//Blocks
const frontList = document.querySelector('.skills__list-frontend');
const designList = document.querySelector('.skills__list-design');
const backendList = document.querySelector('.skills__list-backend');
//Menu
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.header__links');
//Nav
const navClassName = document.querySelector('.header__nav');
let currentScroll = window.scrollY;
let scrollAnimationId;


const slideNav = () => {
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('header__links-active');
    burger.classList.toggle('burger__menu');
    burger.classList.toggle('burger__menu');
    burger.classList.toggle('burger__menu');
  })
}

navClassName.addEventListener('click', (evt) => {
  
  const linkNav = evt.target.closest('a')
  if (!linkNav) {
    return;
  }
  stopAnimationScroll();
  currentScroll = window.scrollY;
  const newSectionName = linkNav.getAttribute('href').substring(1);
  const newSectionElement = document.getElementById(newSectionName);
  startAnimationScroll(newSectionElement.offsetTop);
})

function startAnimationScroll(newScrollY) {
  const deltaScroll = (newScrollY - currentScroll);
  currentScroll += deltaScroll * 0.05;
  window.scrollTo(0, currentScroll);
  if(Math.abs(deltaScroll) > 1) {
    scrollAnimationId = window.requestAnimationFrame(()=> {
      startAnimationScroll(newScrollY);
    })
  } else {
    window.scrollTo(0, newScrollY);
    stopAnimationScroll();
  }
};

function stopAnimationScroll() {
  window.cancelAnimationFrame(scrollAnimationId);
  scrollAnimationId = undefined;
}

slideNav();

frontDropBtn.addEventListener('click', () => {
  if (frontList.classList.contains('skills__list')) {
    frontList.classList.toggle('skills__list-active')
  }
})

designDropBtn.addEventListener('click', () => {
  if (designList.classList.contains('skills__list')) {
    designList.classList.toggle('skills__list-active')
  }
})

backendDropBtn.addEventListener('click', () => {
  if (backendList.classList.contains('skills__list')) {
    backendList.classList.toggle('skills__list-active')
  }
})

new Gallery(document.getElementById('gallery'), {
  margin: 10
});


document.querySelector('.aside__humb').addEventListener('click', () => {
  document.querySelector('.aside').classList.toggle('active')
})

document.querySelectorAll('.aside__nav-link').forEach((e) => {
  e.addEventListener('click', (item) => item.preventDefault())
})

window.addEventListener('scroll', (e) => {
  if(document.querySelector('.title-search').offsetTop > 0) {
    document.querySelector('.title-search .input').classList.add('scroll')
  } else {
    document.querySelector('.title-search .input').classList.remove('scroll')
  }
})
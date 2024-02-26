document.addEventListener('DOMContentLoaded', () => {

  const btnUp = document.querySelector('.btn')

  window.addEventListener('scroll', event => {

    // change btn display style accordingly to scroll position
    event.currentTarget.pageYOffset > 100
      ? btnUp.style.display = 'inline-block'
      : btnUp.style.display = 'none'
  }, {passive: true})

  btnUp.addEventListener('click', event => {

    // get scroll to top of the page
    window.scrollTo({top: 0, behavior: "smooth"})
  })
})

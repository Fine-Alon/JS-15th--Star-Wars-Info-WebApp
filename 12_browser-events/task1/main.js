document.addEventListener('DOMContentLoaded', () => {

  const btn = document.getElementById('btn')
  const menu = document.getElementById('menu')
  const menuBox = document.querySelector(btn.dataset.target)
  let isOpen = false

  btn.addEventListener('click', () => {
    isOpen = !isOpen

    isOpen
      ? menu.style.display = 'block'
      : menu.style.display = 'none'
  })

  menuBox.addEventListener('click', event => {
    event._isClickWithinModal = true
  })

  window.addEventListener('click', event => {
    if (event._isClickWithinModal) return
    menu.style.display = 'none'
    isOpen = false
  })

})

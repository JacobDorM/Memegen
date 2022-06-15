'use strict'

function onInit() {
  // renderTodos()
}

function toggleMenu(elBtn) {
  document.body.classList.toggle('menu-open')
  document.body.classList.contains('menu-open') ? (elBtn.innerText = 'X') : (elBtn.innerText = '☰')
}

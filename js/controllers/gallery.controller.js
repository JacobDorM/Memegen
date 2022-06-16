'use strict'

function onInitGallery() {
  renderGallery()
}

function renderGallery() {
  const imgs = getImgs()
  const strImgs = imgs.map((img) => `<img class="img${img.id}" data-id="${img.id}" src="${img.url}" alt="couldnt load" onclick="onImgSelect(this)"/>`)
  document.querySelector('.gallery-img').innerHTML = strImgs.join('')
}

function onImgSelect(elImg) {
  selectedImg(elImg)
  toogleGallery()
}

function toogleGallery() {
  const elMainGallery = document.querySelector('main')
  var galleryStyle = elMainGallery.style
  galleryStyle.display === 'none' ? (galleryStyle.display = 'block') : (galleryStyle.display = 'none')
  toogleEditor()
}

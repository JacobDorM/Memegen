'use strict'

function onInitGallery() {
  renderGallery()
  loadMemesFromStorage()
}

function renderGallery() {
  const imgs = getImgs()
  const strImgs = imgs.map((img) => `<img class="img${img.id}" data-id="${img.id}" src="${img.url}" alt="couldnt load" onclick="onImgSelect(this)"/>`)
  document.querySelector('.gallery-img').innerHTML = strImgs.join('')
  renderKeywordsToGallery(imgs)
}

function renderSavedMemesToGallery() {
  const savedMemes = getSavedMemes()
  if (!savedMemes || !savedMemes.length) return
  const strMemes = savedMemes.map((meme) => `<img class="img${meme.selectedImgId}" data-idImg="${meme.selectedImgId}" data-index=${meme.index} src="${meme.url}" alt="not" onclick="onMemeSelect(this)"/>`)
  document.querySelector('.gallery-img').innerHTML = strMemes.join('')
  // renderKeywordsToGallery(savedMemes) make the filter work for the memes aswell
}

function renderKeywordsToGallery(imgs) {
  var strKeywords = imgs.map((img) => img.keywords.map((keyword) => `<option value=${keyword}></option>`))
  strKeywords = strKeywords.map((keywords) => keywords.join(''))
  document.querySelector('#keywords').innerHTML = strKeywords.join('')
}

function onMemeSelect(elMeme) {
  const savedMemes = getSavedMemes()
  const meme = savedMemes.find((val) => val.index === +elMeme.dataset.index)
  selectedMeme(meme)
  closeGallery()
}

function onImgSelect(elImg) {
  selectedImg(elImg)
  closeGallery()
}

function onMemeGenerator() {
  memeGenerator()
  closeGallery()
}

function saveImg(meme) {
  saveMeme(meme)
}

function onSetFilterByKeywords(keyword) {
  setFilterByKeyword(keyword)
  renderGallery()
}

function closeGallery() {
  const elMainGallery = document.querySelector('main')
  var galleryStyle = elMainGallery.style
  galleryStyle.display = 'none'
  showEditor()
  renderGallery()
}

function ShowGallery() {
  const elMainGallery = document.querySelector('main')
  var galleryStyle = elMainGallery.style
  galleryStyle.display = 'block'
  closeEditor()
  renderGallery()
}

function toogleSavedMemes() {
  renderSavedMemesToGallery()
}

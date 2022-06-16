'use strict'

var gCanvas
var gCtx

function onInit() {
  gCanvas = document.getElementById('my-canvas')
  gCtx = gCanvas.getContext('2d')

  renderMeme()
}

function renderMeme() {
  const meme = getMeme()
  drawImg(meme)
}

function toggleMenu(elBtn) {
  document.body.classList.toggle('menu-open')
  // document.body.classList.contains('menu-open') ? (elBtn.innerText = 'X') : (elBtn.innerText = '☰')
}

function drawText(line, x, y) {
  gCtx.lineWidth = 1
  gCtx.strokeStyle = `${line.color}`
  // gCtx.fillStyle = `${line.color}`
  gCtx.font = `${line.size}px Poppins`
  // gCtx.fillText(line.txt, x, y)
  gCtx.strokeText(line.txt, x, y)
}

function drawImg(meme) {
  var img = new Image()
  img.src = `img/meme-imgs (square)/${meme.selectedImgId}.jpg`
  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    drawText(meme.lines[0], 100, 50)
  }
}

function onSetLineTxt(text) {
  updateTextMeme(text)
  renderMeme()
}

function onSetTextColor(color) {
  console.log(color)
}

function selectedImg(elImg) {
  setImg(elImg)
  renderMeme()
}

function toogleEditor() {
  const elSectionEditor = document.querySelector('section')

  var editorStyle = elSectionEditor.style
  console.log(editorStyle.display)
  if (editorStyle.display === 'none' || editorStyle.display === '') {
    editorStyle.display = 'block'
  } else editorStyle.display = 'none'
}

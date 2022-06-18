'use strict'

var gCanvas
var gCtx

function onInit() {
  gCanvas = document.getElementById('my-canvas')
  gCtx = gCanvas.getContext('2d')
  // resizeCanvas()
  renderMeme()
  window.addEventListener('resize', () => {
    const meme = getMeme()
    resizeCanvas(meme)
    renderMeme()

    // renderCanvas()
  })
}

function renderMeme() {
  const meme = getMeme()
  drawImg(meme)
}

function toggleMenu() {
  document.body.classList.toggle('menu-open')
}

function drawText(line, x, y, index, selectedLine) {
  gCtx.beginPath()
  gCtx.lineWidth = '1'

  gCtx.font = `${line.size}px ${line.font}`
  gCtx.textAlign = line.align
  gCtx.fillStyle = line.color
  gCtx.fillText(line.txt, x, y)
  gCtx.strokeStyle = line.stroke
  gCtx.strokeText(line.txt, x, y)
  const textWidth = gCtx.measureText(line.txt).width
  gCtx.measureText(line.txt)

  if (index === selectedLine) {
    // make it like a real border that can be smaller or bigger with the change of the mouse , look at stackoverflow at education, drag and drop
    drawRect(x - 7.5, y - 17.5, textWidth)
  }
}

function drawRect(x, y, textWidth) {
  gCtx.beginPath()
  gCtx.rect(x, y, textWidth + 20, 20)
  gCtx.strokeStyle = 'black'
  gCtx.stroke()
  gCtx.closePath()
}

function resizeCanvas(meme) {
  var img = new Image()
  if (meme.isUploadImg) {
    img.src = meme.src
  } else {
    img.src = `img/meme-imgs (square)/${meme.selectedImgId}.jpg`
  }
  const elContainer = document.querySelector('.editor-canvas')
  gCanvas.width = elContainer.offsetWidth
  gCanvas.height = (elContainer.offsetWidth * img.height) / img.width
}

function onImgInput(ev) {
  loadImageFromInput(ev, storeImgToMeme)
  setTimeout(() => {
    renderMeme()
  }, 1000)
}

function drawImg(meme) {
  console.log(meme)
  var img = new Image()
  if (meme.isUploadImg) {
    console.log(meme.src)
    img.src = meme.src
  } else {
    img.src = `img/meme-imgs (square)/${meme.selectedImgId}.jpg`
  }

  img.onload = () => {
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

    meme.lines.forEach((line, index) => {
      drawText(line, line.pos.x, line.pos.y, index, meme.selectedLineIdx)
    })
  }
}

function onSetLineTxt(text) {
  updateTextMeme(text)
  renderMeme()
}

function onSetFont(fontFamily) {
  setFont(fontFamily)
  renderMeme()
}

function onSetStrokeColor(strokeColor) {
  setStrokeColor(strokeColor)
  renderMeme()
}

function onSetTextColor(color) {
  setColor(color)
  renderMeme()
}

function onIncreaseSize() {
  const increase = 1
  setSize(increase)
  renderMeme()
}

function onDecreaseSize() {
  const decrease = -1
  setSize(decrease)
  renderMeme()
}

function onAlignLeft(left) {
  setAlign(left)
  renderMeme()
}

function onAlignCenter(center) {
  setAlign(center)
  renderMeme()
}

function onAlignRight(right) {
  setAlign(right)
  renderMeme()
}

function onMoveUp(upPosY) {
  setPos(upPosY)
  renderMeme()
}

function onMoveDown(downPosY) {
  setPos(downPosY)
  renderMeme()
}

function onNextLine() {
  setFocusToNextLine()
  renderMeme()
}

function onAddText() {
  AddText()
  renderMeme()
}

function onDeleteText() {
  DeleteText()
  renderMeme()
}

function selectedImg(elImg) {
  setImg(elImg)
  renderMeme()
}

function selectedMeme(meme) {
  setMeme(meme)
  renderMeme()
}

function memeGenerator() {
  createRandomMeme()
  renderMeme()
}

function onUploadImg() {
  uploadImg()
}

function onSaveImg() {
  var imgContent = gCanvas.toDataURL('image/jpeg')
  var meme = getMeme()
  console.log('meme id', meme.selectedImgId)
  meme.url = imgContent
  saveImg(meme)
}

function onDownloadCanvas(elLink) {
  const data = gCanvas.toDataURL()
  elLink.href = data
  elLink.download = 'canvas'
}

function showEditor() {
  const elSectionEditor = document.querySelector('section')
  var editorStyle = elSectionEditor.style
  editorStyle.display = 'block'
}

function closeEditor() {
  const elSectionEditor = document.querySelector('section')
  var editorStyle = elSectionEditor.style
  editorStyle.display = 'none'
}

function clearCanvas() {
  gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
}

function onSetEmojyForText(emojy) {
  setEmojyForText(emojy)
  renderMeme()
}

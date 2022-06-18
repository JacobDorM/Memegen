'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }
var gLines

var gMeme = {
  isUploadImg: false,
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [
    { txt: 'I Am hungry becuase i dont eat', size: 20, align: 'left', color: 'white', stroke: 'black', font: 'impact', pos: { x: 100, y: 50 } },
    { txt: 'I am tired because i dont sleep', size: 20, align: 'left', color: 'white', stroke: 'black', font: 'impact', pos: { x: 100, y: 450 } },
  ],
}

function storeImgToMeme(img) {
  var meme = getMeme()
  meme.isUploadImg = true
  meme.src = img.src
}

function getMeme() {
  const meme = gMeme
  return meme
}

function updateTextMeme(text) {
  gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setEmojyForText(emojy) {
  gMeme.lines[gMeme.selectedLineIdx].txt += emojy
}

function setMeme(meme) {
  // gMeme.isUploadImg = false
  gMeme = meme
}

function setImg(elImg) {
  // gMeme.isUploadImg = false
  gMeme = {
    selectedImgId: +elImg.dataset.id,
    selectedLineIdx: 0,
    lines: [
      { txt: 'I Am hungry becuase i dont eat', size: 20, align: 'left', color: 'white', stroke: 'black', font: 'impact', pos: { x: 100, y: 50 } },
      { txt: 'I am tired because i dont sleep', size: 20, align: 'left', color: 'white', stroke: 'black', font: 'impact', pos: { x: 100, y: 450 } },
    ],
  }
}

function setFont(fontFamily) {
  gMeme.lines[gMeme.selectedLineIdx].font = fontFamily
}

function setStrokeColor(strokeColor) {
  gMeme.lines[gMeme.selectedLineIdx].stroke = strokeColor
}

function setColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setSize(increaseDecrease) {
  gMeme.lines[gMeme.selectedLineIdx].size += increaseDecrease
}

function setAlign(align) {
  //  fix the align problem - left gives right
  gMeme.lines[gMeme.selectedLineIdx].align = align
}

function setPos(posY) {
  //  fix the align problem - left gives right
  gMeme.lines[gMeme.selectedLineIdx].pos.y += posY
}

function AddText() {
  // when delete seconde line and first and third exist - fix
  var y
  if (gMeme.lines.length === 0) y = 50
  if (gMeme.lines.length === 1) y = 450
  if (gMeme.lines.length === 2) y = 225
  if (gMeme.lines.length > 2) y = gMeme.lines[gMeme.lines.length - 1].pos.y + 30
  gMeme.lines.push({
    txt: 'New Text',
    size: 20,
    align: 'left',
    color: 'red',
    pos: { x: 100, y },
  })
  gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function DeleteText() {
  gMeme.lines.splice(gMeme.selectedLineIdx, 1)
  if (gMeme.selectedLineIdx !== 0) gMeme.selectedLineIdx--
}

function setFocusToNextLine() {
  gMeme.selectedLineIdx += 1
  if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function createRandomMeme() {
  gMeme.isUploadImg = false
  const imgs = getImgs()
  const lineLength = getRandomIntInclusive(1, 2)
  var y = 50
  var lines = []
  for (let i = 0; i < lineLength; i++) {
    if (i === 1) y = 450
    lines.push({ txt: makeLorem(7), size: getRandomIntInclusive(1, 15), align: 'left', color: randomColorGenerator(), stroke: randomColorGenerator(), font: 'impact', pos: { x: 100, y } })
  }
  gMeme = {
    selectedImgId: getRandomIntInclusive(1, imgs.length),
    selectedLineIdx: 0,
    lines,
  }
}

function uploadImg() {
  const imgDataUrl = gCanvas.toDataURL('image/jpeg')
  function onSuccess(uploadedImgUrl) {
    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`, '_blank')
  }
  doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
  const formData = new FormData()
  formData.append('img', imgDataUrl)

  fetch('//ca-upload.com/here/upload.php', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((url) => {
      console.log('Got back live url:', url)
      onSuccess(url)
    })
    .catch((err) => {
      console.error(err)
    })
}

function resetGMeme() {
  gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
      { txt: 'I Am hungry becuase i dont eat', size: 20, align: 'left', color: 'white', stroke: 'black', font: 'impact', pos: { x: 100, y: 50 } },
      { txt: 'I am tired because i dont sleep', size: 20, align: 'left', color: 'white', stroke: 'black', font: 'impact', pos: { x: 100, y: 450 } },
    ],
  }
}

function loadImageFromInput(ev, onImageReady) {
  var reader = new FileReader()
  reader.onload = function (event) {
    var img = new Image()
    img.src = event.target.result

    img.onload = onImageReady.bind(null, img)
  }
  reader.readAsDataURL(ev.target.files[0])
}

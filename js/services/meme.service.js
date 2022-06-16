'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 2 }

var gMeme = {
  selectedImgId: 5,
  selectedLineIdx: 0,
  lines: [{ txt: 'I sometimes eat Falafel', size: 20, align: 'left', color: 'red' }],
}

function getMeme() {
  const meme = gMeme
  return meme
}

function updateTextMeme(text) {
  gMeme.lines[0].txt = text
}

function setImg(elImg) {
  gMeme.selectedImgId = elImg.dataset.id
}

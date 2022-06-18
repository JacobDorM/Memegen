'use strict'
const STORAGE_KEY = 'memeDB'

var gImgs = [
  { id: 1, url: 'img/meme-imgs (square)/1.jpg', keywords: ['angry', 'trump'] },
  { id: 2, url: 'img/meme-imgs (square)/2.jpg', keywords: ['funny', 'dog'] },
  { id: 3, url: 'img/meme-imgs (square)/3.jpg', keywords: ['funny', 'dog'] },
  { id: 4, url: 'img/meme-imgs (square)/4.jpg', keywords: ['funny', 'dog'] },
  { id: 5, url: 'img/meme-imgs (square)/5.jpg', keywords: ['funny', 'dog'] },
  { id: 6, url: 'img/meme-imgs (square)/6.jpg', keywords: ['funny', 'dog'] },
  { id: 7, url: 'img/meme-imgs (square)/7.jpg', keywords: ['funny', 'dog'] },
  { id: 8, url: 'img/meme-imgs (square)/8.jpg', keywords: ['funny', 'dog'] },
  { id: 9, url: 'img/meme-imgs (square)/9.jpg', keywords: ['funny', 'dog'] },
  { id: 10, url: 'img/meme-imgs (square)/10.jpg', keywords: ['funny', 'dog'] },
  { id: 11, url: 'img/meme-imgs (square)/11.jpg', keywords: ['funny', 'dog'] },
  { id: 12, url: 'img/meme-imgs (square)/12.jpg', keywords: ['funny', 'dog'] },
  { id: 13, url: 'img/meme-imgs (square)/13.jpg', keywords: ['funny', 'dog'] },
  { id: 14, url: 'img/meme-imgs (square)/14.jpg', keywords: ['funny', 'dog'] },
  { id: 15, url: 'img/meme-imgs (square)/15.jpg', keywords: ['funny', 'dog'] },
  { id: 16, url: 'img/meme-imgs (square)/16.jpg', keywords: ['funny', 'dog'] },
  { id: 17, url: 'img/meme-imgs (square)/17.jpg', keywords: ['funny', 'dog'] },
  { id: 18, url: 'img/meme-imgs (square)/18.jpg', keywords: ['funny', 'dog'] },
]

var gSavedMemes

var gFilterKeyword

function loadMemesFromStorage() {
  _loadMemesFromStorage()
}

function getImgs() {
  var imgs = gImgs
  if (gFilterKeyword) {
    imgs = imgs.filter((img) => {
      const word = img.keywords.filter((keyword) => {
        if (keyword === gFilterKeyword) {
          return true
        } else return false
      })
      if (word.length !== 0) return img
    })
  }

  return imgs
}

function getSavedMemes() {
  const savedMemes = gSavedMemes
  return savedMemes
}

function saveMeme(meme) {
  const cloneMeme = JSON.parse(JSON.stringify(meme))

  if (!gSavedMemes || !gSavedMemes.length) gSavedMemes = []
  cloneMeme.index = gSavedMemes.length
  gSavedMemes.push(cloneMeme)
  _saveMemesToStorage()
}

function setFilterByKeyword(keyword) {
  gFilterKeyword = keyword
}

function _loadMemesFromStorage() {
  var savedMemes = loadFromStorage(STORAGE_KEY)
  gSavedMemes = savedMemes
}

function _saveMemesToStorage() {
  saveToStorage(STORAGE_KEY, gSavedMemes)
}

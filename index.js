const CHARACTER_SIZE = 25
const KEY_EVENT = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false
}
let snowCount = 1
let characterSpeed = 10

function keyPressEvent () {
  const character = document.getElementById('character')
  if (KEY_EVENT.ArrowLeft) {
    const POSITION = getPxNumber(character.style.left) - characterSpeed
    character.style.left = `${checkScreenWidthInner(POSITION) ? POSITION : 0}px`
  }
  if (KEY_EVENT.ArrowRight) {
    const POSITION = getPxNumber(character.style.left) + characterSpeed
    character.style.left = `${checkScreenWidthInner(POSITION) ? POSITION : window.innerWidth - 25}px`
  }
  if (KEY_EVENT.ArrowUp) {
    const POSITION = getPxNumber(character.style.top) - characterSpeed
    character.style.top = `${checkScreenHeightInner(POSITION) ? POSITION : 0}px`
  }
  if (KEY_EVENT.ArrowDown) {
    const POSITION = getPxNumber(character.style.top) + characterSpeed
    character.style.top = `${checkScreenHeightInner(POSITION) ? POSITION : window.innerHeight - 25}px`
  }
}
function checkScreenWidthInner (value) {
  return value >= 0 && value <= window.innerWidth - CHARACTER_SIZE
}
function checkScreenHeightInner (value) {
  return value >= 0 && value <= window.innerHeight - CHARACTER_SIZE
}
function getPxNumber (value) {
  return Number(value.replace('px', ''))
}
function makeSnow () {
  const snow = document.createElement('div')
  snow.classList.add('snow')
  snow.id = `snow${snowCount}`
  return snow
}

function characterPositionSet () {
  const character = document.getElementById('character')
  character.style.top = `${(window.innerHeight / 2 - CHARACTER_SIZE / 2)}px`
  character.style.left = `${(window.innerWidth / 2 - CHARACTER_SIZE / 2)}px`
}

function characterMoveEventSet () {
  window.addEventListener('keyup', ($event) => {
    KEY_EVENT[$event.key] = false
  })
  window.addEventListener('keydown', ($event) => {
    KEY_EVENT[$event.key] = true
    keyPressEvent()
  })
}

function toSnow () {
  const body = document.body
  const snow = makeSnow()
  snow.style.left = `${(Math.random() * window.innerWidth).toFixed()}px`
  snow.style.top = '0px'
  body.appendChild(snow)
  snowCount += 1
  setTimeout(() => {
    snow.style.top = `${window.innerHeight - 15}px`
  }, 100)
  setTimeout(() => {
    body.removeChild(snow)
  }, 10000)
}

(function () {
  characterPositionSet()
  characterMoveEventSet()
  setInterval(() => {
    toSnow()
  }, 100)
})()

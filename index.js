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
  snow.snowEvent = setInterval(overlapCharacter, 500, snow)
}

function overlapCharacter (snow) {
  const body = document.body
  const top = getPxNumber(snow.style.top)
  if (top < window.innerHeight - 15) {
    snow.style.top = `${top + 10}px`
    const character = document.getElementById('character')
    const characterTop = getPxNumber(character.style.top)
    const characterLeft = getPxNumber(character.style.left) + CHARACTER_SIZE
    const snowTop = getPxNumber(snow.style.top)
    const snowLeft = getPxNumber(snow.style.left)
    if (characterTop <= snowTop && characterTop + CHARACTER_SIZE >= snowTop) {
      // alert('end!')
      console.log(snow.id);
      clearInterval(snow.snowEvent)
    }
  } else {
    body.removeChild(snow)
  }
}

(function () {
  characterPositionSet()
  characterMoveEventSet()
  // setInterval(() => {
  toSnow()
  // }, 100)
})()

// alert('Здравствуйте, прошу прощения, я не полность доделал работу, прошу на доработку пару дней, если есть возможность, свяжитесь со мной, пожалуйста')

import Body from './components/main/body/body.js';
import { Main, game } from './components/main/main.js'

// continuation of the game

const previousResult = JSON.parse(localStorage.getItem('results'))
// create game
const body = document.querySelector('body')
body.insertAdjacentHTML('afterbegin', Main())

const emptyCard = document.querySelector('.empty')
emptyCard.removeAttribute('draggable')

const sound = new Audio()
sound.src = './files/game_board_003_52379.mp3'

// Timer & info
// Buttons
const startButton = document.querySelector('.start'),
  stopButton = document.querySelector('.stop'),
  saveButton = document.querySelector('.save'),
  resultButton = document.querySelector('.result'),
  soundButton = document.querySelector('.sound'),
  continueButton = document.querySelector('.continue');

// Sound
let soundToggler = true
soundButton.addEventListener('click', (e) => {
  if (soundToggler) {
    soundToggler = false
    soundButton.innerHTML = 'Sound off'
    soundButton.classList.add('button-off')
  } else {
    soundToggler = true
    soundButton.innerHTML = 'Sound on'
    soundButton.classList.remove('button-off')
  }
})

// Info 
let moves = document.querySelector('.moves-counter'),
  timerMinutes = document.querySelector('.time_min'),
  timerSeconds = document.querySelector('.time_sec');

let movesCounter,
  seconds,
  minutes;

if (previousResult) {
  minutes = previousResult.prevRes.minutes
  seconds = previousResult.prevRes.seconds
  movesCounter = previousResult.prevRes.moves
} else {
  movesCounter = 0
  seconds = 0
  minutes = 0
}

if (previousResult) {
  if (minutes.toString().length < 2) {
    timerMinutes.innerHTML = `0${minutes}`;
  } else {
    timerMinutes.innerHTML = `${minutes}`;
  }
  if (seconds.toString().length < 2) {
    timerSeconds.innerHTML = `0${seconds}`;
  } else {
    timerSeconds.innerHTML = `${seconds}`;
  }
} else {
  timerMinutes.innerHTML = '00';
  timerSeconds.innerHTML = '00';
}

moves.innerHTML = movesCounter;

// Timer

let timer;

function startTimer() {
  timer = setInterval(function interval() {
    seconds++
    if (seconds < 10) {
      timerSeconds.innerHTML = '0' + seconds
    }
    else {
      timerSeconds.innerHTML = seconds
    }
    if (seconds > 59) {
      timerSeconds.innerHTML = '00'
      seconds = 0;
      minutes++;
      if (minutes < 10) {
        timerMinutes.innerHTML = '0' + minutes
      } else {
        timerMinutes.innerHTML = minutes
      }
      clearInterval(timer)
      timer = setInterval(interval, 1000)

    }
  }, 1000);
}

startButton.addEventListener('click', (e) => {
  const numberOfCells = document.querySelector('.game__body').children.length
  let numInterval;
  if (numberOfCells === 9) {
    numInterval = 3
  }
  if (numberOfCells === 16) {
    numInterval = 4
  }
  if (numberOfCells === 25) {
    numInterval = 5
  }
  if (numberOfCells === 36) {
    numInterval = 6
  }
  if (numberOfCells === 49) {
    numInterval = 7
  }
  if (numberOfCells === 64) {
    numInterval = 8
  }
  // localStorage.removeItem('previousResult')
  clearInterval(timer)
  seconds = 0
  minutes = 0
  movesCounter = 0
  moves.innerHTML = 0
  timerMinutes.innerHTML = '00';
  timerSeconds.innerHTML = '00';
  startTimer()
  const numberOfCards = document.querySelector('.game__body').children.length
  document.querySelector('.game__body').remove()
  document.querySelector('.game__head').insertAdjacentHTML('afterend', Body(numberOfCards))
  const emptyCard = document.querySelector('.empty')
  emptyCard.removeAttribute('draggable')
  const cont = document.querySelector('.game__body')
  cont.addEventListener('click', function (e) {
    let interval
    let index = [...this.children].indexOf(e.target);
    // to bottom
    if (this.children[index + numInterval] && this.children[index + numInterval].classList.contains('empty') && !isWaiting) {
      isWaiting = true
      movesCounter++
      moves.innerHTML = movesCounter
      if (soundToggler) {
        sound.play()
      }
      this.children[index].classList.add('to-bottom')
      setTimeout(() => {
        this.children[index].classList.remove('to-bottom')
        this.children[index].after(this.children[index + numInterval])
        this.children[index + numInterval].after(this.children[index])
        isWaiting = false
      }, 500);
    }
    // to top
    if (this.children[index - numInterval] && this.children[index - numInterval].classList.contains('empty') && !isWaiting) {
      isWaiting = true
      movesCounter++
      moves.innerHTML = movesCounter
      if (soundToggler) {
        sound.play()
      }
      this.children[index].classList.add('to-top')
      setTimeout(() => {
        this.children[index].classList.remove('to-top')
        this.children[index].after(this.children[index - numInterval])
        this.children[index - numInterval].before(this.children[index - 1])
        isWaiting = false
      }, 500);
    }
    // to right
    if (((index + 1) !== 0 && (index + 1) !== numInterval && (index + 1) !== numInterval * 2 && (index + 1) !== numInterval * 3) && this.children[index + 1] && this.children[index + 1].classList.contains('empty') && !isWaiting) {
      isWaiting = true
      movesCounter++
      moves.innerHTML = movesCounter
      if (soundToggler) {
        sound.play()
      }
      this.children[index].classList.add('to-right')
      setTimeout(() => {
        this.children[index].classList.remove('to-right')
        this.children[index + 1].after(this.children[index])
        isWaiting = false
      }, 500);
    }
    // to left
    if ((((index - 1) !== numInterval - 1 && (index - 1) !== numInterval * 2 - 1 && (index - 1) !== numInterval * 3 - 1)) && this.children[index - 1] && !isWaiting && this.children[index - 1].classList.contains('empty')) {
      isWaiting = true
      movesCounter++
      moves.innerHTML = movesCounter
      if (soundToggler) {
        sound.play()
      }
      this.children[index].classList.add('to-left')
      setTimeout(() => {
        this.children[index].classList.remove('to-left')
        this.children[index - 1].before(this.children[index])
        isWaiting = false
      }, 500);
    }
  }.bind(cont), false)
  const container = document.querySelector('.game__body')
  container.addEventListener('dragstart', function (e) {
    let index = [...this.children].indexOf(e.target);
    this.children[index].classList.add('dragging')
  })
  container.addEventListener('dragover', function (e) {
    e.preventDefault()
  })
  container.addEventListener('dragenter', function (e) {
    const dragging = document.querySelector('.dragging')
    let inddr = [...this.children].indexOf(dragging, 'ind of dragging')
    let index = [...this.children].indexOf(e.target);
    if (this.children[index].classList.contains('empty') && ((this.children[index + 1] && this.children[index + 1].classList.contains('dragging')) ||
      (this.children[index - 1] && this.children[index - 1].classList.contains('dragging')) ||
      (this.children[index + numInterval] && this.children[index + numInterval].classList.contains('dragging')) ||
      (this.children[index - numInterval] && this.children[index - numInterval].classList.contains('dragging')))) {

      this.children[index].classList.add('hovered')
    }

  })
  container.addEventListener('dragleave', function (e) {
    let index = [...this.children].indexOf(e.target);
    if (this.children[index].classList.contains('empty')) {
      this.children[index].classList.remove('hovered')
    }

  })
  container.addEventListener('drop', function (e) {
    let index = [...this.children].indexOf(e.target);
    const dragging = document.querySelector('.dragging')
    // to top
    if ((this.children[index + numInterval] === dragging && this.children[index].classList.contains('empty'))) {
      if (soundToggler) {
        sound.play()
      }
      this.children[index].after(this.children[index + numInterval])
      this.children[index + numInterval].after(this.children[index])
      movesCounter++
      moves.innerHTML = movesCounter
    }
    // to bottom
    if (this.children[index - numInterval] === dragging && this.children[index].classList.contains('empty')) {
      if (soundToggler) {
        sound.play()
      }
      this.children[index].before(this.children[index - numInterval])
      this.children[index - numInterval].before(this.children[index])
      movesCounter++
      moves.innerHTML = movesCounter
    }
    // to left
    if ((index !== numInterval * 3 && index !== numInterval * 2 && index !== numInterval && index !== 0) && this.children[index - 1] === dragging && this.children[index].classList.contains('empty')) {
      if (soundToggler) {
        sound.play()
      }
      this.children[index].after(this.children[index - 1])
      movesCounter++
      moves.innerHTML = movesCounter
    }
    // to right
    if ((index !== numInterval * 3 - 1 && index !== numInterval * 2 - 1 && index !== numInterval - 1) && this.children[index + 1] === dragging && this.children[index].classList.contains('empty')) {
      if (soundToggler) {
        sound.play()
      }
      this.children[index].before(this.children[index + 1])
      movesCounter++
      moves.innerHTML = movesCounter
    }
    document.querySelector('.empty').classList.remove('hovered')
    dragging.classList.remove('dragging')
  })
})

stopButton.addEventListener('click', () => {
  clearInterval(timer)
  document.querySelector('.game__body').style.pointerEvents = "none"
})

continueButton.addEventListener('click', (e) => {
  const numberOfCells = document.querySelector('.game__body').children.length
  let numInterval;
  if (numberOfCells === 9) {
    numInterval = 3
  }
  if (numberOfCells === 16) {
    numInterval = 4
  }
  if (numberOfCells === 25) {
    numInterval = 5
  }
  if (numberOfCells === 36) {
    numInterval = 6
  }
  if (numberOfCells === 49) {
    numInterval = 7
  }
  if (numberOfCells === 64) {
    numInterval = 8
  }
  
  startTimer()
  if (seconds > 0 || minutes > 0) {
    document.querySelector('.game__body').style.pointerEvents = ""
    const cont = document.querySelector('.game__body')
    cont.addEventListener('click', function (e) {
      
      let index = [...this.children].indexOf(e.target);
      // to bottom
      if (this.children[index + numInterval] && this.children[index + numInterval].classList.contains('empty') && !isWaiting) {
        isWaiting = true
        movesCounter++
        moves.innerHTML = movesCounter
        if (soundToggler) {
          sound.play()
        }
        this.children[index].classList.add('to-bottom')
        setTimeout(() => {
          this.children[index].classList.remove('to-bottom')
          this.children[index].after(this.children[index + numInterval])
          this.children[index + numInterval].after(this.children[index])
          isWaiting = false
        }, 500);
      }
      // to top
      if (this.children[index - numInterval] && this.children[index - numInterval].classList.contains('empty') && !isWaiting) {
        isWaiting = true
        movesCounter++
        moves.innerHTML = movesCounter
        if (soundToggler) {
          sound.play()
        }
        this.children[index].classList.add('to-top')
        setTimeout(() => {
          this.children[index].classList.remove('to-top')
          this.children[index].after(this.children[index - numInterval])
          this.children[index - numInterval].before(this.children[index - 1])
          isWaiting = false
        }, 500);
      }
      // to right
      if (((index + 1) !== 0 && (index + 1) !== numInterval && (index + 1) !== numInterval * 2 && (index + 1) !== numInterval * 3) && this.children[index + 1] && this.children[index + 1].classList.contains('empty') && !isWaiting) {
        isWaiting = true
        movesCounter++
        moves.innerHTML = movesCounter
        if (soundToggler) {
          sound.play()
        }
        this.children[index].classList.add('to-right')
        setTimeout(() => {
          this.children[index].classList.remove('to-right')
          this.children[index + 1].after(this.children[index])
          isWaiting = false
        }, 500);
      }
      // to left
      if ((((index - 1) !== numInterval - 1 && (index - 1) !== numInterval * 2 - 1 && (index - 1) !== numInterval * 3 - 1)) && this.children[index - 1] && !isWaiting && this.children[index - 1].classList.contains('empty')) {
        isWaiting = true
        movesCounter++
        moves.innerHTML = movesCounter
        if (soundToggler) {
          sound.play()
        }
        this.children[index].classList.add('to-left')
        setTimeout(() => {
          this.children[index].classList.remove('to-left')
          this.children[index - 1].before(this.children[index])
          isWaiting = false
        }, 500);
      }
    }.bind(cont), false)
  }
  const container = document.querySelector('.game__body')
  container.addEventListener('dragstart', function (e) {
    let index = [...this.children].indexOf(e.target);
    this.children[index].classList.add('dragging')
  })
  container.addEventListener('dragover', function (e) {
    e.preventDefault()
  })
  container.addEventListener('dragenter', function (e) {
    let index = [...this.children].indexOf(e.target);
    if (this.children[index].classList.contains('empty') && ((this.children[index + 1] && this.children[index + 1].classList.contains('dragging')) ||
      (this.children[index - 1] && this.children[index - 1].classList.contains('dragging')) ||
      (this.children[index + numInterval] && this.children[index + numInterval].classList.contains('dragging')) ||
      (this.children[index - numInterval] && this.children[index - numInterval].classList.contains('dragging')))) {

      this.children[index].classList.add('hovered')
    }

  })
  container.addEventListener('dragleave', function (e) {
    let index = [...this.children].indexOf(e.target);
    if (this.children[index].classList.contains('empty')) {
      this.children[index].classList.remove('hovered')
    }

  })
  container.addEventListener('drop', function (e) {
    let index = [...this.children].indexOf(e.target);
    const dragging = document.querySelector('.dragging')
    // to top
    if ((this.children[index + numInterval] === dragging && this.children[index].classList.contains('empty'))) {
      if (soundToggler) {
        sound.play()
      }
      this.children[index].after(this.children[index + numInterval])
      this.children[index + numInterval].after(this.children[index])
      movesCounter++
      moves.innerHTML = movesCounter
    }
    // to bottom
    if (this.children[index - numInterval] === dragging && this.children[index].classList.contains('empty')) {
      if (soundToggler) {
        sound.play()
      }
      this.children[index].before(this.children[index - numInterval])
      this.children[index - numInterval].before(this.children[index])
      movesCounter++
      moves.innerHTML = movesCounter
    }
    // to left
    if ((index !== numInterval * 3 && index !== numInterval * 2 && index !== numInterval && index !== 0) && this.children[index - 1] === dragging && this.children[index].classList.contains('empty')) {
      if (soundToggler) {
        sound.play()
      }
      this.children[index].after(this.children[index - 1])
      movesCounter++
      moves.innerHTML = movesCounter
    }
    // to right
    if ((index !== numInterval * 3 - 1 && index !== numInterval * 2 - 1 && index !== numInterval - 1) && this.children[index + 1] === dragging && this.children[index].classList.contains('empty')) {
      if (soundToggler) {
        sound.play()
      }
      this.children[index].before(this.children[index + 1])
      movesCounter++
      moves.innerHTML = movesCounter
    }
    document.querySelector('.empty').classList.remove('hovered')
    dragging.classList.remove('dragging')
  })
})

saveButton.addEventListener('click', (e) => {
  const results = {
    prevRes: {},
    three: {},
    four: {},
    five: {},
    six: {},
    seven: {},
    eight: {}
  };

  const field = document.querySelector('.game__body').outerHTML
  const res = JSON.parse(localStorage.getItem('results'))
  const size = document.querySelector('.game-size').firstElementChild.textContent
  if (res === null) {
    results.prevRes.minutes = minutes
    results.prevRes.seconds = seconds
    results.prevRes.moves = movesCounter
    results.prevRes.field = field
    results.prevRes.size = parseInt(size[size.length - 1])
    localStorage.setItem('results', JSON.stringify(results))
  } else {
    res.prevRes.minutes = minutes
    res.prevRes.seconds = seconds
    res.prevRes.moves = movesCounter
    res.prevRes.field = field
    res.prevRes.size = parseInt(size[size.length - 1])
    localStorage.removeItem('results')
    localStorage.setItem('results', JSON.stringify(res))
  }
})
// Cards

let isWaiting = false;


// results and settings


const fourFour = {}
const settings = {
}

function resetValues() {
  seconds = 0
  minutes = 0
  movesCounter = 0
  moves.innerHTML = 0
  timerMinutes.innerHTML = '00';
  timerSeconds.innerHTML = '00';
}

// size buttons 
const sizeButtons = document.querySelectorAll('.size')
sizeButtons.forEach(item => {
  item.addEventListener('click', function (e) {
    const size = parseInt(this.dataset.size)
    const frameSize = document.querySelector('.game-size').firstElementChild
    const gameHead = document.querySelector('.game__head')
    if (size === 3) {
      gameHead.nextElementSibling.remove()
      if (previousResult && previousResult.three.prevRes) {
        gameHead.after(previousResult.three.field)
      } else {
        clearInterval(timer)
        resetValues()
        frameSize.innerHTML = 'Frame size: 3'
        gameHead.insertAdjacentHTML('afterend', Body(9))
        document.querySelectorAll('.body__card').forEach(card => card.classList.add('three-colls'))
      }
    }
    if (size === 4) {
      gameHead.nextElementSibling.remove()
      if (previousResult && previousResult.three.prevRes) {
        gameHead.after(previousResult.fourFour.field)
      } else {
        clearInterval(timer)
        resetValues()
        frameSize.innerHTML = 'Frame size: 4'
        gameHead.insertAdjacentHTML('afterend', Body(16))
        document.querySelectorAll('.body__card').forEach(card => card.classList.add('four-colls'))
      }
    }
    if (size === 5) {
      gameHead.nextElementSibling.remove()
      if (previousResult && previousResult.three.prevRes) {
        gameHead.after(previousResult.five.field)
      } else {
        clearInterval(timer)
        resetValues()
        frameSize.innerHTML = 'Frame size: 5'
        gameHead.insertAdjacentHTML('afterend', Body(25))
        document.querySelectorAll('.body__card').forEach(card => card.classList.add('five-colls'))
      }
    }
    if (size === 6) {
      gameHead.nextElementSibling.remove()
      if (previousResult && previousResult.three.prevRes) {
        gameHead.after(previousResult.six.field)
      } else {
        clearInterval(timer)
        resetValues()
        frameSize.innerHTML = 'Frame size: 6'
        gameHead.insertAdjacentHTML('afterend', Body(36))
        document.querySelectorAll('.body__card').forEach(card => card.classList.add('six-colls'))
      }
    }
    if (size === 7) {
      gameHead.nextElementSibling.remove()
      if (previousResult && previousResult.three.prevRes) {
        gameHead.after(previousResult.seven.field)
      } else {
        clearInterval(timer)
        resetValues()
        frameSize.innerHTML = 'Frame size: 7'
        gameHead.insertAdjacentHTML('afterend', Body(49))
        document.querySelectorAll('.body__card').forEach(card => card.classList.add('seven-colls'))
      }
    }
    if (size === 8) {
      gameHead.nextElementSibling.remove()
      if (previousResult && previousResult.three.prevRes) {
        gameHead.after(previousResult.eight.field)
      } else {
        clearInterval(timer)
        resetValues()
        frameSize.innerHTML = 'Frame size: 8'
        gameHead.insertAdjacentHTML('afterend', Body(64))
        document.querySelectorAll('.body__card').forEach(card => card.classList.add('eight-colls'))
      }
    }
  })
})

let observer = new MutationObserver(function(mutations) {
  const cardValues = mutations[0].target.children
  const res = [...cardValues].map(item => {
    if (item.firstElementChild.textContent) {
      return true
    } else {
      return false
    }
  })
  res.splice(res.length - 1, 1)
  if (!res.includes(false)) {
    clearInterval(timer)
    alert(`You win \nTime: ${minutes} : ${seconds} \nMoves: ${movesCounter}\nResult saved`)
    const winResults = JSON.parse(localStorage.getItem('winResults'))
    const res = {}
    res.minutes = minutes
    res.seconds = seconds
    res.moves = movesCounter
    res.size = document.querySelector('.game-size').firstElementChild.textContent
    if (winResults) {
      if (winResults.length === 10) {
        winResults.shift()
        winResults.push(res)
        localStorage.removeItem('winResults')
        localStorage.setItem('winResults', JSON.stringify(winResults))
      } else {
        winResults.push(res)
        localStorage.removeItem('winResults')
        localStorage.setItem('winResults', JSON.stringify(winResults))
      }
    } else {
      localStorage.setItem('winResults', JSON.stringify([res]))
    }
  }
})

resultButton.addEventListener('click', function (e) {
  const winRes = JSON.parse(localStorage.getItem('winResults'))
  let results = ''
  for (let i = 0; i < winRes.length; i++) {
    results += `\n${winRes[i].minutes} : ${winRes[i].seconds}, moves: ${winRes[i].moves}, ${winRes[i].size}`
  }
  alert(`All your results: ${results}`)
})
observer.observe(
  document.querySelector('.game__body'),
  {childList: true}
)

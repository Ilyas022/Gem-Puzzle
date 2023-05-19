import Card from "./card/card.js";

export default function Body(numOfCells = 16) {
  let className;
  switch (numOfCells) {
    case (9): className = 'three-colls'
    break;
    case (16): className = 'four-colls'
    break;
    case (25): className = 'five-colls'
    break;
    case (36): className = 'six-colls'
    break;
    case (49): className = 'seven-colls'
    break;
    case (64): className = 'eight-colls'
    break;
  }
  const numbers = []
  for (let i = 1; i <= numOfCells; i++) {
    if (i === numOfCells) {
      numbers.push('empty')
    } else {
      numbers.push(i)
    }
  }
  let max = numOfCells - 1
  function getRandomNumber() {
    let randomNumber = Math.round(0 - 0.5 + Math.random() * (max - 0 + 1));
    let result;
    result = numbers[randomNumber]
    numbers.splice(randomNumber, 1)
    max--
    if (result === 'empty') {
      return ['', ` ${className} empty`]
    } else {
      return [result, ` ${className}`]
    }
  }
  let cells = '';
  for (let i = 0; i < numOfCells; i++) {
    cells += Card(...getRandomNumber())
  }
  return (`
    <div class="game__body body">
      ${cells}
    </div>
  `)
}
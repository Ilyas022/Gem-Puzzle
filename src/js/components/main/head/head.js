import button from "./button/button.js"
import Moves from "./movesCounter/movesCounter.js"
import Timer from "./timer/timer.js";

export default function head () {
  return (
    `<div class="game__head head">
    <div class="buttons head__buttons">
      ${button('Shuffle and start', 'start')}
      ${button('Stop', 'stop')}
      ${button('Continue', 'continue')}
      ${button('Save', 'save')}
      ${button('Results', 'result')}
      ${button('Sound: on', 'sound')}
    </div>
    <div class="info">
      ${Moves()}
      ${Timer()}
    </div>
    
    </div>`
  )
}

let counter = 0;


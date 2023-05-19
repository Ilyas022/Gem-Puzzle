function Footer(currentSize = 4) {
  return (`
    <div class="game__footer footer">
      <div class="game-size footer__size">
        <span>Frame size: ${currentSize}</span>
      </div>
      <div class="game-sizes footer__sizes">
        <span>Othre sizes: 
        <button class="size" data-size="3">3x3</button>
        <button class="size" data-size="4">4x4</button>
        <button class="size" data-size="5">5x5</button>
        <button class="size" data-size="6">6x6</button>
        <button class="size" data-size="7">7x7</button>
        <button class="size" data-size="8">8x8</button>
        </span>
      </div>
    </div>
  `)
}

export default Footer
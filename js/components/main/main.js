import Body from "./body/body.js"
import Footer from "./footer/footer.js"
import Head from "./head/head.js"

const res = JSON.parse(localStorage.getItem('results'));
let resultats;

let size
if (res) {
  size = res.prevRes.size
} else {
  size = 4
}
if (res) {
  resultats = res.prevRes
}
let game;
if (resultats) {
  game = resultats.field
  
} else {
  game = Body()
}
function Main() {
  return `
  <main class="main">
    <section class="game">
      <div class="game__container _container">
        ${Head()}
        ${game}
        ${Footer(size)}
      </div>
    </section>
  </main>`
};

export {game, Main}
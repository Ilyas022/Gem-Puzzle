export default function moves(counter = 0) {
  return `
  <div class="head__moves moves">
    <span>Moves:</span>
    <span class="moves-counter">${counter}</span>
  </div>`
}
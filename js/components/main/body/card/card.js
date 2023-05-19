export default function Card(num, className = '') {
  return (`
    <div class="body__card card${className}" draggable="true">
      <span class="card__number">${num}</span>
    </div>
  `)
}
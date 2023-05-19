export default function button (text, className = '') {
  return (
    `<button class="button ${className}">${text}</button>`
  )
}
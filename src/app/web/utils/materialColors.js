/**
 * Отдает массив цветов необходимой длинны
 * Цвета взяты из Material Design
 */
export default function materialColors (length) {
  const material = [
    // material colors 800
    '#c62828', // red
    '#ad1457', // pink
    '#6a1b9a', // purple
    '#4527a0', // deep purple
    '#283593', // indigo
    '#1565c0', // blue
    '#0277bd', // light blue
    '#00838f', // cyan
    '#00695c', // teal
    '#2e7d32', // green
    '#558b2f', // ligth green
    '#9e9d24', // lime
    '#f9a825', // yellow
    '#ff8f00', // amber
    '#ef6c00', // orange
    '#d84315', // deep orange
    '#4e342e', // brown
    '#37474f', // blue grey
    // material colors 500
    '#f44336', // red
    '#e91e63', // pink
    '#9c27b0', // purple
    '#673ab7', // deep purple
    '#3f51b5', // indigo
    '#2196f3', // blue
    '#03a9f4', // light blue
    '#00bcd4', // cyan
    '#009688', // teal
    '#4caf50', // green
    '#8bc34a', // ligth green
    '#cddc39', // lime
    '#ffeb3b', // yellow
    '#ffc107', // amber
    '#ff9800', // orange
    '#ff5722', // deep orange
    '#795548', // brown
    '#607d8b', // blue grey
    // material colors 200
    '#ef9a9a', // red
    '#f48fb1', // pink
    '#ce93d8', // purple
    '#b39ddb', // deep purple
    '#9fa8da', // indigo
    '#90caf9', // blue
    '#81d4fa', // light blue
    '#80deea', // cyan
    '#80cbc4', // teal
    '#a5d6a7', // green
    '#c5e1a5', // ligth green
    '#e6ee9c', // lime
    '#fff59d', // yellow
    '#ffe082', // amber
    '#ffcc80', // orange
    '#ffab91', // deep orange
    '#bcaaa4', // brown
    '#b0bec5'  // blue grey
  ]
  return material.slice(0, length)
}

import PropTypes from 'prop-types'

import { createDesign } from './createDesign'
import { startRotation } from '../animations/Rotation'

import { random } from '../utils'

const colors = {
  CIRCLE_ONE: '#ff4444',
  CIRCLE_TWO: '#000000',
  CIRCLE_THREE: '#b8bdc1'
}

function drawCircle(offset, color, instance) {
  const circles = []

  for (let x = 10; x <= instance.height; x += 15) {
    const circle = instance.makeCircle(offset, x, random(0, 10), random(0, 10))
    circle.fill = color
    circle.noStroke()

    circles.push(circle)
  }

  return circles
}

function drawPattern(instance, props) {
  let renderedCircles = []

  for (let x = 20; x <= instance.width - 120; x += 20) {
    renderedCircles.push(drawCircle(x, colors.CIRCLE_ONE, instance))
    x += 20

    renderedCircles.push(drawCircle(x, colors.CIRCLE_TWO, instance))
    x += 20

    renderedCircles.push(drawCircle(x, colors.CIRCLE_THREE, instance))
  }

  return renderedCircles
}

function sketch() {
  const circles = drawPattern(this.TwoJS, this.props)

  circles.forEach(objects => {
    startRotation.call(this, objects, this.props)
  })
}

const Circles = createDesign(sketch)

Circles.defaultProps = {
  callback: ctrl => {},
  scaleOffset: 0.0245,
  rotationOffset: 4,
  width: 400,
  height: 300
}

Circles.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  scaleOffset: PropTypes.number,
  rotationOffset: PropTypes.number,
  callback: PropTypes.func
}

export { Circles }

const vec2 = require('.././../../util/matrix').vec2;

const THETA = Math.PI / 6;

function calculatePoints(vector, end, lineWidth) {
  const angle = vec2.angleTo([ 1, 0 ], vector);
  const downAngle = angle - THETA;
  const upAngle = angle + THETA;
  const length = 6 + lineWidth * 3;
  return [
    {
      x: end.x - length * Math.cos(downAngle),
      y: end.y - length * Math.sin(downAngle)
    },
    end,
    {
      x: end.x - length * Math.cos(upAngle),
      y: end.y - length * Math.sin(upAngle)
    }
  ];
}

function arrow(context, points) {
  context.moveTo(points[0].x, points[0].y);
  context.lineTo(points[1].x, points[1].y);
  context.lineTo(points[2].x, points[2].y);
}

function makeArrow(context, vector, end, lineWidth) {
  arrow(context, calculatePoints(vector, end, lineWidth));
}

function getEndPoint(vector, end, lineWidth) {
  const miterLimit = lineWidth / Math.sin(THETA);
  const vectorLength = vec2.length(vector);
  vec2.scale(vector, vector, miterLimit / (2 * vectorLength));
  vec2.subtract(end, end, vector);
  return end;
}

module.exports = {
  makeArrow,
  getEndPoint
};
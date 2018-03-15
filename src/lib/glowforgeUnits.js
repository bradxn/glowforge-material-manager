const maxMotorSpeed = 8500;
const minUISpeed = 100;
const maxUISpeed = 1000;

function getMaxVRSpeed(minSpeed, maxSpeed) {
  const speedDifference = maxSpeed - minSpeed;
  const uiSpeedRange = maxUISpeed - minUISpeed
  const vrSpeed = speedDifference / maxMotorSpeed * uiSpeedRange + minUISpeed;
  return 100 * Math.round(vrSpeed / 100)
}

/**
 * Converts a Glowforge internal speed to the GFUI Speed.
 */
function toDisplaySpeed(displaySpeed, minSpeed, maxSpeed) {
  const maxVRSpeed = getMaxVRSpeed(minSpeed, maxSpeed) - minUISpeed;
  const speed = (displaySpeed - minSpeed) / (maxSpeed - minSpeed) * maxVRSpeed + minUISpeed;
  return Math.round(speed)
}

/**
 * Converts a Glowforge UI speed to a Glowforge internal speed.
 */
function toRealSpeed(displaySpeed, minSpeed, maxSpeed) {
  return (displaySpeed - minSpeed) / (getMaxVRSpeed(minSpeed, maxSpeed) - minUISpeed) * (maxSpeed - minSpeed) + minSpeed
}

export {
  toDisplaySpeed,
  toRealSpeed,
}

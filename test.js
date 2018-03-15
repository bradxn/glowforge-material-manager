const maxMotorSpeed = 8500;
const minUISpeed = 100;
const maxUISpeed = 1000;

function getMaxVRSpeed(minSpeed, maxSpeed) {
    const speedDifference = maxSpeed - minSpeed;
    const uiSpeedRange = maxUISpeed - minUISpeed
    const vrSpeed = speedDifference / maxMotorSpeed * uiSpeedRange + minUISpeed;
    return 100 * Math.round(vrSpeed / 100)
}
function calculateDisplaySpeed(displaySpeed, minSpeed, maxSpeed) {
    const maxVRSpeed = getMaxVRSpeed(minSpeed, maxSpeed) - minUISpeed;
    const speed = (displaySpeed - minSpeed) / (maxSpeed - minSpeed) * maxVRSpeed + minUISpeed;
    return Math.round(speed)
}
function getRealSpeed(displaySpeed, minSpeed, maxSpeed) {
    return (displaySpeed - minSpeed) / (getMaxVRSpeed(minSpeed, maxSpeed) - minUISpeed) * (maxSpeed - minSpeed) + minSpeed
}

// Cuts and Scores
console.log(getRealSpeed(100, 100, 4000));
console.log(getRealSpeed(200, 100, 4000));
console.log(getRealSpeed(300, 100, 4000));
console.log(getRealSpeed(400, 100, 4000));
console.log(getRealSpeed(500, 100, 4000));

// Engraves
console.log(getRealSpeed(100, 100, 8500));
console.log(getRealSpeed(200, 100, 8500));
console.log(getRealSpeed(300, 100, 8500));
console.log(getRealSpeed(400, 100, 8500));
console.log(getRealSpeed(500, 100, 8500));
console.log(getRealSpeed(600, 100, 8500));
console.log(getRealSpeed(700, 100, 8500));
console.log(getRealSpeed(800, 100, 8500));
console.log(getRealSpeed(900, 100, 8500));
console.log(getRealSpeed(1000, 100, 8500));


console.log(calculateDisplaySpeed(4000, 100, 4000));
console.log(calculateDisplaySpeed(3000, 100, 4000));
console.log(calculateDisplaySpeed(2000, 100, 4000));
console.log(calculateDisplaySpeed(1000, 100, 4000));
console.log(calculateDisplaySpeed(100, 100, 4000));

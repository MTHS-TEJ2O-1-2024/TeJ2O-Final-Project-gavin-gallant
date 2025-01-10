/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Gavin Gallant and Fransisco Rocco Aolgeri
 * Created on: jan 2025
 * This program ...
*/

// variables
const servoNumber1 = robotbit.Servos.S1
basic.clearScreen()
basic.showIcon(IconNames.Happy)
let distanceToObject: number = 0


if (distanceToObject < 30){
    robotbit.Servo(servoNumber1, 30)
    basic.clearScreen()
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # # # # #
        . . . . . 
        `)
}

if (distanceToObject > 30) {
    robotbit.Servo(servoNumber1, 180)
    basic.clearScreen()
    basic.showIcon(IconNames.Happy)
}


loops.everyInterval(100, function () {
    distanceToObject = sonar.ping(
        DigitalPin.P1,
        DigitalPin.P2,
        PingUnit.Centimeters
    )
})
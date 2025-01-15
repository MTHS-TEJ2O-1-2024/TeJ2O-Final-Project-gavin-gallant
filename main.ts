/* Copyright (c) 2020 MTHS All rights reserved
 *
 * Created by: Gavin Gallant and Fransisco Rocco Aolgeri
 * Created on: jan 2025
 * This program closes a door when your hand it within 15 cm
*/

// variables
const servoNumber1 = robotbit.Servos.S1
basic.clearScreen()
let distanceToObject: number = 0
let passwordInput = 0        // Current password input value
let attempts = 0             // Track number of attempts
let maxAttempts = 4          // Maximum allowed attempts
const correctPassword = 3    // Correct password value


distanceToObject = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
)
input.onButtonPressed(Button.AB, function () {

    // forever loops
    while (true) {
            //get distanceToObject
            distanceToObject = sonar.ping(
            DigitalPin.P1,
            DigitalPin.P2,
            PingUnit.Centimeters
        )

        if (distanceToObject < 15) {
            robotbit.Servo(servoNumber1, 30)
            basic.clearScreen()
            basic.showLeds(`
            . . . . .
            . # . # .
            . . . . .
            # # # # #
            . . . . . 
            `)
        } else {
            robotbit.Servo(servoNumber1, 180)
            basic.clearScreen()
            basic.showIcon(IconNames.Happy)
        }
        if (input.buttonIsPressed(Button.A) == true) {
            robotbit.Servo(servoNumber1, 180)
            basic.showIcon(IconNames.Yes)
            break
        }

    }

})
basic.showLeds(`
. . . . .
. . . . .
. . # . .
. . . . .
. . . . .
`)
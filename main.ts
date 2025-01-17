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
            //get distance To Object
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
        if (input.buttonIsPressed(Button.B) == true) {
            if (attempts < maxAttempts) {
                passwordInput += 1
                basic.showNumber(passwordInput)
            }
        }

        if (input.buttonIsPressed(Button.A) == true) {
            if (attempts < maxAttempts) {
                passwordInput -= 1
                basic.showNumber(passwordInput)
            }
        }
        //Verify password when logo Is Pressed 
        if (input.isGesture(Gesture.Shake) == true) {
            attempts += 1

            if (passwordInput == correctPassword) {
                basic.showIcon(IconNames.Yes) // Show success icon if correct
                music.playMelody("C5 B A G F E D C ", 120)
                robotbit.Servo(servoNumber1, 180)
                break

            } else if (attempts >= maxAttempts) {
                basic.showIcon(IconNames.No) // Show failure icon if out of attempts
                music.playMelody("C D E F G A B C5 ", 120)
            } else {
                basic.showNumber(maxAttempts - attempts) // Show remaining attempts
            }
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
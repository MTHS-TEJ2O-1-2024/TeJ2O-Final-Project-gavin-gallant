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
let PasscodeTime: number = 0


distanceToObject = sonar.ping(
    DigitalPin.P1,
    DigitalPin.P2,
    PingUnit.Centimeters
)
input.onButtonPressed(Button.A, function () {

    // forever loops
    while (true) {
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
        PasscodeTime = 10
        if (input.buttonIsPressed(Button.B) == true) {
            robotbit.Servo(servoNumber1, 180)
            basic.showIcon(IconNames.Yes)
            while(PasscodeTime <0)
                PasscodeTime--
                basic.showNumber(PasscodeTime)
                basic.pause(1000)
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
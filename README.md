# Work in progress!

# Keyestudio Ks0308 Motor Controller

MakeCode package for the the Keystudio Kc0308 motor driver.

## Keyestudio Ks0308

This is a breakout board by Keyestudio that allows easy access to pins from a micro:bit and a handy on-board power converter and motor controller.

Keyestudio Wiki Page for the board: https://wiki.keyestudio.com/Ks0308_keyestudio_Motor_Drive_Breakout_Board_for_micro_bit

![Keyestudio Ks0308](https://wiki.keyestudio.com/images/e/e9/Ks0308.png)

## Important Notes:
I do not work for nor represent Keyestudio. I am just a father who wanted to make it easier for his daughter to use the board.

I was going to start from scratch and attempt to build my first MakeCode extension, but I found this awesome extension for the [MakerBit](http://makerbit.com/) (which I also do not represent) that had similar basic functionality built. It is licensed with the MIT license (as is this fork).

For information on the original code for the MakerBit please visit http://makerbit.com/ or the [original GitHub repo](https://github.com/1010Technologies/pxt-makerbit-motor).
--------------------------------------------------------
## details

The board provides a breakout board for the micro:bit, but also a 2 chanel motor controller for bi-directional DC motors.

### runMotor

Sets the speed of a motor in the range of -100 to 100.

```sig
ks03080.runMotor(ks03080Motor.A, 80)
```

### stopMotor

Stops a motor.

```sig
ks03080.stopMotor(ks03080Motor.A)
```

### setMotorDirection

Sets the rotation direction of a motor. Use this function at start time to configure your motors without the need to rewire.

```sig
ks03080.setMotorRotation(ks03080Motor.A, ks03080MotorRotation.Backward)
```

### enableMotorController

Enables the motor controller on the Ks03080. You must add this block to the OnStart block to enable the controller for your program.

```sig
ks03080.enableMotorCotroller()
``` 

### customizeRover

Allows customization of rover motor and direction for forward movement.
Left and Right are from the perspective of the driver facing forward.


Defaults:
Right - Motor A - Forward
Left - Motor B - Forward

```sig
ks03080.customizeRover(ks03080RoverSide.Right, ks03080Motor.A, ks03080MotorRotation.Forward)
```

### moveRover

Move the rover in a direction at a set speed.

Direction options are:
* Forward
* Backward
* Stop (speed is ignored)
* Left
* Right

Speed is an integer value from 0 - 100 and is read as a percentage of maximum speed.

```sig
ks03080.moveRover(ks03080RoverDirection.Forward, 20)
```

## License

Licensed under the MIT License (MIT). See LICENSE file for more details.

## Supported targets

- for PXT/microbit

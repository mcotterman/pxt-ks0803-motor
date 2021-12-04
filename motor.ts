// Ks0308 motor driver blocks

const enum ks03080Motor {
  //% block="A"
  A = 0,
  //% block="B"
  B = 1,
  //% block="A + B"
  All = 2,
}

const enum ks03080MotorRotation {
  //% block="forward"
  Forward = 1,
  //% block="backward"
  Backward = -1,
}

const enum ks03080RoverSide {
  //% block="left"
  Left = 1,
  //% block="right"
  Right = 2,
}

const enum ks03080MotorControllerStatus {
  //% block="enabled"
  Enabled = 1,
  //% block="disabled"
  Disabled = -1,
}

const enum ks03080RoverDirection {
  //% block="stop"
  Stop = 0,
  //% block="forward"
  Forward = 1,
  //% block="left"
  Left = 2,
  //% block="right"
  Right = 3,
  //% block="backward"
  Backward = 4,
}

//% color=#e94307 icon="\u26D0" block="ks03080"
//% category="ks03080"
namespace ks03080 {
  const motorRotations = [
    ks03080MotorRotation.Forward,
    ks03080MotorRotation.Forward,
  ];

  const ks03080Rover = {
    leftMotor: {
      motor: ks03080Motor.B,
      direction: ks03080MotorRotation.Forward
    },
    rightMotor: {
      motor: ks03080Motor.A,
      direction: ks03080MotorRotation.Backward
    }
  }

  /**
   * Enables motor controller.
   */
  //% subcategory=Setup
  //% blockId="ks03080_enable_motor_controller" block="enable motor controller"
  //% weight=210
  export function enableMotorController(): void {
    motorControllerStatus(ks03080MotorControllerStatus.Enabled)
  }

  /**
   * Enables/disables motor controller.
   * @param ks03080MotorControllerStatus status, eg: ks03080MotorControllerStatus.Enabled
   */
  //% subcategory=Setup
  //% blockId="ks03080_motor_controller_status" block="motor controller status %status"
  //% weight=220
  export function motorControllerStatus(status: ks03080MotorControllerStatus): void {
    if (status == 1) {
      led.enable(false)
      pins.digitalWritePin(DigitalPin.P14, 1)
    } else {
      led.enable(true)
      pins.digitalWritePin(DigitalPin.P14, 0)
    }
  }

  /**
   * Customize rover motors.
   * @param side side of rover as if you were driving the rover, eg: ks03080RoverSide.Left
   * @param ks03080Motor motor, eg: ks03080Motor.A
   * @param ks03080MotorRotation direction of rotation to move rover forward, eg: ks03080MotorRotation.Forward
   */
  //% subcategory=Rover
  //% blockId="ks03080_customize_rover" block="customize rover motors|side of rover %side|motor %motor|forward rotation %direction"
  //% weight=230
  export function customizeRover(side: ks03080RoverSide, motor: ks03080Motor, direction: ks03080MotorRotation): void {
    if(side == 1) {
      ks03080Rover.leftMotor.direction = direction
      ks03080Rover.leftMotor.motor = motor
    } else {
      ks03080Rover.rightMotor.direction = direction
      ks03080Rover.rightMotor.motor = motor
    }
  }

   /**
   * Move rover.
   * @param direction direction of movement, eg: ks03080RoverDirection.Left
   * @param speed percentage in the range of 0 to 100, eg: 80
   */
  //% subcategory=Rover
  //% blockId="ks03080_move_rover" block="move rover|direction %direction|speed %speed"
  //% speed.min=0
  //% speed.max=100
  //% weight=230
  export function moveRover(direction: ks03080RoverDirection, speed: number): void {
    switch (direction) {
      case 0: //Stop
        stopMotor(ks03080Motor.All)
        break
      case 1: // Forward
        runMotor(ks03080Rover.leftMotor.motor, speed * ks03080Rover.leftMotor.direction)
        runMotor(ks03080Rover.rightMotor.motor, speed * ks03080Rover.rightMotor.direction)
        break
      case 2: // Left
        runMotor(ks03080Rover.leftMotor.motor, speed * ks03080Rover.leftMotor.direction * -1)
        runMotor(ks03080Rover.rightMotor.motor, speed * ks03080Rover.rightMotor.direction)
        break
      case 3: // Left
        runMotor(ks03080Rover.leftMotor.motor, speed * ks03080Rover.leftMotor.direction)
        runMotor(ks03080Rover.rightMotor.motor, speed * ks03080Rover.rightMotor.direction * -1)
        break
      case 4: // Backward
        runMotor(ks03080Rover.leftMotor.motor, speed * ks03080Rover.leftMotor.direction * -1)
        runMotor(ks03080Rover.rightMotor.motor, speed * ks03080Rover.rightMotor.direction * -1)
        break
    }
  }

  /**
   * Sets the speed of a motor.
   * @param motor motor, eg: ks03080Motor.A
   * @param speed percentage in the range of -100 to 100, eg: 80
   */
  //% subcategory=Motors
  //% blockId="ks03080_motor_run" block="run motor %motor | at speed %speed \\%"
  //% speed.min=-100
  //% speed.max=100
  //% weight=90
  export function runMotor(motor: ks03080Motor, speed: number): void {
    if (speed === 0) {
      stopMotor(motor);
      return;
    }

    const absSpeedPercentage = Math.min(Math.abs(speed), 100);
    const analogSpeed = pins.map(absSpeedPercentage, 0, 100, 0, 1023);

    if (motor === ks03080Motor.A || motor === ks03080Motor.All) {
      const isClockwise = speed * motorRotations[ks03080Motor.A] > 0;
      pins.digitalWritePin(DigitalPin.P12, isClockwise ? 1 : 0);
      pins.digitalWritePin(DigitalPin.P13, isClockwise ? 0 : 1);
      if (speed === 100) {
        // Avoid PWM whenever possible as only 3 concurrent PWM outputs are available on the microbit
        pins.digitalWritePin(DigitalPin.P1, 1);
      } else {
        pins.analogWritePin(AnalogPin.P1, analogSpeed);
      }
    }

    if (motor === ks03080Motor.B || motor === ks03080Motor.All) {
      const isClockwise = speed * motorRotations[ks03080Motor.B] > 0;
      pins.digitalWritePin(DigitalPin.P15, isClockwise ? 1 : 0);
      pins.digitalWritePin(DigitalPin.P16, isClockwise ? 0 : 1);
      if (speed === 100) {
        // Avoid PWM whenever possible as only 3 concurrent PWM outputs are available on the microbit
        pins.digitalWritePin(DigitalPin.P2, 1);
      } else {
        pins.analogWritePin(AnalogPin.P2, analogSpeed);
      }
    }
  }

  /**
   * Stops a motor.
   * @param motor motor, eg: ks03080Motor.A
   */
  //% subcategory=Motors
  //% blockId="ks03080_motor_stop" block="stop motor %motor"
  //% weight=89
  export function stopMotor(motor: ks03080Motor): void {
    if (motor === ks03080Motor.A || motor === ks03080Motor.All) {
      pins.digitalWritePin(DigitalPin.P12, 0);
      pins.digitalWritePin(DigitalPin.P13, 0);
      pins.analogWritePin(AnalogPin.P1, 0)
    }

    if (motor === ks03080Motor.B || motor === ks03080Motor.All) {
      pins.digitalWritePin(DigitalPin.P15, 0);
      pins.digitalWritePin(DigitalPin.P16, 0);
      pins.analogWritePin(AnalogPin.P2, 0)
    }
  }

  /**
   * Sets the rotation direction of a motor. Use this function at start time to configure your motors without the need to rewire.
   * @param motor motor, eg: ks03080Motor.A
   * @param rotation rotation of the motor, eg: ks03080MotorRotation.Forward
   */
  //% subcategory=Motors
  //% blockId=ks03080_motor_set_rotation block="set motor %motor rotation | to %rotation"
  //% weight=88
  export function setMotorRotation(
    motor: ks03080Motor,
    rotation: ks03080MotorRotation
  ) {
    if (motor === ks03080Motor.A || motor === ks03080Motor.All) {
      motorRotations[ks03080Motor.A] = rotation;
    }

    if (motor === ks03080Motor.B || motor === ks03080Motor.All) {
      motorRotations[ks03080Motor.B] = rotation;
    }
  }
}

/**
 * Motor tests
 */

ks03080.runMotor(ks03080Motor.A, 80);
ks03080.stopMotor(ks03080Motor.A);

ks03080.runMotor(ks03080Motor.B, -50);
ks03080.stopMotor(ks03080Motor.B);

ks03080.runMotor(ks03080Motor.All, 80);
ks03080.stopMotor(ks03080Motor.All);

ks03080.setMotorRotation(ks03080Motor.A, ks03080MotorRotation.Forward);
ks03080.setMotorRotation(ks03080Motor.B, ks03080MotorRotation.Backward);

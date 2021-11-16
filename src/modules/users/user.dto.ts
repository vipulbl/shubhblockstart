import { IsEmail } from 'class-validator'

export class EmailvalidationDto {
  @IsEmail()
  email: string
}

export class CreateUserDto {}

export class UpdateUserDto {}

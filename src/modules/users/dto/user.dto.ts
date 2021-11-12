import { IsEmail } from 'class-validator'

export class EmailvalidationDto {
  @IsEmail()
  email: string
}
import { Injectable, BadRequestException } from '@nestjs/common'
import { EmailvalidationDto, CreateUserDto, UpdateUserDto } from './user.dto'
import { Users } from './user.entity'
import { getUserBy, getUserManyBy, UserRepository } from './user.repository'

@Injectable()
export class UsersService {
  constructor(public readonly userRepository: UserRepository) {}

  create(CreateUserDto: CreateUserDto) {
    return 'This action adds a new user'
  }

  async signup({ email }: EmailvalidationDto) {
    try {
      const dataexist: Users = await getUserBy({ email: email })

      if (dataexist != undefined) {
        throw new BadRequestException('Email already exist.')
      }

      const users = new Users()
      users['email'] = email.trim()
      users['status'] = 1
      await this.userRepository.save(users)
      //var dataInserted = await this.userRepository.insertRecord(dataToInsert);

      return 'Data successfully saved'
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  findAll() {
    return `This action returns all users`
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}

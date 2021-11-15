import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailvalidationDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import { Users } from './entities/user.entity'

@Injectable()
export class UsersService {

  constructor(@InjectRepository(Users) private userRepository: Repository<Users>){

  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async signup({ email }: EmailvalidationDto){
    const query = this.userRepository.createQueryBuilder('users');
    try {

      let dataexist:Users  = await query.where("users.email = :email", {email}).getOne();

      if (dataexist != undefined) {
        throw new BadRequestException('Email already exist.')
      }

      let users = new Users();
      users['email'] = email.trim();
      users['status'] = 1;
      await this.userRepository.save(users);
      //var dataInserted = await this.userRepository.insertRecord(dataToInsert);

      return 'Data successfully saved'
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailvalidationDto } from './dto/user.dto';
import { insertRecord, getDataByEmail } from './users.database'

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async signup({ email }: EmailvalidationDto){
    try {
      let dataexist = await getDataByEmail(email)
      
      if (dataexist.length > 0) {
        throw new BadRequestException('Email already exist.')
      }

      const dataToInsert = []
      dataToInsert.push(email);
      dataToInsert.push(1);

      var dataInserted = await insertRecord(dataToInsert);

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

import { EntityRepository, Repository } from 'typeorm'
import { getManyBy, getSingleBy } from '../../helpers'
import { Users } from './user.entity'

export const getUserBy = getSingleBy(Users)
export const getUserManyBy = getManyBy(Users)

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {}

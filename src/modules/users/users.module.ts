import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

const entities = [User];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "postgres",
      synchronize: false,
      autoLoadEntities: true,
      entities: entities,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

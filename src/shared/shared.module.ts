import { Module, Global } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from './services/config.service'

const providers = [ConfigService]

@Global()
@Module({
  providers,
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...providers, JwtModule],
})
export class SharedModule {}

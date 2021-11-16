import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
export class ConfigService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    // const nodeEnv = this.nodeEnv
    dotenv.config()

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, '\n')
    }
  }
  public get(key: string): string {
    return process.env[key]
  }

  public getNumber(key: string): number {
    return Number(this.get(key))
  }

  // get nodeEnv(): string {
  //   return this.get('NODE_ENV') || 'development'
  // }
  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}']
    let migrations = [__dirname + '/../../migrations/*{.ts,.js}']

    if ((module as any).hot) {
      const entityContext = (require as any).context('./../../modules', true, /\.entity\.ts$/)
      entities = entityContext.keys().map((id) => {
        const entityModule = entityContext(id)
        const [entity] = Object.values(entityModule)
        return entity
      })
      const migrationContext = (require as any).context('./../../migrations', false, /\.ts$/)
      migrations = migrationContext.keys().map((id) => {
        const migrationModule = migrationContext(id)
        const [migration] = Object.values(migrationModule)
        return migration
      })
    }
    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: 'postgres',
      synchronize: false,
      host: this.get('POSTGRES_HOST'),
      port: this.getNumber('POSTGRES_PORT'),
      username: this.get('POSTGRES_USERNAME'),
      password: this.get('POSTGRES_PASSWORD'),
      database: this.get('POSTGRES_DATABASE'),
      migrationsRun: true,
      logging: false,
    }
  }
}

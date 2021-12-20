import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './users.model';
import { UsersService } from './users.service';
import { AuthModule } from './../auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';


@Module({
    imports: [
        RedisModule,
        CacheModule.register({
            ttl: 5,
            max: 100
        }),
        SequelizeModule.forFeature([User]),
        forwardRef(() => AuthModule)
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [
        UsersService
    ]
})
export class UsersModule {}







import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { ConsumerModule } from './consumer/consumer.module';
import { QueueModule } from './queue/queue.module';
import { FactoryModule } from './factory/factory.module';
import { MongoModule } from './mongo/mongo.module';
import { ManagerModule } from './manager/manager.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [
    RedisModule,
    ConsumerModule,
    QueueModule,
    FactoryModule,
    MongoModule,
    ManagerModule,
    RepositoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

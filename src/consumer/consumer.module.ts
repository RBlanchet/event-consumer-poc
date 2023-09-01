import { Module } from '@nestjs/common';
import { RedisModule } from "../redis/redis.module";
import { ConsumerService } from "./consumer.service";
import { QueueModule } from "../queue/queue.module";
import {FactoryModule} from "../factory/factory.module";

@Module({
	imports: [QueueModule, RedisModule],
	providers: [ConsumerService]
})
export class ConsumerModule {}

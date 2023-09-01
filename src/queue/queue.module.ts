import { Module } from '@nestjs/common';
import {ConsumerService} from "./consumer.service";
import {ProducerService} from "./producer.service";
import {BullModule} from "@nestjs/bull";
import {ManagerModule} from "../manager/manager.module";

@Module({
	imports: [
		ManagerModule,
		BullModule.forRoot({
			redis: {
				host: 'redis',
				port: 6379,
			},
		}),
		BullModule.registerQueue({name: 'event-queue'}),
	],
	providers: [ConsumerService, ProducerService],
	exports: [ProducerService],
})
export class QueueModule {}

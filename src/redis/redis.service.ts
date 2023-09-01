import {Injectable, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import Redis from "ioredis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
	private client: Redis;

	async onModuleInit(): Promise<void> {
		this.client = new Redis({
			host: 'redis',
			port: 6379,
		});

		// Création du consumer group
		try {
			await this.client.xgroup('CREATE', 'messages', 'consumerGroup', '$');
		} catch (e) {
			if (e.message !== 'BUSYGROUP Consumer Group name already exists') {
				throw e;
			}
		}
	}

	onModuleDestroy(): any {
		this.client.quit();
	}

	async readFromStream(): Promise<any> {
		return (await this.client.xreadgroup(
			'GROUP', 'consumerGroup', 'myConsumer',
			'BLOCK', '0',
			'STREAMS', 'messages', '>'
		));
	}

	async getPendingEvents(): Promise<any> {
		return (await this.client.xpending('messages', 'consumerGroup', '-', '+', 10));
	}

	async claimPendingEvent(event: string): Promise<any> {
		return (await this.client.xclaim('messages', 'consumerGroup', 'myConsumer', '1', event));
	}

	async acknowledgeEvent(event: string): Promise<any> {
		return (await this.client.xack('messages', 'consumerGroup', event));
	}
}

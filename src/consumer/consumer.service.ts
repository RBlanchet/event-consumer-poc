import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {RedisService} from "../redis/redis.service";
import {ProducerService} from "../queue/producer.service";
import MessageFactory from "../factory/message.factory";

@Injectable()
export class ConsumerService implements OnModuleInit {
	private readonly logger = new Logger(ConsumerService.name);

	constructor(
		private readonly redisService: RedisService,
		private readonly producerQueueService: ProducerService,
	) {}

	async onModuleInit(): Promise<void> {
		const pendings = await this.redisService.getPendingEvents();

		for (const pending of pendings) {
			const messageId = pending[0];
			const message = await this.redisService.claimPendingEvent(messageId);

			this.logger.log('Message en file d\'attente');
			this.logger.debug({id: messageId, data: message});

			await this.producerQueueService.addEventToQueue({id: messageId, data: message});
			await this.redisService.acknowledgeEvent(messageId);
		}

		let retry: number = 0;
		while (true) {
			try {
				this.logger.log('En attente de nouveaux évènements');
				const result = await this.redisService.readFromStream();
				const messages = result[0][1];

				for (const message of messages) {
					const messageId = message[0];
					const eventData = message[1];

					this.logger.log('Réception d\'un nouveau message');
					this.logger.debug({id: messageId, data: eventData});

					await this.producerQueueService.addEventToQueue({id: messageId, data: eventData});
					await this.redisService.acknowledgeEvent(messageId);
				}

				retry = 0;
			} catch (e: any) {
				this.logger.error('Erreur lors de la lecture du stream Redis', e);

				retry++;

				await new Promise(res => setTimeout(res, 5000));

				if (retry > 5) {
					this.logger.error('Trop de tentatives de reconnexion, fin de l\'execution.');
					break;
				}
			}
		}
	}
}

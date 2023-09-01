import {Injectable} from "@nestjs/common";
import {InjectQueue} from "@nestjs/bull";
import {Queue} from "bull";

@Injectable()
export class ProducerService {
	constructor(
		@InjectQueue('event-queue') private readonly eventQueue: Queue
	) {}

	async addEventToQueue(event: any): Promise<void> {
		await this.eventQueue.add('persist-event', event);
	}
}
import {Injectable, Logger} from "@nestjs/common";
import {Process, Processor} from "@nestjs/bull";
import {Job} from "bull";
import MessageManager from "../manager/message.manager";

@Injectable()
@Processor('event-queue')
export class ConsumerService {
	private readonly logger = new Logger(ConsumerService.name);

	constructor(
		private readonly messageManager: MessageManager
	) {}

	@Process('persist-event')
	async handlePersist(job: Job) {
		this.logger.debug('Reception d\'un nouveau Job', JSON.stringify(job));

		try {
			await this.messageManager.create(job.data.id, job.data.data);
			this.logger.debug('Job terminé avec succes');
			await job.finished();
		} catch (e: any) {
			this.logger.error('Impossible de satisfaire le job', e);
			await job.isFailed();
		}
	}
}
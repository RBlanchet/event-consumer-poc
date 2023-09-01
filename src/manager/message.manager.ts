import {Injectable} from "@nestjs/common";
import MessageRepository from "../repository/message.repository";
import MessageFactory from "../factory/message.factory";
import MessageDto from "../dto/message.dto";

@Injectable()
export default class MessageManager {

	constructor(
		private readonly repository: MessageRepository,
		private readonly factory: MessageFactory
	) {}

	public async create(id: string, data: any[]): Promise<MessageDto> {
		const message = this.factory.create(id, data);

		await this.repository.save(message);

		return message;
	}
}
import {Injectable} from "@nestjs/common";
import MessageDto from "../dto/message.dto";
import PrismaService from "../mongo/prisma.service";

@Injectable()
export default class MessageRepository {
	constructor(
		private readonly prismaService: PrismaService
	) {}

	public async save(message: MessageDto): Promise<void> {
		try {
			await this.prismaService.message.create({
				data: message.toModel(),
			});
		} catch (e) {
			console.error(e);
		}

	}
}
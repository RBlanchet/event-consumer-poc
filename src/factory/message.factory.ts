import {Injectable} from "@nestjs/common";
import MessageDto from "../dto/message.dto";

@Injectable()
export default class MessageFactory {
	public create(id: string, data: any[]): MessageDto {
		return new MessageDto(id, data);
	}
}
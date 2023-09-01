import { Module } from '@nestjs/common';
import MessageRepository from "./message.repository";
import {MongoModule} from "../mongo/mongo.module";

@Module({
	providers: [MessageRepository],
	exports: [MessageRepository],
	imports: [MongoModule],
})
export class RepositoryModule {}

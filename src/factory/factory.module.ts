import { Module } from '@nestjs/common';
import MessageFactory from "./message.factory";

@Module({
	providers: [MessageFactory],
	exports: [MessageFactory]
})
export class FactoryModule {}

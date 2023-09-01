import { Module } from '@nestjs/common';
import MessageManager from "./message.manager";
import {RepositoryModule} from "../repository/repository.module";
import {FactoryModule} from "../factory/factory.module";

@Module({
	providers: [MessageManager],
	exports: [MessageManager],
	imports: [RepositoryModule, FactoryModule]
})
export class ManagerModule {}

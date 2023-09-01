import {PrismaClient} from "@prisma/client";
import {Logger, OnModuleInit} from "@nestjs/common";

export default class PrismaService extends PrismaClient implements OnModuleInit {
	private logger = new Logger(PrismaService.name);

	async onModuleInit(): Promise<void> {
		try {
			await this.$connect();
			this.logger.debug('Connexion à la base de données effectuée');
		} catch (e: any) {
			this.logger.error('Impossible de se connecter à la base de données', e);

			throw e;
		}
	}
}
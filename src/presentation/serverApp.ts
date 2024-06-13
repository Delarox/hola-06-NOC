import { CheckService } from "../domain/use-cases/check/check-service";
import { FileSystemDatasource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
	new FileSystemDatasource(),
);

export class ServerApp {
	public static start() {
		console.log("Server started...");

		CronService.CreateJob("*/5 * * * * *", () => {
			const url = "https://google.com"; // https://localhost:3000
			new CheckService(
				fileSystemLogRepository,
				() => console.log(`${url} is OK!!!`),
				(error) => console.log(error),
			).execute(url);
		});
	}
}

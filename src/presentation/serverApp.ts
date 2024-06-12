import { CheckService } from "../domain/use-cases/check/check-service";
import { CronService } from "./cron/cron-service";

export class ServerApp {
	public static start() {
		console.log("Server started...");

		CronService.CreateJob("*/5 * * * * *", () => {
			const url = "https://google.com";
			new CheckService(
				() => console.log(`${url} is OK!!!`),
				(error) => console.log(error),
			).execute(url);
		});
	}
}

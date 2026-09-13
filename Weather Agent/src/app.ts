import { weatherAgent } from "./agent/weather-agent";
import { terminal } from "./utils/terminal";

(async () => {

    try {
        const task = await terminal.getResponse("Enter weather agent task: ");
        await weatherAgent.run(task);
        console.log("Done.");
    }
    catch (err: any) {
        console.error(err);
    }

})();

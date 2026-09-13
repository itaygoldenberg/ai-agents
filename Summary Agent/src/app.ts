import { summaryAgent } from "./agent/summary-agent";
import { terminal } from "./utils/terminal";

(async () => {

    try {
        const task = await terminal.getResponse("Enter summary agent task: ");
        await summaryAgent.run(task);
        console.log("Done.");
    }
    catch (err: any) {
        console.error(err);
    }

})();

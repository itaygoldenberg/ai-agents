import z from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";

/* ══════════════════════════════════════════════════════════════
   EXERCISE 1 · Tool - takes a city, returns its current weather
   ══════════════════════════════════════════════════════════════ */

class WeatherToolBuilder {

    // Tool name:
    private name = "get-weather";

    // Tool description - this is what the model reads to decide
    // whether this tool can answer the question:
    private description = "Get the current weather in a given city.";

    // Tool input schema:
    private schema = z.object({
        city: z.string().describe("The name of the city to get the weather for.")
    });

    // Tool function:
    private async func(args: { city: string }): Promise<string> {
        try {
            // encodeURIComponent turns "Tel Aviv" into "Tel%20Aviv",
            // otherwise the space breaks the address.
            const url = `https://wttr.in/${encodeURIComponent(args.city)}?format=3`;
            const response = await fetch(url);
            const weather = await response.text();
            return weather;
        }
        catch (err: any) {
            return "Error: " + err.message;
        }
    }

    // Build the tool object:
    public build(): DynamicStructuredTool {
        const tool = new DynamicStructuredTool({
            name: this.name,
            description: this.description,
            schema: this.schema,
            func: this.func
        });
        return tool;
    }

}

export const weatherTool = new WeatherToolBuilder().build();

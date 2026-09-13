import z from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";

/* ══════════════════════════════════════════════════════════════
   EXERCISE 2 · Tool - takes a website address, returns its HTML
   The tool only fetches. The summary itself is done by the model.
   ══════════════════════════════════════════════════════════════ */

class HtmlToolBuilder {

    // Tool name:
    private name = "get-html";

    // Tool description - this is what the model reads to decide
    // whether this tool can answer the question:
    private description = "Get the HTML of a given website URL.";

    // Tool input schema - url() validates the value,
    // describe() explains the field to the model:
    private schema = z.object({
        url: z.string().url().describe("The url of the website to get the HTML of.")
    });

    // Tool function:
    private async func(args: { url: string }): Promise<string> {
        try {
            const response = await fetch(args.url);
            const html = await response.text();

            // A full page can be over 500,000 characters, far beyond what the
            // model can read at once. The title, headings and menu all sit at
            // the top, so the first 20,000 are enough to identify the subject.
            return html.slice(0, 20000);
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

export const htmlTool = new HtmlToolBuilder().build();

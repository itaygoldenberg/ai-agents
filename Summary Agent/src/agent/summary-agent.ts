import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "langchain";
import { appConfig } from "../utils/app-config";
import { logger } from "./logger";
import { htmlTool } from "./html-tool";

/* ══════════════════════════════════════════════════════════════
   EXERCISE 2 · Agent - summarises a website in one sentence
   ══════════════════════════════════════════════════════════════ */

class SummaryAgent {

    // Agent LLM - temperature 0 keeps the answers consistent
    // instead of creative:
    private model = new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0,
        openAIApiKey: appConfig.openaiApiKey
    });

    // Agent tools - an empty array here would leave the agent with
    // nothing to call, and the model would answer from memory:
    private tools = [htmlTool];

    // System prompt - the tool returns raw HTML, so the model is told
    // to look past the markup and answer in a single sentence:
    private systemPrompt = `You are a website summarizer.
You receive raw HTML of a web page and identify what the site is about.
Ignore tags, scripts and navigation, and answer in one short sentence.`;

    // Create agent:
    private agent = createAgent({
        model: this.model,
        tools: this.tools,
        systemPrompt: this.systemPrompt
    });

    // Run the agent:
    public async run(userPrompt: string): Promise<void> {

        // Run agent:
        const result = await this.agent.invoke({
            messages: [{ role: "human", content: userPrompt }]
        });

        // Log messages - a ToolMessage in the output is the proof
        // that the tool really ran:
        logger.logMessages(result.messages);
    }

}

export const summaryAgent = new SummaryAgent();

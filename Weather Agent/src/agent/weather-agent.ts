import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "langchain";
import { appConfig } from "../utils/app-config";
import { logger } from "./logger";
import { weatherTool } from "./weather-tool";

/* ══════════════════════════════════════════════════════════════
   EXERCISE 1 · Agent - answers weather questions from the terminal
   ══════════════════════════════════════════════════════════════ */

class WeatherAgent {

    // Agent LLM - temperature 0 keeps the answers consistent
    // instead of creative:
    private model = new ChatOpenAI({
        modelName: "gpt-4o-mini",
        temperature: 0,
        openAIApiKey: appConfig.openaiApiKey
    });

    // Agent tools - an empty array here would leave the agent with
    // nothing to call, and the model would answer from memory:
    private tools = [weatherTool];

    // System prompt - who the agent is, what it does, how it answers.
    // It never names the tool: the tool describes itself:
    private systemPrompt = `You are a helpful weather assistant.
You report the current weather for a city the user asks about.
Answer in one short sentence, and always mention the city name.`;

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

export const weatherAgent = new WeatherAgent();

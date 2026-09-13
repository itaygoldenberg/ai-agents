<h1 align="center">AI Agents</h1>

<p align="center"><em>Two agents that decide for themselves which tool to reach for.</em></p>

<p align="center">
<img src="https://img.shields.io/badge/LangChain-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white" alt="LangChain" />
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" />
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
</p>

---
## What an agent is here

A model on its own can only produce text. An agent is a model plus a set of tools and permission to call them. You describe each tool, the model picks one, the runtime executes it, and the result comes back for the model to read.

**The description is the interface.** The model never sees the implementation, only the name, the description and the argument schema. A vague description is a tool the model will reach for at the wrong moment.

## The two agents

| Agent | What it does |
|---|---|
| **Summary Agent** | Takes a long piece of text and returns a summary, calling its tools when it needs something it cannot infer |
| **Weather Agent** | Answers questions about the weather by fetching live data instead of guessing |

Both describe their arguments with **Zod**. The same schema validates the call and tells the model what shape to send, so one definition does two jobs.

```text
Summary Agent/src/agent/
Weather Agent/src/agent/
```

## Running it

Each agent runs on its own:

```bash
cd "Summary Agent"
```

```bash
npm install
```

```bash
npm start
```

## Environment

Copy `.env.example` to `.env` and fill in your own values:

```env
OPENAI_API_KEY=your_openai_api_key
```

`.env` is ignored by git. Never commit real keys.

---

<p align="center">
  <strong>Itay Goldenberg</strong><br />
  <sub>John Bryce Full Stack Development</sub>
</p>

<p align="center">
  <a href="https://github.com/itaygoldenberg">GitHub</a> &middot;
  <a href="https://www.linkedin.com/in/itay-goldenberg/">LinkedIn</a>
</p>

<p align="center">
  <img src="./docs/readme-banner.svg" alt="AI Agents animated project banner" width="100%" />
</p>

<p align="center">
  <a href="#running-it"><img src="./docs/actions/run.svg" alt="Run AI Agents locally" width="250" /></a>
  <a href="https://github.com/itaygoldenberg/ai-agents"><img src="./docs/actions/source.svg" alt="View the AI Agents source" width="250" /></a>
  <a href="https://github.com/itaygoldenberg?tab=repositories"><img src="./docs/actions/github.svg" alt="More projects by Itay Goldenberg" width="250" /></a>
  <a href="https://www.linkedin.com/in/itay-goldenberg/"><img src="./docs/actions/linkedin.svg" alt="Connect with Itay Goldenberg on LinkedIn" width="250" /></a>
</p>

> [!NOTE]
> Two LangChain agents that choose their own tools, and a log that proves which ones they actually called.

<p align="center">
  <a href="#overview">Overview</a>&nbsp;&middot;&nbsp;
  <a href="#features">Features</a>&nbsp;&middot;&nbsp;
  <a href="#technology">Technology</a>&nbsp;&middot;&nbsp;
  <a href="#project-structure">Project structure</a>&nbsp;&middot;&nbsp;
  <a href="#running-it">Running it</a>&nbsp;&middot;&nbsp;
  <a href="#notes">Notes</a>
</p>

## Overview

A model on its own can only produce text. An agent is a model plus a set of tools and permission to call them: you describe each tool, the model picks one, the runtime executes it, and the result comes back for the model to read.

The description is the interface. The model never sees the implementation, only the name, the description and the argument schema. A vague description is a tool the model will reach for at the wrong moment, which makes writing them a design task rather than documentation.

| Project detail | Implementation |
|---|---|
| Summary Agent | Takes a long text and returns a summary, calling tools when it needs something it cannot infer |
| Weather Agent | Answers weather questions by fetching live data instead of guessing |
| Framework | LangChain |
| Schemas | Zod describes each tool's arguments |
| Runtime | Node.js and TypeScript, run from the terminal |

## Contents

- [Overview](#overview)
- [Features](#features)
- [Technology](#technology)
- [Project structure](#project-structure)
- [Running it](#running-it)
- [Notes](#notes)

## Features

### The model decides, the runtime acts

Nothing is hard-coded into a flow. The model reads the descriptions, chooses a tool and supplies the arguments, and only then does anything happen.

### One schema, two jobs

Zod validates the arguments and tells the model what shape to send. Writing it twice would let the two drift apart; writing it once means they cannot.

### A tool for what the model cannot know

A model has no clock and no network. Asked for the current weather it will answer confidently and wrongly. A tool is what turns a guess into a fact.

### Visible reasoning

The run prints each step: the tool chosen, the arguments sent, the result returned. That log is the only way to tell a model that called a tool from one that merely described calling it.

## Technology

<p align="center">
  <img src="./docs/tech-strip.svg" alt="AI Agents technologies" width="100%" />
</p>

| Technology | Role |
|---|---|
| LangChain | Agent loop and tool binding |
| OpenAI | The model behind both agents |
| Zod | Tool argument schemas |
| TypeScript | Both agents |
| Node.js | Terminal runtime |

## Project structure

```text
AI Agents/
|-- Summary Agent/
|   `-- src/
|       |-- agent/           the agent and its tools
|       `-- utils/
|-- Weather Agent/
|   `-- src/
|       |-- agent/
|       `-- utils/
`-- docs/                    README artwork only
```

## Running it

Each agent runs on its own.

```bash
cd "Summary Agent"
```

```bash
npm install
```

```bash
npm start
```

The Weather Agent is the same three commands in its own folder.

## Environment

Copy `.env.example` to `.env` and fill in your own values:

```env
OPENAI_API_KEY=your_openai_api_key
```

`.env` is ignored by git. A key that reaches GitHub is public from the moment it is pushed.

## Notes

- Each agent keeps its own `.env` and its own dependencies. They are two programs that happen to share a folder, not one program with two modes.
- If an agent answers without calling a tool, the description is usually the reason. Sharpening it changes the behaviour more reliably than changing the prompt around it.

## Author

<p align="center">
  <strong>Itay Goldenberg</strong><br />
  <sub>Full Stack Developer Student &middot; John Bryce</sub>
</p>

<p align="center">
  <a href="https://github.com/itaygoldenberg"><img src="./docs/actions/github.svg" alt="Itay Goldenberg on GitHub" width="250" /></a>
  <a href="https://www.linkedin.com/in/itay-goldenberg/"><img src="./docs/actions/linkedin.svg" alt="Itay Goldenberg on LinkedIn" width="250" /></a>
</p>

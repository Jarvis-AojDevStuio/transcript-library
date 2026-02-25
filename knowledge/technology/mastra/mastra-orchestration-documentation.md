---
title: "Mastra Orchestration Documentation"
description: "Comprehensive documentation for orchestrating complex AI workflows with Mastra including sequential processing, parallel execution, and agent networks."
category: "Technical Documentation"
subcategory: "API Integration"
product_line: "Desktop Commander"
audience: "Developers"
status: "Active"
author: "AOJDevStudio"
created_date: "2025-08-29"
last_updated: "2025-08-29"
tags:
  - mastra
  - orchestration
  - workflows
  - ai-agents
  - automation
---

# Mastra Orchestration Documentation

This documentation provides comprehensive examples and reference for orchestrating complex AI workflows with Mastra, covering workflows, agents, voice interactions, and multi-step automation.

## Table of Contents

1. [Workflow Fundamentals](#workflow-fundamentals)
2. [Sequential Orchestration](#sequential-orchestration)
3. [Parallel Execution](#parallel-execution)
4. [Conditional Branching](#conditional-branching)
5. [Agent Networks](#agent-networks)
6. [Voice Orchestration](#voice-orchestration)
7. [Human-in-the-Loop Workflows](#human-in-the-loop-workflows)
8. [Advanced Patterns](#advanced-patterns)

## Workflow Fundamentals

### Creating Basic Workflows

The foundation of Mastra orchestration is the `createWorkflow` function:

```typescript
import { createWorkflow } from '@mastra/core/workflows';
import z from 'zod'

const workflow = createWorkflow({
  id: 'my-workflow',
  inputSchema: z.object({}),
  outputSchema: z.object({})
  steps: [
    // Workflow steps
  ],
});
```

### Workflow with Input/Output Schemas

```typescript
export const testWorkflow = createWorkflow({
  id: "test-workflow",
  description: 'Test workflow',
  inputSchema: z.object({
    input: z.string()
  }),
  outputSchema: z.object({
    output: z.string()
  })
})
  .then(step1)
  .then(step2)
  .commit();
```

## Sequential Orchestration

### Basic Sequential Steps

Chain steps to execute them in order:

```typescript
import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

const step1 = createStep({...});
const step2 = createStep({...});

export const testWorkflow = createWorkflow({...})
  .then(step1)
  .then(step2)
  .commit();
```

### Weather and Activity Planning Workflow

```typescript
const weatherWorkflow = createWorkflow({
  id: "weather-workflow",
  inputSchema: z.object({
    city: z.string().describe("The city to get the weather for"),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
})
  .then(fetchWeather)
  .then(planActivities);

weatherWorkflow.commit();

export { weatherWorkflow };
```

### Incremental Processing

```typescript
const workflow = createWorkflow({
  id: "increment-workflow",
  inputSchema: z.object({
    value: z.number(),
  }),
  outputSchema: z.object({
    value: z.number(),
  }),
}).then(incrementStep);

workflow.commit();

export { workflow as incrementWorkflow };
```

## Parallel Execution

### Parallel Steps with Synthesis

Execute multiple steps in parallel and combine results:

```typescript
const activityPlanningWorkflow = createWorkflow({
  id: "plan-both-workflow",
  inputSchema: z.object({
    city: z.string(),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
  steps: [fetchWeather, planActivities, planIndoorActivities, synthesizeStep],
})
  .then(fetchWeather)
  .parallel([planActivities, planIndoorActivities])
  .then(synthesizeStep)
  .commit();

export { activityPlanningWorkflow };
```

### Synthesis Step Implementation

```typescript
const synthesizeStep = createStep({
  id: "sythesize-step",
  description: "Synthesizes the results of the indoor and outdoor activities",
  inputSchema: z.object({
    "plan-activities": z.object({
      activities: z.string(),
    }),
    "plan-indoor-activities": z.object({
      activities: z.string(),
    }),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
  execute: async ({ inputData, mastra }) => {
    const indoorActivities = inputData?.["plan-indoor-activities"];
    const outdoorActivities = inputData?.["plan-activities"];

    const prompt = `Indoor activities:
      ${indoorActivities?.activities}

      Outdoor activities:
      ${outdoorActivities?.activities}

      There is a chance of rain so be prepared to do indoor activities if needed.`;

    const agent = mastra?.getAgent("synthesizeAgent");
    if (!agent) {
      throw new Error("Synthesize agent not found");
    }

    const response = await agent.stream([
      {
        role: "user",
        content: prompt,
      },
    ]);

    let activitiesText = "";

    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      activitiesText += chunk;
    }

    return {
      activities: activitiesText,
    };
  },
});
```

### Parallel Workflow with Advanced Control

```typescript
const planBothWorkflow = createWorkflow({
  id: 'plan-both-workflow',
  inputSchema: forecastSchema,
  outputSchema: z.object({
    activities: z.string(),
  }),
  steps: [planActivities, planIndoorActivities, sythesizeStep],
})
  .parallel([planActivities, planIndoorActivities])
  .then(sythesizeStep)
  .commit();
```

## Conditional Branching

### Weather-Based Conditional Logic

```typescript
const activityPlanningWorkflow = createWorkflow({
  id: "activity-planning-workflow-step2-if-else",
  inputSchema: z.object({
    city: z.string().describe("The city to get the weather for"),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
})
  .then(fetchWeather)
  .branch([
    [
      // If precipitation chance is greater than 50%, suggest indoor activities
      async ({ inputData }) => {
        return inputData?.precipitationChance > 50;
      },
      planIndoorActivities,
    ],
    [
      // Otherwise, suggest a mix of activities
      async ({ inputData }) => {
        return inputData?.precipitationChance <= 50;
      },
      planActivities,
    ],
  ]);

activityPlanningWorkflow.commit();
```

### Advanced Branching with Nested Workflows

```typescript
const weatherWorkflow = createWorkflow({
  id: 'weather-workflow-step3-concurrency',
  inputSchema: z.object({
    city: z.string().describe('The city to get the weather for'),
  }),
  outputSchema: z.object({
    activities: z.string(),
  }),
  steps: [fetchWeather, planBothWorkflow, planActivities],
})
  .then(fetchWeather)
  .branch([
    [
      async ({ inputData }) => {
        return inputData?.precipitationChance > 20;
      },
      planBothWorkflow,
    ],
    [
      async ({ inputData }) => {
        return inputData?.precipitationChance <= 20;
      },
      planActivities,
    ],
  ]);
```

## Agent Networks

### Agent Network Generation

```typescript
async generate(
  messages: string | string[] | CoreMessage[],
  args?: AgentGenerateOptions
): Promise<GenerateTextResult>
```

The `generate` method orchestrates the agent network to produce responses.

### Hierarchical Multi-Agent System

```typescript
const publisherAgent = new Agent({
  name: "publisherAgent",
  instructions:
    "You are a publisher agent that first calls the copywriter agent to write blog post copy about a specific topic and then calls the editor agent to edit the copy. Just return the final edited copy.",
  model: anthropic("claude-3-5-sonnet-20241022"),
  tools: { copywriterTool, editorTool },
});

const mastra = new Mastra({
  agents: { publisherAgent },
});
```

### Multi-Agent Registration

```typescript
import { PinoLogger } from "@mastra/loggers";
import { Mastra } from "@mastra/core/mastra";
import { optimistAgent, skepticAgent } from "./agents";

export const mastra = new Mastra({
  agents: {
    optimistAgent,
    skepticAgent,
  },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
```

## Voice Orchestration

### Turn-Taking Logic Implementation

```typescript
// Process one turn of the conversation
async function processTurn(
  agentName: "optimistAgent" | "skepticAgent",
  otherAgentName: string,
  topic: string,
  previousResponse: string = "",
) {
  const agent = mastra.getAgent(agentName);
  const spinner = p.spinner();
  spinner.start(`${agent.name} is thinking...`);

  let prompt;
  if (!previousResponse) {
    // First turn
    prompt = `Discuss this topic: ${topic}. Introduce your perspective on it.`;
  } else {
    // Responding to the other agent
    prompt = `The topic is: ${topic}. ${otherAgentName} just said: "${previousResponse}". Respond to their points.`;
  }

  // Generate text response
  const { text } = await agent.generate(prompt, {
    temperature: 0.9,
  });

  spinner.message(`${agent.name} is speaking...`);

  // Convert to speech and play
  const audioStream = await agent.voice.speak(text, {
    speed: 1.2,
    responseFormat: "wav",
  });

  if (audioStream) {
    audioStream.on("data", (chunk) => {
      recorder.write(chunk);
    });
  }

  spinner.stop(`${agent.name} said:`);

  const formattedText = formatText(text, 80);
  p.note(formattedText, agent.name);

  if (audioStream) {
    const speaker = playAudio(audioStream);

    await new Promise<void>((resolve) => {
      speaker.once("close", () => {
        resolve();
      });
    });
  }

  return text;
}
```

### Debate Orchestration

```typescript
export async function runDebate(topic: string, turns: number = 3) {
  recorder.start();

  p.intro("AI Debate - Two Agents Discussing a Topic");
  p.log.info(`Starting a debate on: ${topic}`);
  p.log.info(
    `The debate will continue for ${turns} turns each. Press Ctrl+C to exit at any time.`,
  );

  let optimistResponse = "";
  let skepticResponse = "";
  const responses = [];

  for (let turn = 1; turn <= turns; turn++) {
    p.log.step(`Turn ${turn}`);

    // Optimist's turn
    optimistResponse = await processTurn(
      "optimistAgent",
      "Skeptic",
      topic,
      skepticResponse,
    );

    responses.push({
      agent: "Optimist",
      text: optimistResponse,
    });

    // Skeptic's turn
    skepticResponse = await processTurn(
      "skepticAgent",
      "Optimist",
      topic,
      optimistResponse,
    );

    responses.push({
      agent: "Skeptic",
      text: skepticResponse,
    });
  }

  recorder.end();
  p.outro("Debate concluded! The full audio has been saved to debate.mp3");

  return responses;
}
```

### Voice Event Handling

```typescript
import { OpenAIRealtimeVoice } from "@mastra/voice-openai-realtime";
import Speaker from "@mastra/node-speaker";
import chalk from "chalk";

const voice = new OpenAIRealtimeVoice({
  realtimeConfig: {
    model: "gpt-4o-mini-realtime",
    apiKey: process.env.OPENAI_API_KEY,
  },
});

await voice.connect();

// Register event listener for transcribed text
voice.on("writing", (event) => {
  if (event.role === "user") {
    process.stdout.write(chalk.green(event.text));
  } else {
    process.stdout.write(chalk.blue(event.text));
  }
});

// Listen for audio data and play it
const speaker = new Speaker({
  sampleRate: 24100,
  channels: 1,
  bitDepth: 16,
});

voice.on("speaker", (stream) => {
  stream.pipe(speaker);
});

// Register event listener for errors
voice.on("error", ({ message, code, details }) => {
  console.error(`Error ${code}: ${message}`, details);
});
```

### Composite Voice Orchestration

```typescript
import { CompositeVoice } from "@mastra/core/voice";
import { OpenAIRealtimeVoice } from "@mastra/voice-openai-realtime";
import Speaker from "@mastra/node-speaker";

const speaker = new Speaker({
  sampleRate: 24100,
  channels: 1,
  bitDepth: 16,
});

const realtimeVoice = new OpenAIRealtimeVoice();
const voice = new CompositeVoice({
  realtimeProvider: realtimeVoice,
});

await voice.connect();

voice.on("speaker", (stream) => {
  stream.pipe(speaker);
});
```

### Speech-to-Text Processing

```typescript
import { mastra } from "@/src/mastra";
import { Readable } from "node:stream";

export async function POST(req: Request) {
  const formData = await req.formData();
  const audioFile = formData.get("audio") as File;
  const arrayBuffer = await audioFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const readable = Readable.from(buffer);

  const noteTakerAgent = mastra.getAgent("noteTakerAgent");
  const text = await noteTakerAgent.voice?.listen(readable);

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
}
```

## Human-in-the-Loop Workflows

### Suspendable Workflow Definition

```typescript
const generateSuggestionsStep = createStep({
  id: "generate-suggestions",
  inputSchema: z.object({
    vacationDescription: z.string().describe("The description of the vacation"),
  }),
  outputSchema: z.object({
    suggestions: z.array(z.string()),
    vacationDescription: z.string(),
  }),
  execute: async ({ inputData, mastra }) => {
    if (!mastra) {
      throw new Error("Mastra is not initialized");
    }

    const { vacationDescription } = inputData;
    const result = await mastra.getAgent("summaryTravelAgent").generate([
      {
        role: "user",
        content: vacationDescription,
      },
    ]);
    console.log(result.text);
    return { suggestions: JSON.parse(result.text), vacationDescription };
  },
});

const humanInputStep = createStep({
  id: "human-input",
  inputSchema: z.object({
    suggestions: z.array(z.string()),
    vacationDescription: z.string(),
  }),
  outputSchema: z.object({
    selection: z.string().describe("The selection of the user"),
    vacationDescription: z.string(),
  }),
  resumeSchema: z.object({
    selection: z.string().describe("The selection of the user"),
  }),
  suspendSchema: z.object({
    suggestions: z.array(z.string()),
  }),
  execute: async ({ inputData, resumeData, suspend, getInitData }) => {
    if (!resumeData?.selection) {
      await suspend({ suggestions: inputData?.suggestions });
      return {
        selection: "",
        vacationDescription: inputData?.vacationDescription,
      };
    }

    return {
      selection: resumeData?.selection,
      vacationDescription: inputData?.vacationDescription,
    };
  },
});

const travelPlannerStep = createStep({
  id: "travel-planner",
  inputSchema: z.object({
    selection: z.string().describe("The selection of the user"),
    vacationDescription: z.string(),
  }),
  outputSchema: z.object({
    travelPlan: z.string(),
  }),
  execute: async ({ inputData, mastra }) => {
    const travelAgent = mastra?.getAgent("travelAgent");
    if (!travelAgent) {
      throw new Error("Travel agent is not initialized");
    }

    const { selection, vacationDescription } = inputData;
    const result = await travelAgent.generate([
      { role: "assistant", content: vacationDescription },
      { role: "user", content: selection || "" },
    ]);
    console.log(result.text);
    return { travelPlan: result.text };
  },
});

const travelAgentWorkflow = createWorkflow({
  id: "travel-agent-workflow",
  inputSchema: z.object({
    vacationDescription: z.string().describe("The description of the vacation"),
  }),
  outputSchema: z.object({
    travelPlan: z.string(),
  }),
})
  .then(generateSuggestionsStep)
  .then(humanInputStep)
  .then(travelPlannerStep);

travelAgentWorkflow.commit();

export { travelAgentWorkflow, humanInputStep };
```

## Advanced Patterns

### Foreach Loops in Workflows

```typescript
const mapStep = createStep({
  id: "map",
  description: "Maps (+11) on the current value",
  inputSchema: z.object({
    value: z.number()
  }),
  outputSchema: z.object({
    value: z.number()
  }),
  execute: async ({ inputData }) => {
    return { value: inputData.value + 11 };
  }
});

const finalStep = createStep({
  id: "final",
  description: "Final step that prints the result",
  inputSchema: z.array(z.object({ value: z.number() })),
  outputSchema: z.object({
    finalValue: z.number()
  }),
  execute: async ({ inputData }) => {
    return { finalValue: inputData.reduce((acc, curr) => acc + curr.value, 0) };
  }
});

const counterWorkflow = createWorkflow({
  steps: [mapStep, finalStep],
  id: "counter-workflow",
  inputSchema: z.array(z.object({ value: z.number() })),
  outputSchema: z.object({
    finalValue: z.number()
  })
});

counterWorkflow.foreach(mapStep).then(finalStep).commit();

const run = counterWorkflow.createRun();
const result = await run.start({
  inputData: [{ value: 1 }, { value: 22 }, { value: 333 }]
});

if (result.status === "success") {
  console.log(result.result);
} else if (result.status === "failed") {
  console.error(result.error);
}
```

### Nested Workflow Composition

```typescript
const nestedWorkflow = createWorkflow({
  id: 'nested-workflow',
  inputSchema: z.object({...}),
  outputSchema: z.object({...}),
})
  .then(step1)
  .then(step2)
  .commit();

const mainWorkflow = createWorkflow({
  id: 'main-workflow',
  inputSchema: z.object({...}),
  outputSchema: z.object({...}),
})
  .then(initialStep)
  .then(nestedWorkflow)
  .then(finalStep)
  .commit();
```

### Complex Workflow with Cloning

```typescript
import { createWorkflow, createStep, cloneStep, cloneWorkflow } from '@mastra/core/workflows/vNext';

const myWorkflow = createWorkflow({
  id: 'my-workflow',
  steps: [step1, step2, step3],
});
myWorkflow.then(step1).then(step2).then(step3).commit();

const parentWorkflow = createWorkflow({
  id: 'parent-workflow',
  steps: [myWorkflow, step4],
});
parentWorkflow
  .then(myWorkflow)
  .then(step4)
  .then(cloneWorkflow(myWorkflow, { id: 'cloned-workflow' }))
  .then(cloneStep(step4, { id: 'cloned-step-4' }))
  .commit();
```

### Array Processing with Foreach

```typescript
const readmeGeneratorWorkflow = createWorkflow({
  id: "readme-generator",
  inputSchema: z.object({
    repoUrl: z.string(),
  }),
  outputSchema: z.object({
    success: z.boolean(),
    message: z.string(),
    data: z.object({
      repoUrl: z.string(),
    }),
  }),
  steps: [
    cloneRepositoryStep,
    selectFolderStep,
    generateSummaryWorkflow,
    collateDocumentationStep,
  ],
})
  .then(cloneRepositoryStep)
  .then(selectFolderStep)
  .foreach(generateSummaryWorkflow)
  .then(collateDocumentationStep)
  .commit();

export { readmeGeneratorWorkflow };
```

### RAG Workflow Orchestration

```typescript
ragWorkflow
  .step(analyzeContext)
  .then(breakdownThoughts)
  .then(connectPieces)
  .then(drawConclusions)
  .then(finalAnswer);

ragWorkflow.commit();
```

## Orchestration with External Services

### Inngest Integration

```typescript
import { Mastra } from "@mastra/core/mastra";
import { serve as inngestServe } from "@mastra/inngest";
import { PinoLogger } from "@mastra/loggers";
import { Inngest } from "inngest";
import { activityPlanningWorkflow } from "./workflows/inngest-workflow";
import { planningAgent } from "./agents/planning-agent";
import { realtimeMiddleware } from "@inngest/realtime";

const inngest = new Inngest({
  id: "mastra",
  baseUrl: `http://localhost:8288`,
  isDev: true,
  middleware: [realtimeMiddleware()],
});

export const mastra = new Mastra({
  workflows: {
    activityPlanningWorkflow,
  },
  agents: {
    planningAgent,
  },
  server: {
    host: "0.0.0.0",
    apiRoutes: [
      {
        path: "/api/inngest",
        method: "ALL",
        createHandler: async ({ mastra }) => inngestServe({ mastra, inngest }),
      },
    ],
  },
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
});
```

### Speech-to-Speech Server Example

```typescript
import { Roark } from "@roarkanalytics/sdk";
import chalk from "chalk";

import { mastra } from "./mastra";
import { createConversation, formatToolInvocations } from "./utils";
import { uploadToCloudinary } from "./upload";
import fs from "fs";

const client = new Roark({
  bearerToken: process.env.ROARK_API_KEY,
});

async function speechToSpeechServerExample() {
  const { start, stop } = createConversation({
    mastra,
    recordingPath: "./speech-to-speech-server.mp3",
    providerOptions: {},
    initialMessage: "Howdy partner",
    onConversationEnd: async (props) => {
      // File upload
      fs.writeFileSync(props.recordingPath, props.audioBuffer);
      const url = await uploadToCloudinary(props.recordingPath);

      // Send to Roark
      console.log("Send to Roark", url);
      const response = await client.callAnalysis.create({
        recordingUrl: url,
        startedAt: props.startedAt,
        callDirection: "INBOUND",
        interfaceType: "PHONE",
        participants: [
          {
            role: "AGENT",
            spokeFirst: props.agent.spokeFirst,
            name: props.agent.name,
            phoneNumber: props.agent.phoneNumber,
          },
          {
            role: "CUSTOMER",
            name: "Yujohn Nattrass",
            phoneNumber: "987654321",
          },
        ],
        properties: props.metadata,
        toolInvocations: formatToolInvocations(props.toolInvocations),
      });

      console.log("Call Recording Posted:", response.data);
    },
    onWriting: (ev) => {
      if (ev.role === "assistant") {
        process.stdout.write(chalk.blue(ev.text));
      }
    },
  });

  await start();

  process.on("SIGINT", async (e) => {
    await stop();
  });
}

speechToSpeechServerExample().catch(console.error);
```

## Voice Integration Patterns

### Agent Voice Capabilities

```typescript
import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { CompositeVoice } from "@mastra/core/voice";
import { OpenAIVoice } from "@mastra/voice-openai";
import { PlayAIVoice } from "@mastra/voice-playai";

const agent1 = new Agent({
  name: "Agent1",
  instructions: `You are an agent with both STT and TTS capabilities.`,
  model: openai("gpt-4o"),
  voice: new CompositeVoice({
    input: new OpenAIVoice(), // For converting speech to text
    output: new PlayAIVoice(), // For converting text to speech
  }),
});

const agent2 = new Agent({
  name: "Agent2",
  instructions: `You are an agent with both STT and TTS capabilities.`,
  model: openai("gpt-4o"),
  voice: new OpenAIVoice(),
});
```

### Combining Voice Providers

```typescript
import { OpenAIVoice } from "@mastra/voice-openai";
import { PlayAIVoice } from "@mastra/voice-playai";
import { CompositeVoice } from "@mastra/core/voice";
import { playAudio, getMicrophoneStream } from "@mastra/node-audio";

const input = new OpenAIVoice({
  listeningModel: {
    name: "whisper-1",
    apiKey: process.env.OPENAI_API_KEY,
  },
});

const output = new PlayAIVoice({
  speechModel: {
    name: "playai-voice",
    apiKey: process.env.PLAYAI_API_KEY,
  },
});

const voice = new CompositeVoice({
  input,
  output,
});

const audioStream = getMicrophoneStream();
const transcript = await voice.listen(audioStream);

console.log("Transcribed text:", transcript);

const responseAudio = await voice.speak(`You said: ${transcript}`, {
  speaker: "default",
  responseFormat: "wav",
});

playAudio(responseAudio);
```

## UI Integration

### Next.js Debate Interface

```typescript
"use client";

import { useState, useRef } from "react";
import { MastraClient } from "@mastra/client-js";

const mastraClient = new MastraClient({
  baseUrl: process.env.NEXT_PUBLIC_MASTRA_URL || "http://localhost:4111",
});

export default function DebateInterface() {
  const [topic, setTopic] = useState("");
  const [turns, setTurns] = useState(3);
  const [isDebating, setIsDebating] = useState(false);
  const [responses, setResponses] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startDebate = async () => {
    if (!topic) return;

    setIsDebating(true);
    setResponses([]);

    try {
      const optimist = mastraClient.getAgent("optimistAgent");
      const skeptic = mastraClient.getAgent("skepticAgent");

      const newResponses = [];
      let optimistResponse = "";
      let skepticResponse = "";

      for (let turn = 1; turn <= turns; turn++) {
        // Optimist's turn
        let prompt;
        if (turn === 1) {
          prompt = `Discuss this topic: ${topic}. Introduce your perspective on it.`;
        } else {
          prompt = `The topic is: ${topic}. Skeptic just said: \"${skepticResponse}\". Respond to their points.`;
        }

        const optimistResult = await optimist.generate({
          messages: [{ role: "user", content: prompt }],
        });

        optimistResponse = optimistResult.text;
        newResponses.push({
          agent: "Optimist",
          text: optimistResponse,
        });

        setResponses([...newResponses]);

        // Skeptic's turn
        prompt = `The topic is: ${topic}. Optimist just said: \"${optimistResponse}\". Respond to their points.`;

        const skepticResult = await skeptic.generate({
          messages: [{ role: "user", content: prompt }],
        });

        skepticResponse = skepticResult.text;
        newResponses.push({
          agent: "Skeptic",
          text: skepticResponse,
        });

        setResponses([...newResponses]);
      }
    } catch (error) {
      console.error("Error starting debate:", error);
    } finally {
      setIsDebating(false);
    }
  };

  const playAudio = async (text: string, agent: string) => {
    if (isPlaying) return;

    try {
      setIsPlaying(true);
      const agentClient = mastraClient.getAgent(
        agent === "Optimist" ? "optimistAgent" : "skepticAgent",
      );

      const audioResponse = await agentClient.voice.speak(text);

      if (!audioResponse.body) {
        throw new Error("No audio stream received");
      }

      const reader = audioResponse.body.getReader();
      const chunks = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
      }

      const blob = new Blob(chunks, { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);

      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.onended = () => {
          setIsPlaying(false);
          URL.revokeObjectURL(url);
        };
        audioRef.current.play();
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI Debate with Turn Taking</h1>

      <div className="mb-6">
        <label className="block mb-2">Debate Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g., Climate change, AI ethics, Space exploration"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2">Number of Turns (per agent):</label>
        <input
          type="number"
          value={turns}
          onChange={(e) => setTurns(parseInt(e.target.value))}
          min={1}
          max={10}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={startDebate}
        disabled={isDebating || !topic}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
      >
        {isDebating ? "Debate in Progress..." : "Start Debate"}
      </button>

      <audio ref={audioRef} className="hidden" />

      {responses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Debate Transcript</h2>

          <div className="space-y-4">
            {responses.map((response, index) => (
              <div
                key={index}
                className={`p-4 rounded ${
                  response.agent === "Optimist" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="font-bold">{response.agent}:</div>
                  <button
                    onClick={() => playAudio(response.text, response.agent)}
                    disabled={isPlaying}
                    className="text-sm px-2 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
                  >
                    {isPlaying ? "Playing..." : "Play"}
                  </button>
                </div>
                <p className="mt-2">{response.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

## Utility Functions

### Audio File Handling

```typescript
async function saveAudioToFile(
  audio: NodeJS.ReadableStream,
  filename: string,
): Promise<void> {
  const filePath = path.join(process.cwd(), filename);
  const writer = createWriteStream(filePath);
  audio.pipe(writer);
  return new Promise<void>((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

async function convertToText(
  input: string | NodeJS.ReadableStream,
): Promise<string> {
  if (typeof input === "string") {
    return input;
  }

  const chunks: Buffer[] = [];
  return new Promise<string>((resolve, reject) => {
    input.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    input.on("error", (err) => reject(err));
    input.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}
```

## API Reference

### Voice Events

Available events for voice orchestration:

```typescript
Events:
- speaking: Emitted when audio data is available
- speaker: Emitted with a stream that can be piped to audio output
- writing: Emitted when text is transcribed or generated
- error: Emitted when an error occurs
- tool-call-start: Emitted when a tool is about to be executed
- tool-call-result: Emitted when a tool execution is complete
```

### Voice Connection

```typescript
connect(options?: Record<string, unknown>): Promise<void>
  options: Provider-specific connection options
```

### Voice Event Parameters

```typescript
Parameter: event
  Type: string
  Description: Name of the event to listen for
  IsOptional: false
Parameter: callback
  Type: function
  Description: Callback function that will be called when the event occurs
  IsOptional: false
```

### CompositeVoice Methods

```typescript
CompositeVoice Methods:
  voice.speak(): Converts text to speech.
  voice.send(): Sends audio data to the voice provider in real-time.
  voice.on(): Registers an event listener for voice events.
```

### MastraVoice Abstract Methods

```typescript
speak(input: string | NodeJS.ReadableStream, options?: { speaker?: string }): Promise<NodeJS.ReadableStream | void>
listen(audioStream: NodeJS.ReadableStream, options?: unknown): Promise<string | NodeJS.ReadableStream | void>
getSpeakers(): Promise<Array<{ voiceId: string; [key: string]: unknown }>>
connect(): Promise<void>
send(audioData: NodeJS.ReadableStream | Int16Array): Promise<void>
answer(): Promise<void>
addTools(tools: Array<unknown>): void
close(): void
on(event: string, callback: (data: unknown) => void): void
off(event: string, callback: (data: unknown) => void): void
```

## Running Examples

### Basic Commands

```bash
# Run hierarchical multi-agent example
pnpm start

# Build projects with dependencies
npm i
npm run build
```

## Best Practices

### Workflow Design

1. **Modular Composition**: Use nested workflows for complex logic
2. **Error Handling**: Implement proper error boundaries in each step
3. **State Management**: Design clear input/output schemas
4. **Type Safety**: Leverage TypeScript for compile-time validation

### Agent Orchestration

1. **Role Definition**: Clearly define each agent's responsibilities
2. **Communication Patterns**: Establish clear message passing protocols
3. **Resource Management**: Handle voice and compute resources efficiently
4. **Monitoring**: Implement logging and observability

### Voice Integration

1. **Event Handling**: Properly handle all voice events
2. **Stream Management**: Manage audio streams efficiently
3. **Error Recovery**: Implement fallback mechanisms
4. **Performance**: Optimize for real-time interactions

This documentation provides a comprehensive foundation for orchestrating complex AI systems with Mastra, covering workflows, agents, voice interactions, and advanced coordination patterns.

#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const PRODUCTION_URL = "https://signalgate-web.vercel.app"; 

const server = new Server(
  {
    name: "signalgate",
    version: "1.0.8",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_sentiment",
        description: "Get real-time, Gemini 2.0-powered market sentiment for a specific ticker (BTC, SOL, ETH).",
        inputSchema: {
          type: "object",
          properties: {
            ticker: { type: "string", description: "The crypto ticker symbol" },
          },
          required: ["ticker"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const apiKey = process.env.SIGNALGATE_API_KEY;

  if (!apiKey) {
    return {
      content: [{ type: "text", text: "Error: SIGNALGATE_API_KEY not found. Get one at signalgate-web.vercel.app" }],
      isError: true
    };
  }

  if (name === "get_sentiment") {
    const ticker = args.ticker.toUpperCase();
    const endpoint = `${PRODUCTION_URL}/api/sentiment?symbol=${ticker}`;
    
    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          content: [{ type: "text", text: `SignalGate Error: ${result.error}` }],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: "text",
            text: `🎯 Alpha for ${ticker}: ${result.data.sentiment} (Score: ${result.data.score}/100)\n\n${result.data.thesis}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: "Network Error: Could not reach SignalGate backend." }],
        isError: true,
      };
    }
  }
  throw new Error(`Tool not found: ${name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(() => process.exit(1));
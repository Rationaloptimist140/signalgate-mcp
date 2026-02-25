# SignalGate MCP

> The sentiment engine for the AI Agent economy. Powered by Gemini 2.0.

[![npm version](https://img.shields.io/npm/v/signalgate-mcp.svg)](https://www.npmjs.com/package/signalgate-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

SignalGate MCP is a [Model Context Protocol](https://modelcontextprotocol.io) server that gives AI agents real-time crypto market sentiment powered by Google Gemini 2.0. Drop it into Claude Desktop, Cursor, or any MCP-compatible agent and instantly unlock live BTC, ETH, and SOL sentiment analysis.

---

## Features

- **Gemini 2.0 powered** — real-time sentiment scoring, not stale data
- **MCP native** — works with Claude Desktop, Cursor, Windsurf, and any MCP host
- **Simple API** — one tool, one call, actionable alpha
- **Supports BTC, ETH, SOL** — more tickers coming soon

---

## Quick Start

### 1. Get your API key

Sign up at [signalgate-web.vercel.app](https://signalgate-web.vercel.app) to get your `SIGNALGATE_API_KEY`.

### 2. Install

```bash
npm install -g signalgate-mcp
```

### 3. Configure Claude Desktop

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "signalgate": {
      "command": "signalgate",
      "env": {
        "SIGNALGATE_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

---

## Usage

Once connected, ask your AI agent:

```
What is the current sentiment for BTC?
Get me the Gemini 2.0 sentiment score for SOL.
Is ETH bullish or bearish right now?
```

### Tool: `get_sentiment`

| Parameter | Type   | Required | Description              |
|-----------|--------|----------|--------------------------||
| `ticker`  | string | Yes      | Crypto ticker: BTC, ETH, SOL |

**Example response:**
```
Alpha for BTC: Bullish (Score: 78/100)

Strong institutional accumulation signals detected. On-chain data shows whale wallets increasing positions. Macro sentiment aligns with risk-on environment.
```

---

## Installation (Manual / npx)

```bash
# Run without installing
npx signalgate-mcp

# Or install globally
npm install -g signalgate-mcp
```

---

## Config File Locations

| Platform | Path |
|----------|------|
| macOS    | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows  | `%APPDATA%\Claude\claude_desktop_config.json` |
| Linux    | `~/.config/Claude/claude_desktop_config.json` |

---

## License

MIT — built by [RK / SignalGate](https://signalgate-web.vercel.app)

---
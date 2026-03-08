#!/bin/bash
curl -X PUT -H 'Authorization: token TOKEN' -H 'Accept: application/vnd.github.mercy-preview+json' -d '{"names":["mcp","ai","crypto","sentiment-analysis","typescript"]}' https://api.github.com/repos/Rationaloptimist140/signalgate-mcp/topics

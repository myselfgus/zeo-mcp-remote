# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Zeo MCP Remote** - a production-ready Model Context Protocol (MCP) server running on Cloudflare Workers with 23 specialized AI-powered tools across 8 categories. The server provides advanced development assistance capabilities through Claude.ai integration.

## Architecture

The codebase follows a single-file architecture pattern with all 23 tools implemented in `src/index.ts`. The server extends the MCP Agent framework and implements tools using the Zod schema validation library.

Key architectural components:
- **Runtime**: Cloudflare Workers with Durable Objects
- **Database**: D1 SQLite for persistent storage
- **Storage**: R2 for file storage, KV for sessions
- **AI**: Cloudflare AI models integration
- **Auth**: GitHub OAuth 2.1 with secure session management

## Common Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Deploy to production
npm run deploy

# Deploy to staging environment
npm run deploy:staging

# Run database migrations
npm run db:migrate

# Reset database (development only)
npm run db:reset

# View logs
npm run logs

# Run linter
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

## Tool Categories & Implementation

The server implements 23 tools across 8 categories:

1. **Reasoning & Intelligence** (4 tools): unified_reasoner, strategic_intelligence, pattern_intelligence, decision_engine
2. **Smart File System** (4 tools): intelligent_file_ops, codebase_navigator, project_analyzer, content_transformer
3. **External Integration** (3 tools): github_orchestrator, web_intelligence, system_commander
4. **Memory & Knowledge** (4 tools): persistent_memory_engine, dynamic_context_manager, knowledge_graph_navigator, insight_aggregator
5. **Performance & Operations** (2 tools): performance_optimizer, workflow_automator
6. **Security** (1 tool): security_guardian
7. **Development Experience** (3 tools): dev_assistant, genai_scripter, functional_architect
8. **Creative Intelligence** (2 tools): ideation_engine, implementation_bridge

## Key Endpoints

- `/sse` - MCP Server-Sent Events endpoint for Claude.ai integration
- `/mcp` - Alternative MCP endpoint
- `/health` - Health check endpoint
- `/` - Documentation page

## Environment Configuration

Required Cloudflare secrets:
- `GITHUB_CLIENT_ID` - GitHub OAuth app client ID
- `GITHUB_CLIENT_SECRET` - GitHub OAuth app client secret
- `COOKIE_ENCRYPTION_KEY` - Cookie encryption key for sessions

## Development Notes

- The project uses TypeScript with strict type checking
- All tools follow a consistent pattern with Zod schema validation
- Each tool returns structured JSON responses wrapped in MCP content format
- The server uses Server-Sent Events (SSE) for real-time communication with Claude.ai
- Cloudflare Workers compatibility flags include Node.js compatibility mode

## Testing Approach

Currently, the project doesn't have a formal test suite. When implementing tests:
- Use the `npm run test` command which runs `wrangler dev --test`
- Focus on testing individual tool implementations
- Ensure proper error handling and edge case coverage
- Test integration with Cloudflare services (D1, KV, R2)

## Deployment Workflow

1. Make changes to `src/index.ts`
2. Run `npm run lint` and `npm run type-check` to ensure code quality
3. Test locally with `npm run dev`
4. Deploy to staging with `npm run deploy:staging`
5. After verification, deploy to production with `npm run deploy`
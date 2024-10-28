# Carbon TypeScript SDK

[![License](https://img.shields.io/badge/license-GNU%20AGPL-blue)](LICENSE)
[![TypeScript](https://img.shields.io/badge/types-TypeScript-blue)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/github/actions/workflow/status/carbon-host/carbon-typescript/ci.yml)](https://github.com/carbon-host/carbon-typescript/actions)
[![npm](https://img.shields.io/npm/v/@carbonhost/typescript)](https://www.npmjs.com/package/@carbonhost/typescript)

The **Carbon TypeScript SDK** enables easy integration with the Carbon Host platform for managing Minecraft server hosting and related services. Built with TypeScript, it provides a streamlined interface for creating, managing, and deploying Minecraft servers.

## Installation

To install the SDK, use your preferred package manager:

```bash
npm install @carbonhost/typescript
```
```bash
bun add @carbonhost/typescript
```

## Usage

Import the SDK in your TypeScript project and initialize it with your API key to get started.

```typescript
import Carbon from '@carbonhost/typescript';

const carbon = new Carbon({ apiKey: 'your-api-key' });

// Example: Fetch all stars (given top level await, otherwise fetch Promises accordingly)
const stars = await carbon.getStars();

console.log(stars);
```

## Documentation

For full documentation, visit the [Documentation](https://carbon.host/docs/typescript) page.

## Support

If you encounter issues or have questions, open an issue on our [GitHub Issues page](https://github.com/carbon-host/carbon-typescript/issues) or join our [Discord server](https://discord.gg/carbon).

## License

This project is licensed under the [GNU AGPL License](LICENSE).

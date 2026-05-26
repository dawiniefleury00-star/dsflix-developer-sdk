# Contributing

Thank you for your interest in contributing to the DSFlix SDK!

---

## Development Setup

```bash
# Clone the repository
git clone https://github.com/dsflix/dsflix-sdk.git
cd dsflix-sdk/sdk

# Install dependencies
npm install

# Build the SDK
npm run build

# Watch mode
npm run dev
```

---

## Project Structure

```
sdk/
├── src/
│   ├── index.ts          # Public API exports
│   ├── client.ts         # DsfClient class
│   ├── http.ts           # Internal HTTP client
│   ├── error.ts          # DsfError class
│   ├── types.ts          # All TypeScript types
│   └── modules/          # Per-domain modules
│       ├── movies.ts
│       ├── tv.ts
│       ├── search.ts
│       ├── ai.ts
│       ├── user.ts
│       ├── coins.ts
│       ├── membership.ts
│       ├── music.ts
│       ├── news.ts
│       └── home.ts
├── docs/                 # 26-page documentation
├── examples/             # Usage examples
├── package.json
├── tsconfig.json
└── README.md
```

---

## Adding a New Module

1. Create `src/modules/your-module.ts`
2. Export a class with method implementations
3. Add the module to `src/client.ts`
4. Export types from `src/types.ts`
5. Export module from `src/index.ts`
6. Add documentation to `docs/`

---

## Code Style

- Use TypeScript strict mode
- Document all public methods with JSDoc
- Handle errors explicitly — throw `DsfError` for API errors
- Keep modules focused — one domain per file

---

## Submitting a PR

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-module`
3. Make your changes
4. Run `npm run build` and verify no errors
5. Submit a pull request with a description

---

## Reporting Issues

Use [GitHub Issues](https://github.com/dsflix/dsflix-sdk/issues) to report:
- Bugs
- Missing endpoints
- Type errors
- Documentation issues

---

## License

By contributing, you agree your contributions will be licensed under the MIT License.

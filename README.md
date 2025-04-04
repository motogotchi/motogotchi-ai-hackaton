# Motogotchi AI

Motogotchi AI bot deployed on Internet Computer Protocol (ICP).

## Setup Guide

### Prerequisites

- Install `dfx`: `sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"`
- Install [NodeJS](https://nodejs.org/en/download/package-manager)
- Install Motoko package manager: `npm i -g ic-mops`

### Development Steps

1. **Develop Locally**

   ```
   pnpm run dev
   ```

2. **Deploy Locally**

   ```
   pnpm run deploy
   ```

3. **Deploy to Mainnet**
   - Obtain [cycles](https://internetcomputer.org/docs/building-apps/getting-started/tokens-and-cycles) by converting ICP tokens
   - Deploy: `dfx deploy --network ic`
   - Set up [cycle management](https://cycleops.dev/) to prevent your project from being removed when cycles run out

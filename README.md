# Motogotchi AI

Motogotchi AI bot deployed on Internet Computer Protocol (ICP).

<img width="1159" alt="Screenshot 2025-04-07 at 08 41 44" src="https://github.com/user-attachments/assets/e88a8a94-b30b-400a-8df4-a7085d1053b6" />

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

2. **Build Locally**

   ```
   pnpm run build
   ```

3. **Deploy Locally**

   ```
   pnpm run deploy
   ```

4. **Deploy to Mainnet**
   - Obtain [cycles](https://internetcomputer.org/docs/building-apps/getting-started/tokens-and-cycles) by converting ICP tokens
   - Deploy: `dfx deploy --network ic`
   - Set up [cycle management](https://cycleops.dev/) to prevent your project from being removed when cycles run out

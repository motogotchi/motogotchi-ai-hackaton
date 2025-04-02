# Motogotchi AI

Motogotchi AI bot deployed on Internet Computer Protocol (ICP).

## Setup Guide

### Prerequisites

- Install `dfx`: `sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"`
- Install [NodeJS](https://nodejs.org/en/download/package-manager)
- Install Motoko package manager: `npm i -g ic-mops`

### Development Steps

1. **Create Identity**

   ```
   dfx start --background
   dfx identity new YOUR_IDENTITY_NAME
   dfx identity use YOUR_IDENTITY_NAME
   ```

   _Important: Save your seed phrase securely_

2. **Deploy Locally**

   ```
   npm install
   dfx deploy
   ```

   Your project will run locally with URLs shown in terminal.

3. **Deploy to Mainnet**
   - Obtain [cycles](https://internetcomputer.org/docs/building-apps/getting-started/tokens-and-cycles) by converting ICP tokens
   - Deploy: `dfx deploy --network ic`
   - Set up [cycle management](https://cycleops.dev/) to prevent your project from being removed when cycles run out

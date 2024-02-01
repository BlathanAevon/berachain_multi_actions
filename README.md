# Installation and Configuration

This README provides step-by-step instructions for installing the program and configuring settings in the `config.ts` file.

## Installation

1. **Clone the Repository:**

   ```bash
    git clone https://github.com/BlathanAevon/berachain_multi_actions.git
   ```

2. **Go to your repository**

 ```bash
   cd your-repo
 ```

3. **Install dependencies**

  ```bash
  npm i
  ```

## Configuration

In the `config.ts` file you will find all the settings.
In the `data/wallets.txt`, put your private keys
In the `data/proxies.txt`, put you proxies in format: `ip:port:login:pass`

## Launch

Type in the terminal on of the following commands:
`npm run main faucet` - get tokens from faucet
`npm run main chain` - make random onchain actions (unstable)
`npm run main warmup` - do basic warmup of wallets
`npm run main deploy` - deploy contract on every wallet

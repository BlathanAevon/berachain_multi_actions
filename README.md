# Installation and Configuration


<br>

> [!WARNING]
> The program is in the development stage as well as Bartio testnet, the modules can crash or work incorrectly, each module can require manual adjustment.

<p align="center">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSStlHMF7kT65jwVfXt9PwzRG23NOZXESt70Q&s" width="300" height="100" border="1"/>
</p>

This README provides step-by-step instructions for installing the program and configuring settings in the `config.ts` file.

> [!NOTE]
> The program requires the latest nodejs version, you can install it from [here](https://nodejs.org/en)

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/BlathanAevon/berachain_multi_actions.git
```

2. **Cd into the repository**

```bash
cd berachain_multi_actions
```

3. **Configuration**

Set wallets and proxies in `src/data/wallets.txt` and `src/data/proxies.txt`
- for wallets: `private key`
- for proxies: `ip:port:login:pass`

### In `src/config.ts` set CAPSOLVER_KEY if you want to use faucet

# Run the program

## On Windows:
```powershell
run.bat
```

## On Linux/MacOS:

```bash
./run.sh
```
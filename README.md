# Gnosis-IDO
Interact Pancake swap with Gnosis for IDO.
- include create safe, multi-sig tx, erc20 approve

# Getting Started
## Environment variables
```sh
cp .env-sample .env
```
configure your environment variables in the `.env` file.

- note: gnosis safe relevant contract's address on each chain might be different. 

## run the example
Install dependecies:
```sh
# yarn install dependecies
yarn

# run the example
yarn start ./src/xxx/xxx.ts
```
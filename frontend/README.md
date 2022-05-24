
# Octav Technical Project (Frontend)

## Tech stacks

- create-next-app
- TypeScript
- [web3-react (beta)](https://github.com/NoahZinsmeister/web3-react)
- [ethers.js](https://github.com/ethers-io/ethers.js/)
- ESLint (`eslint-config-google`)
- `husky` & `lint-staged`
- `tailwindcss`

## References

- [web3-react (beta)](https://github.com/NoahZinsmeister/web3-react)
- [example-next](https://github.com/NoahZinsmeister/web3-react/tree/main/packages/example-next)

## Getting the project up and running

```bash
yarn install
# development
yarn dev
# production
yarn build
yarn start
```

## TODOs
- Follow https://nextjs.org/docs/basic-features/eslint.
- Handle "TODO: could use tailwindcss".
- Interact with the local storage using a well-designed mechanism. e.g. the one from `react-use`
- Loading should be based on an enum or a state machine instead of a boolean according to [Stop using isLoading booleans](https://kentcdodds.com/blog/stop-using-isloading-booleans)
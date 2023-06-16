## Introduction
This project has bootstrapped with [Vite (React + TS + CSS Modules)](https://vitejs.dev/guide/features.html), [Vitest (Testing library)](https://vitest.dev), [MSW](https://mswjs.io), and [React router](https://reactrouter.com/en/main). :sparkles::purple_heart:

## Prerequisites
To run the proyect, you will need to install some extensions/tools before to do so:
- Node.js LTS version (for installing dependencies on your local machine as you'll work with TypeScript)
- You have installed Docker. If not, you can download it from [here](https://www.docker.com/products/docker-desktop).
- [VS Code](https://code.visualstudio.com/download)
- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [Spanish Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-spanish)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

## Getting Started
Once you have these tools/extensions installed, you can proceed to install the project dependencies

``` bash
npm ci
```

Then, you can run the development server:
``` bash
npm run docker:dev
```

To run your test on docker to ensure everything works on the same environment, process to perform the following command:
``` bash
npm run docker:test
```

You may want to test while writting your tests, to do so, you can run the following command:
``` bash
npm run test:watch
```


Happy coding! :four_leaf_clover:

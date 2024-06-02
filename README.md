# JSONP typescript Library

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]


A simple and lightweight library for making JSONP (JSON with Padding) requests in TypeScript/JavaScript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Parameters](#parameters)
- [Examples](#examples)
- [License](#license)

## Installation

You can install the library using npm:

```bash
# Using npm
npm install jsonp-ts

# Using yarn
yarn add --dev jsonp-ts

# Using pnpm
pnpm add -D jsonp-ts

```

## Usage

First, import the jsonp function from the library:

```typescript
import { jsonp } from 'jsonp-ts';

```
Then, you can use the jsonp function to make JSONP requests:


```typescript
// Promise
jsonp('https://api.example.com/data')
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// or

// async/await
async function main() {
  try {
    const response = await jsonp('https://api.example.com/data');
  }
  catch (e) {
    console.error('Error:', e);
  }
}
```
## Api

`jsonp(url: string, params?: JsonpParams): Promise<Response>`
Makes a JSONP request to the specified URL.

Parameters
- `url`: The URL to which the JSONP request is made.
- `params`: Optional parameters to customize the JSONP request. See [Parameters](#parameters) for details.

Returns
- A `Promise` that resolves with the response data or rejects with an error.

## Parameters
The `params` object can include the following properties:

- `param` (string): The name of the query string parameter to specify the callback (defaults to `"callback"`).
- `prefix` (string): The prefix for the global callback functions that handle JSONP responses (defaults to `"__jp"`).
- `name` (string): The name of the global callback functions that handle JSONP responses (defaults to prefix + incremented counter).
- `timeout` (number): The timeout in milliseconds (defaults to `60000`).

## Examples


### Basic example

```typescript
import { jsonp } from 'jsonp-ts';

jsonp('https://api.example.com/data')
  .then(response => {
    console.log('Data received:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });

```

### Custom parameters example:

```typescript
import { jsonp } from 'jsonp-ts';

const params = {
  param: 'customCallback',
  prefix: '__customPrefix',
  timeout: 30000,
};

jsonp('https://api.example.com/data', params)
  .then(response => {
    console.log('Data received:', response);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## License

 This project is licensed under the MIT License.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/jsonp-ts/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/jsonp-ts

[npm-downloads-src]: https://img.shields.io/npm/dm/jsonp-ts.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/jsonp-ts

[license-src]: https://img.shields.io/npm/l/jsonp-ts.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/jsonp-ts
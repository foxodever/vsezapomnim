# vsezapomnim

Shows all companies that have left the Russian Federation

## Installation

In order to use this library, you need Node.js **14.x** or higher.

```bash
# Installing via npm
npm install vsezapomnim

# Installing via yarn
yarn add vsezapomnim

# Installing via pnpm
pnpm install vsezapomnim
```

## Example

Get all companies:

```js
const { vsezapomnim } = require("vsezapomnim")

vsezapomnim().then(r => {
    console.log(r); // logs all companies to console
}).catch(err => {
    // if there's error
    console.log(err);
})
```

Get info about company:

```js
const { fetchCompany } = require("vsezapomnim")

fetchCompany(103).then(r => {
    console.log(r);
}).catch(err => {
    console.log(err);
})
```

## Proxy Example

Get all companies:

```js
const { vsezapomnim } = require("vsezapomnim")

vsezapomnim({
    host: "1.1.1.",
    port: 8080,
    type: "https"
}).then(r => {
    console.log(r)
}).catch(err => {
    console.log(err)
})
```

Get info about company:

```js
const { fetchCompany } = require("vsezapomnim")

fetchCompany(103, {
    host: "1.1.1.1",
    port: 8080,
    type: "https"
}).then(r => {
    console.log(r);
}).catch(err => {
    console.log(err);
})
```
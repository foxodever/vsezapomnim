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

```js
const vsezapomnim = require("vsezapomnim")

vsezapomnim().then(r => {
    console.log(r); // logs all companies to console
}).catch(err => {
    // if there's error
    console.log(err);
})
```

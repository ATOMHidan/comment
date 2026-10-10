# Waline Example

## Blog account interface

`account-ui.cjs` styles the existing account pages for Soyo Course. Login,
registration, email verification, password recovery, and profile updates still
use the original Waline forms and APIs. Social login controls are hidden in the
interface; OAuth endpoints are intentionally unchanged.

The server is pinned to `1.32.3`, the version previously running in production.
The account UI is pinned to `0.36.0`, the version served when this change was
prepared. `package-lock.json` makes installations reproducible.

The blog connects through `https://sign.262860.xyz/`. Theme colors are passed to
the login window; existing database and SMTP environment variables stay in
Vercel. Mail verification and password recovery require a working SMTP setup.

All UI styling is included in the account HTML. It does not load additional
fonts, images or UI libraries. The comment API and stored accounts are unchanged.

This directory is a brief example of a [Waline](https://waline.js.org/) app that can be deployed with Vercel and zero configuration.

## Deploy Your Own

Deploy your own Waline project with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/walinejs/waline/tree/main/example)

### How We Created This Example

```js
//index.js
const Waline = require('@waline/vercel');
module.exports = Waline();

//vercel.json
{
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

### Deploying From Your Terminal

You can deploy your new Waline project with a single command from your terminal using [Vercel CLI](https://vercel.com/download):

```shell
vercel
```

# d-pac [![devDependency Status](https://david-dm.org/d-pac/d-pac.client/dev-status.png?style=flat)](https://david-dm.org/d-pac/d-pac.client#info=devDependencies)

> Digital platform for assessment of competences

**NOT PRODUCTION READY**

Not by a long shot.

## Installation

```shell
$ npm install && npm run bowerInstall
```

## Set up

Copy [`EXAMPLE.env`](/d-pac/d-pac.client/blob/master/EXAMPLE.env) and rename it to `.env`, adjust the settings in it as necessary.

## Development

```sh
$ npm run preview
```

Will run the webpack-dev-server and serve the application on http://localhost:9000

## Building

```sh
$ npm run build
```

This will pack everything up and copy all relevant files to a `dist` directory.

## Deployment

Serve the contents of the `dist` directory with [express](http://expressjs.com/) or [nginx](http://nginx.org/) for instance.

## Testing

### Unit & integration testing

```sh
$ npm test
```

### e2e

Make sure the backend is running on localhost:3029, then

```sh
$ npm run preview:e2e
```

Which will start the webpack dev server. Once ready run

```sh
$ npm run test:e2e
```

[D-PAC  Copyright (C) 2014-2016  d-pac](LICENSE)
[http://www.d-pac.be](http://www.d-pac.be)

# joi-image-extension

A [Joi](https://github.com/hapijs/joi) extension for validating image sizes and types.

## Requirements

* [Node.js](https://nodejs.org/en/) 6.x+
* [Joi](https://github.com/hapijs/joi) 10.x+

## Installation

```sh
npm install joi-image-extension --save
```

## Usage

```js
const fs = require('fs')
const BaseJoi = require('joi')
const ImageExtension = require('joi-image-extension')
const concat = require('concat-stream')

const Joi = BaseJoi.extend(ImageExtension)

const schema = Joi
  .image()
  .minDimensions(100, 50)

fs
  .createReadStream('./avatar.jpg')
  .pipe(concat(image => {
    Joi.validate(image, schema, (err, value) => {
      // Handle validation result...
    })
  }))

```

## API

### `image.minWidth(minimum pixel width)`

Set a minimum pixel width for an image.

### `image.maxWidth(maximum pixel width)`

Set a maximum pixel width for an image.

### `image.minHeight(minimum pixel height)`

Set a minimum pixel height for an image.

### `image.maxHeight(maximum pixel height)`

Set a maximum pixel height for an image.

### `image.minDimensions(minimum pixel width, minimum pixel height)`

Set minimum pixel width and height for an image.

### `image.maxDimensions(maximum pixel width, maximum pixel height)`

Set maximum pixel width and height for an image.

### `image.allowTypes(allowed image types)`

Set the allowed image type(s). This can be a single string or an array of strings of lower case extensions listed under "Supported Formats" for the [`image-size`](https://www.npmjs.com/package/image-size) package, e.g. `Joi.image().allowTypes('jpg')`, `Joi.image().allowTypes(['png', 'bmp'])`

### `image.disallowTypes(disallowed image types)`

Set the disallowed image type(s). This can be a single string or an array of strings of lower case extensions listed under "Supported Formats" for the [`image-size`](https://www.npmjs.com/package/image-size) package, e.g. `Joi.image().allowTypes('jpg')`, `Joi.image().allowTypes(['png', 'bmp'])`

## Development

### Testing

`npm test` runs linting (with [`eslint`](https://www.npmjs.com/package/eslint)), unit tests (with [`mocha`](https://www.npmjs.com/package/mocha)), and test coverage (with [`nyc`](https://www.npmjs.com/package/nyc)) all in one. There are also piece-meal scripts for running them one-off:

* `npm run lint`
* `npm run mocha`
* `npm run coverage && npm run check-coverage`

As well as watch scripts for each of them, and for all in combination:

* `npm run watch:lint`
* `npm run watch:mocha`
* `npm run watch:coverage`
* `npm run watch:test`

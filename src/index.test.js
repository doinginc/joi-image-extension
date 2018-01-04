const fs = require('fs')
const path = require('path')
const util = require('util')
const { assert } = require('chai')
const BaseJoi = require('joi')
const ImageExtension = require('./index')

const Joi = BaseJoi.extend(ImageExtension)
const readFileAsync = util.promisify(fs.readFile)

describe('Joi Image Extension', function () {
  const getTestImages = async () => {
    const images = [
      '../test/100x100.gif',
      '../test/100x100.jpg',
      '../test/100x100.png'
    ]

    return Promise.all(images.map(image => readFileAsync(path.join(__dirname, image))))
  }

  it('should fail for images below width minimum', async function () {
    const schema = Joi
      .image()
      .minWidth(150)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNotNull(result.error)
      assert.equal(result.error.details[0].type, 'image.minWidth')
    })
  })

  it('should pass for images equal to width minimum', async function () {
    const schema = Joi
      .image()
      .minWidth(100)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images above width minimum', async function () {
    const schema = Joi
      .image()
      .minWidth(99)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images below width maximum', async function () {
    const schema = Joi
      .image()
      .maxWidth(150)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images equal to width maximum', async function () {
    const schema = Joi
      .image()
      .maxWidth(100)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should fail for images above width maximum', async function () {
    const schema = Joi
      .image()
      .maxWidth(99)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNotNull(result.error)
      assert.equal(result.error.details[0].type, 'image.maxWidth')
    })
  })

  it('should fail for images below height minimum', async function () {
    const schema = Joi
      .image()
      .minHeight(150)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNotNull(result.error)
      assert.equal(result.error.details[0].type, 'image.minHeight')
    })
  })

  it('should pass for images equal to height minimum', async function () {
    const schema = Joi
      .image()
      .minHeight(100)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images above height minimum', async function () {
    const schema = Joi
      .image()
      .minHeight(99)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images below height maximum', async function () {
    const schema = Joi
      .image()
      .maxHeight(150)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images equal to height maximum', async function () {
    const schema = Joi
      .image()
      .maxHeight(100)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should fail for images above height maximum', async function () {
    const schema = Joi
      .image()
      .maxHeight(99)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNotNull(result.error)
      assert.equal(result.error.details[0].type, 'image.maxHeight')
    })
  })

  it('should fail for images below minimum dimensions', async function () {
    const schema = Joi
      .image()
      .minDimensions(150, 150)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNotNull(result.error)
      assert.equal(result.error.details[0].type, 'image.minDimensions')
    })
  })

  it('should pass for images equal to minimum dimensions', async function () {
    const schema = Joi
      .image()
      .minDimensions(100, 100)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images above minimum dimensions', async function () {
    const schema = Joi
      .image()
      .minDimensions(99, 99)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images below maximum dimensions', async function () {
    const schema = Joi
      .image()
      .maxDimensions(150, 150)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should pass for images equal to maximum dimensions', async function () {
    const schema = Joi
      .image()
      .maxDimensions(100, 100)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNull(result.error)
    })
  })

  it('should fail for images above maximum dimensions', async function () {
    const schema = Joi
      .image()
      .maxDimensions(99, 99)

    const images = await getTestImages()

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNotNull(result.error)
      assert.equal(result.error.details[0].type, 'image.maxDimensions')
    })
  })

  it('should pass for images in the specified allowed types', async function () {
    const schema = Joi
      .image()
      .allowTypes('jpg')

    const image = await readFileAsync(path.join(__dirname, '../test/100x100.jpg'))

    const result = schema.validate(image)
    assert.isNull(result.error)
  })

  it('should fail for images not in the specified allowed types', async function () {
    const schema = Joi
      .image()
      .allowTypes(['jpg', 'png'])

    const image = await readFileAsync(path.join(__dirname, '../test/100x100.gif'))

    const result = schema.validate(image)
    assert.isNotNull(result.error)
    assert.equal(result.error.details[0].type, 'image.allowTypes')
  })

  it('should fail for images in the specified disallowed types', async function () {
    const schema = Joi
      .image()
      .disallowTypes('jpg')

    const image = await readFileAsync(path.join(__dirname, '../test/100x100.jpg'))

    const result = schema.validate(image)
    assert.isNotNull(result.error)
    assert.equal(result.error.details[0].type, 'image.disallowTypes')
  })

  it('should pass for images not in the specified disallowed types', async function () {
    const schema = Joi
      .image()
      .disallowTypes(['png'])

    const image = await readFileAsync(path.join(__dirname, '../test/100x100.jpg'))

    const result = schema.validate(image)
    assert.isNull(result.error)
  })
})

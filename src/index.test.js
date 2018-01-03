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

  it('should fail for an image under width minimum', async function () {
    const images = await getTestImages()
    const schema = Joi
      .image()
      .minWidth(150)

    images.forEach(image => {
      const result = schema.validate(image)
      assert.isNotNull(result.error)
    })
    console.log('images', images)
  })

  it('should pass for an image equal to width minimum')

  it('should pass for an image above width minimum')

  it('should fail for an image under width maximum')

  it('should pass for an image equal to width maximum')

  it('should pass for an image above width maximum')
})

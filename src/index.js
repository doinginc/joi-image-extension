const imageSize = require('image-size')

module.exports = Joi => {
  // Validation for width/height parameters

  const dimensionSchema = Joi
    .number()
    .positive()
    .required()

  const typesSchema = Joi
    .array()
    .allow(imageSize.types)
    .min(1)
    .required()

  return {
    name: 'image',
    base: Joi.binary(),
    language: {
      minWidth: 'must be at least {{minWidth}} pixels in width',
      maxWidth: 'must be no more than {{maxWidth}} pixels in width',
      minHeight: 'must be at least {{minHeight}} pixels in height',
      maxHeight: 'must be no more than {{maxHeight}} pixels in height',
      minDimensions: 'must be at least {{minWidth}} pixels in width and {{minHeight}} pixels in height',
      maxDimensions: 'must be no more than {{minWidth}} pixels in width and {{minHeight}} pixels in height',
      allowTypes: 'must be one of the following types: {{allowedTypes}}',
      disallowTypes: 'must be one of the following types: {{allowedTypes}}'
    },

    pre (value, state, options) {
      // Cache the image size read in case we're checking multiple rules
      this._image = imageSize(value)
      return value
    },

    rules: [
      // Minimum width

      {
        name: 'minWidth',
        params: {
          minWidth: dimensionSchema
        },
        validate (params, value, state, options) {
          if (this._image.width < params.minWidth) {
            return this.createError('image.minWidth', params, state, options)
          }
          return value
        }
      },

      // Maximum width

      {
        name: 'maxWidth',
        params: {
          maxWidth: dimensionSchema
        },
        validate (params, value, state, options) {
          if (this._image.width > params.maxWidth) {
            return this.createError('image.maxWidth', params, state, options)
          }
          return value
        }
      },

      // Minimum height

      {
        name: 'minHeight',
        params: {
          minHeight: dimensionSchema
        },
        validate (params, value, state, options) {
          if (this._image.height < params.minHeight) {
            return this.createError('image.minHeight', params, state, options)
          }
          return value
        }
      },

      // Maximum height

      {
        name: 'maxHeight',
        params: {
          maxHeight: dimensionSchema
        },
        validate (params, value, state, options) {
          if (this._image.height > params.maxHeight) {
            return this.createError('image.maxHeight', params, state, options)
          }
          return value
        }
      },

      // Minimum width/height

      {
        name: 'minDimensions',
        params: {
          minWidth: dimensionSchema,
          minHeight: dimensionSchema
        },
        validate (params, value, state, options) {
          if (this._image.width < params.minWidth || this._image.height < params.minHeight) {
            return this.createError('image.minDimensions', params, state, options)
          }
          return value
        }
      },

      // Maximum width/height

      {
        name: 'maxDimensions',
        params: {
          minWidth: dimensionSchema,
          minHeight: dimensionSchema
        },
        validate (params, value, state, options) {
          if (this._image.width > params.minWidth || this._image.height > params.minHeight) {
            return this.createError('image.maxDimensions', params, state, options)
          }
          return value
        }
      },

      // Allow types

      {
        name: 'allowTypes',
        params: {
          allowedTypes: typesSchema
        },
        validate (params, value, state, options) {
          const allowedTypes = Array.isArray(params.allowedTypes) ? params.allowedTypes : [params.allowedTypes]
          if (!allowedTypes.includes(this._image.type)) {
            return this.createError('image.allowTypes', { allowedTypes: allowedTypes.join(', ') }, state, options)
          }
          return value
        }
      },

      // Disallow types

      {
        name: 'disallowTypes',
        params: {
          disallowedTypes: typesSchema
        },
        validate (params, value, state, options) {
          const disallowedTypes = Array.isArray(params.disallowedTypes) ? params.disallowedTypes : [params.disallowedTypes]
          if (disallowedTypes.includes(this._image.type)) {
            const allowedTypes = imageSize.types.filter(type => !disallowedTypes.includes(type))
            return this.createError('image.disallowTypes', { allowedTypes: allowedTypes.join(', ') }, state, options)
          }
          return value
        }
      }
    ]
  }
}

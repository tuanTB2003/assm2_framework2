import Joi from "joi"

const SchemaProduct = Joi.object({
    name: Joi.string().required().min(4).messages({
        "string.empty": `name should not be empty`,
        "string.min": "name should be at least 4 character"
    }),
    category: Joi.string().required(),
    description: Joi.string().required(),
    discount: Joi.number().min(1).messages({
        "string.min": "discount should be > 1"
    }),
    images: Joi.array().required().min(1).messages({
        'array.base': 'You should be uploading images',
        'array.min': 'You should be uploading images',
    }),
    rating: Joi.number(),
    price: Joi.number().required().min(1).messages({
        "number.empty": "Price should be required ",
        "number.min": "Price should be at least 1",
    }),
    quantity: Joi.number().required().min(1).messages({
        "number.empty": "Quantity should be required ",
        "number.min": "Quantity should be at least 1",
    })
})
export default SchemaProduct
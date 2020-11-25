import 'text-encoding-polyfill'
import Joi from '@hapi/joi';

export const registerValidation = data => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .min(2)
      .max(255),
    lastName: Joi.string()
      .required()
      .min(2)
      .max(255),
    email: Joi.string()
      .required()
      .email({ tlds: {allow: false} })
      .max(255),
    role: Joi.string()
      .valid('client', 'business_owner'),
    mobile: Joi.string()
      .required()
      .max(50),
    password: Joi.string()
      .required()
      .max(1024)
      .min(6),
    confirmPassword: Joi.string()
      .required()
      .max(1024)
      .min(6)
  });

  return schema.validate(data);
};

export const registerBusinessDetailsValidation = data => {
    const schema = Joi.object({
        businessName: Joi.string(),
        category: Joi.string(),
        details: Joi.string()
    });
  
    return schema.validate(data);
};

export const registerBusinessDetailsValidation2 = data => {
    const schema = Joi.object({
        businessAddress: Joi.string(),
        country: Joi.string(),
        images: Joi.array(),
        municipality: Joi.string(),
        zipCode: Joi.string(),
        contactAddress: Joi.string(),
        contactNumber: Joi.string(),
        latitude: Joi.number(),
        longitude: Joi.number()
    });
    
    return schema.validate(data);
}
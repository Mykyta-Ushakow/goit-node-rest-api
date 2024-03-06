import Joi from "joi";

const requiredMissingMsg =
	"Make sure you add their name, email and phone number.";

export const createContactSchema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(50)
		.trim()
		.label("The contact's name")
		.required()
		.messages({ "any.required": requiredMissingMsg }),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.trim()
		.label("The contact's email")
		.required()
		.messages({
			"any.required": requiredMissingMsg,
			"string.email": "Please provide a valid email address",
		}),
	phone: Joi.string()
		.label("The contact's phone number")
		.required()
		.messages({ "any.required": requiredMissingMsg }),
	favorite: Joi.boolean().label("The contact's favorite status"),
});

export const updateContactSchema = Joi.object({
	name: Joi.string().min(3).max(30).trim().label("The contact's name"),
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.trim()
		.label("The contact's email"),
	phone: Joi.string().label("The contact's phone number"),
	favorite: Joi.boolean().label("The contact's favorite status"),
})
	.or("name", "email", "phone", "favorite")
	.messages({ "object.missing": "Body must have at least one field" });

export const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean()
		.label("The contact's favorite status")
		.required()
		.messages({
			"any.required":
				"Please add the contacts favorite status as a boolean value",
			"boolean.base": "The contact's favorite status must be a boolean value",
		}),
})
	.unknown(false)
	.messages({
		"object.missing":
			"Body must have the updated favorite status as a JSON with the 'favorite' property",
		"object.unknown": "Body cannot have any properties other than 'favorite'",
	});

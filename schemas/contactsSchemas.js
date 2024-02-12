import Joi from "joi";

const requiredMissingMsg =
	"Make sure you add their name, email and phone number";

export const createContactSchema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(30)
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
		}),
	phone: Joi.string()
		.label("The contact's phone number")
		.required()
		.messages({ "any.required": requiredMissingMsg }),
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
})
	.or("name", "email", "phone")
	.messages({ "object.missing": "Body must have at least one field" });

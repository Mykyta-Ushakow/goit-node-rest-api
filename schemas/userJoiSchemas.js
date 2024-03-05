import Joi from "joi";

const requiredMissingMsg = "Make sure to add your email and password.";

export const registerUserSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.trim()
		.label("Your email")
		.required()
		.messages({
			"any.required": requiredMissingMsg,
			"string.email": "Please provide a valid email address",
		}),
	password: Joi.string()
		.alphanum()
		.label("Your password")
		.min(3)
		.max(30)
		.required()
		.messages({
			"any.required": requiredMissingMsg,
			"string.alphanum":
				"Please only use numbers and letters for the password.",
		}),
	subscription: Joi.string()
		.alphanum()
		.label("Your subscription plan")
		.valid("starter", "pro", "business")
		.default("starter")
		.messages({
			"any.only":
				"We only have 'starter', 'pro' and 'business' as the subscription options",
			"string.alphanum":
				"Please only use numbers and letters for the subscription.",
		}),
})
	.unknown(false)
	.keys({
		email: Joi.required(),
		password: Joi.required(),
		subscription: Joi.optional(),
	})
	.messages({
		"object.missing":
			"Body must have the subscription plan, your email and your password as properties of a JSON.",
		"object.unknown":
			"Body cannot have any properties other than subscription, email and password",
	});

// export const updateContactSchema = Joi.object({
// 	name: Joi.string().min(3).max(30).trim().label("The contact's name"),
// 	email: Joi.string()
// 		.email({
// 			minDomainSegments: 2,
// 			tlds: { allow: ["com", "net"] },
// 		})
// 		.trim()
// 		.label("The contact's email"),
// 	phone: Joi.string().label("The contact's phone number"),
// 	favorite: Joi.boolean().label("The contact's favorite status"),
// })
// 	.or("name", "email", "phone", "favorite")
// 	.messages({ "object.missing": "Body must have at least one field" });

// export const updateFavoriteSchema = Joi.object({
// 	favorite: Joi.boolean()
// 		.label("The contact's favorite status")
// 		.required()
// 		.messages({
// 			"any.required":
// 				"Please add the contacts favorite status as a boolean value",
// 			"boolean.base": "The contact's favorite status must be a boolean value",
// 		}),
// })
// 	.keys({
// 		favorite: Joi.required(),
// 	})
// 	.unknown(false)
// 	.messages({
// 		"object.missing":
// 			"Body must have the updated favorite status as a JSON with the 'favorite' property",
// 		"object.unknown": "Body cannot have any properties other than 'favorite'",
// 	});

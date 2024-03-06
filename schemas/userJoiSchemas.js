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
		.min(6)
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
	.messages({
		"object.missing":
			"Body must have your email and your password as properties of a JSON.",
		"object.unknown":
			"Body cannot have any properties other than subscription, email and password",
	});

export const logInSchema = Joi.object({
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
		.min(6)
		.max(30)
		.required()
		.messages({
			"any.required": requiredMissingMsg,
			"string.alphanum":
				"Please only use numbers and letters for the password.",
		}),
})
	.unknown(false)
	.messages({
		"object.missing":
			"Body must have your email and your password as properties of a JSON.",
		"object.unknown":
			"Body cannot have any properties other than email and password",
	});

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

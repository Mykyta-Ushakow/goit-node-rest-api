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

export const updateSubscriptionSchema = Joi.object({
	subscription: Joi.string()
		.alphanum()
		.label("Your subscription plan")
		.valid("starter", "pro", "business")
		.required()
		.messages({
			"any.only":
				"We only have 'starter', 'pro' and 'business' as the subscription options",
			"string.alphanum":
				"Please only use letters for the subscription plan name.",
		}),
})
	.unknown(false)
	.messages({
		"object.missing":
			"Body must have the updated subscription plan as a JSON with the 'subscription' property",
		"object.unknown":
			"Body cannot have any properties other than 'subscription'",
	});

export const resendEmailSchema = Joi.object({
	email: Joi.string()
		.email({
			minDomainSegments: 2,
			tlds: { allow: ["com", "net"] },
		})
		.trim()
		.label("Your email")
		.required()
		.messages({
			"any.required": "Missing required field email",
			"string.email": "Please provide a valid email address",
		}),
})
	.unknown(false)
	.messages({
		"object.missing": "Missing required field email",
		"object.unknown": "Body cannot have any properties other than email",
	});

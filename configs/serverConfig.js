const serverConfig = {
	mongoUrl: process.env.MONGO_URL ?? "mongodb://localhost:27017",
	port: process.env.PORT ?? 4000,
	jwtSecret: process.env.JWT_SECRET ?? "super-secret",
	jwtExpiresIn: process.env.JWT_EXPIRES ?? "1h",
	metaPass: process.env.META_PASS,
	metaEmail: process.env.META_EMAIL,
};

export default serverConfig;

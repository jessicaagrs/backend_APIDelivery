import Fastify from "fastify";
import { routes } from "./app";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const app = Fastify({ logger: false });

const start = async () => {
	await app.register(swagger, {
		openapi: {
			info: {
				title: "API Delivery",
				description: "API developed by JessAg",
				version: "0.0.1",
			},
			externalDocs: {
				url: "https://github.com/jessicaagrs/backend_APIDelivery",
				description: "Find more info here",
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						description: "Input your token here",
						bearerFormat: "JWT",
					},
				},
			},
		},
	});
	await app.register(swaggerUI, {
		routePrefix: "/docs",
	});
	await app.register(cors);
	await app.register(routes, { prefix: "/v1" });

	try {
		await app.listen({ port: 3333 });
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

start();

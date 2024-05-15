import Fastify from "fastify";
import { routes } from "./app";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const app = Fastify({ logger: true });

const start = async () => {
	await app.register(swagger);
	await app.register(swaggerUI, {
		routePrefix: "/",
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

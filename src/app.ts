import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { userRoutes } from "./routes/users/usersRoutes";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.register(userRoutes);
}

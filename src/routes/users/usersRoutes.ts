import { FastifyInstance, FastifyPluginOptions } from "fastify";
import UsersController from "../../api/controllers/users/usersController";

const CONTROLLER = new UsersController();

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get("/users", CONTROLLER.getAllUsers);

	fastify.get("/users/:email", CONTROLLER.getUser);

	fastify.post("/users", CONTROLLER.createUser);

	fastify.put("/users/:id", CONTROLLER.updateUser);

	fastify.delete("/users/:id", CONTROLLER.deleteUser);
}

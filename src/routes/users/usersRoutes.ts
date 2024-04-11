import { FastifyInstance, FastifyPluginOptions } from "fastify";
import UsersController from "../../api/controllers/users/usersController";

const controller = new UsersController();

export async function userRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get("/users", controller.getAllUsers);

	fastify.get("/users/:email", controller.getUserByEmail);

	fastify.post("/users", controller.createUser);

	fastify.put("/users/:id", controller.updateUser);

	fastify.delete("/users/:id", controller.deleteUser);
}

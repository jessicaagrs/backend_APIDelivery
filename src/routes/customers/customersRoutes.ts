import { FastifyInstance, FastifyPluginOptions } from "fastify";
import CustomersController from "../../api/controllers/customers/customersController";

const controller = new CustomersController();

export async function customersRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
	fastify.get("/customers", controller.getAllCustomers);

	fastify.get("/customers/:email", controller.getCustomerByEmail);

	fastify.post("/customers", controller.createCustomer);

	fastify.put("/customers/:id", controller.updateCustomer);

	fastify.delete("/customers/:id", controller.deleteCustomer);
}

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ApiError } from "../../../error/apiError";
import { validateTypeLogin } from "../../../utils/formatter";
import AuthService from "../../services/auth/authService";

const service = new AuthService();

const paramsSchema = z.object({
	password: z
		.string({
			required_error: "A senha é obrigatória",
			invalid_type_error: "A senha do cliente deve ser uma string",
		})
		.min(8, {
			message: "A senha deve ter no mínimo 8 caracteres",
		}),
	email: z
		.string({
			required_error: "O email do cliente é obrigatório",
			invalid_type_error: "A senha do cliente deve ser uma string",
		})
		.email({
			message: "O email do cliente deve ser em um formato de email válido",
		}),
	typeLogin: z
		.string({
			required_error: "O tipo de login é obrigatório",
			invalid_type_error: "A senha do cliente deve ser uma string",
		})
		.refine((value) => validateTypeLogin(value), {
			message: "Indique C para login do cliente ou S para login do lojista.",
		}),
});

type ParamsType = z.infer<typeof paramsSchema>;

class AuthController {
	async Login(request: FastifyRequest<{ Params: Partial<ParamsType> }>, reply: FastifyReply) {
		try {
			const { email, password, typeLogin } = paramsSchema.partial().parse(request.body);
			const response = await service.Login(email, password, typeLogin);
			
			console.log(response)
			return reply.send(response);
		} catch (error: any) {
			const statusCode = reply.statusCode || 500;
			const err = new ApiError(statusCode, error.message);
			reply.status(err.statusCode).send(err);
		}
	}
}

export default AuthController;

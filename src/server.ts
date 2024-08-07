import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { routes } from "./app";
import "./types/fastify/fastify";

const app = Fastify({ logger: true });

const start = async () => {
    await app.register(jwt, {
        secret: process.env.SECRET_JWT as string,
    });

    app.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            await request.jwtVerify();
        } catch (error) {
            reply.status(401).send({
                statusCode: 401,
                error: "Unauthorized",
                message: "Não autorizado, login não efetuado ou token expirado",
            });
        }
    });

    await app.register(swagger, {
        openapi: {
            info: {
                title: "API Delivery",
                description: "API developed by JessAg",
                version: "0.0.1",
            },
            security: [{ bearerAuth: [] }],
            externalDocs: {
                url: "https://github.com/jessicaagrs/backend_APIDelivery",
                description: "Find more info here",
            },
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: "apiKey",
                        name: "Authorization",
                        in: "header",
                        description: "Bearer token",
                    },
                },
            },
        },
    });

    await app.register(swaggerUI, {
        routePrefix: "/",
    });

    await app.register(cors);
    await app.register(routes, { prefix: "/v1" });

    try {
        await app.listen({ port: Number(process.env.PORT as string) });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();

const fastify = require("fastify")({ logger: true });
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");
const connectDB = require("./config/db");
const Person = require("./models/personSchema");
const port = 4000;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

connectDB();
fastify.register(swagger, {
  swagger: {
    info: {
      title: "Person API",
    },
  },
});
fastify.register(swaggerUI, {
  routePrefix: "/docs",
});
fastify.register(require("./routes/personRoute"), { prefix: "/api" });

const start = async () => {
  try {
    fastify.listen({ port, host });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

const Person = require("../models/personSchema");
const Joi = require("joi");
const mongoose = require("mongoose");
const personValidate = require("../validator/personValidate");

const data = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};
const error_msg = {
  type: "object",
  properties: {
    status: { type: "string", default: "error" },
    message: { type: "string" },
  },
};

const createUserOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name"],
    },
    response: {
      201: {
        type: "object",
        properties: {
          status: { type: "string" },
          message: { type: "string" },
          data,
        },
      },
      400: error_msg,
    },
  },
};

const userOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          status: { type: "string" },
          message: { type: "string" },
          data,
        },
      },
      400: error_msg,
      404: error_msg,
    },
  },
};

const personRoutes = (fastify, options, done) => {
  fastify.post("/", createUserOpts, async (req, reply) => {
    try {
      const { name } = req.body;
      const { error, value } = personValidate.validate({ name });
      if (error) {
        reply.code(400);
        throw new Error("name field should be a string.");
      } else {
        const user = await new Person({
          name,
        }).save();
        console.log(user._id);
        reply.code(201).send({
          status: "success",
          message: "New person created.",
          data: {
            id: user._id,
            name: user.name,
          },
        });
      }
    } catch (error) {
      reply.send({
        status: "error",
        message: error.message,
      });
    }
  });

  fastify.get("/:user_id", userOpts, async (req, reply) => {
    try {
      const { user_id } = req.params;
      if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        reply.code(400);
        throw new Error("A valid user_id is required as request parameter.");
      } else {
        const user = await Person.findById(user_id);
        if (!user) {
          reply.code(404);
          throw new Error("Person not found.");
        } else {
          reply.code(200).send({
            status: "success",
            message: "Person found.",
            data: {
              id: user._id,
              name: user.name,
            },
          });
        }
      }
    } catch (error) {
      reply.send({
        status: "error",
        message: error.message,
      });
    }
  });
  fastify.put("/:user_id", userOpts, async (req, reply) => {
    try {
      const { user_id } = req.params;
      const { name } = req.body;
      if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        reply.code(400);
        throw new Error("A valid user_id is required as request parameter.");
      } else {
        const user = await Person.findById(user_id);
        if (!user) {
          reply.code(404);
          throw new Error("Person not found.");
        } else {
          const update = {
            name: name || user.name,
          };

          const updatedUser = await Person.findByIdAndUpdate(
            user_id,
            { $set: update },
            {
              new: true,
            }
          );
          reply.code(200).send({
            status: "success",
            message: `Person with Id: ${updatedUser._id} has been updated.`,
            data: {
              id: updatedUser._id,
              name: updatedUser.name,
            },
          });
        }
      }
    } catch (error) {
      reply.send({
        status: "error",
        message: error.message,
      });
    }
  });

  fastify.delete("/:user_id", userOpts, async (req, reply) => {
    try {
      const { user_id } = req.params;
      if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        reply.code(400);
        throw new Error("A valid user_id is required as request parameter.");
      } else {
        const user = await Person.findByIdAndDelete(user_id);
        if (!user) {
          reply.code(404);
          throw new Error(" User not found or has been deleted already.");
        } else {
          reply.code(200).send({
            status: "success",
            message: `Person with Id: ${user._id} has been deleted`,
          });
        }
      }
    } catch (error) {
      reply.send({
        status: "error",
        message: error.message,
      });
    }
  });
  done();
};

module.exports = personRoutes;

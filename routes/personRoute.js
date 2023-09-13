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
          msg: { type: "string" },
          data,
        },
      },
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
        throw new Error("Name field should be a string.");
      } else {
        const user = await new Person({
          name,
        }).save();
        console.log(user._id);
        reply.code(201).send({
          status: "success",
          msg: "New person created.",
          data: {
            id: user._id,
            name: user.name,
          },
        });
      }
    } catch (error) {
      reply.send({
        status: "error",
        msg: error.message,
      });
    }
  });

  fastify.get("/:user_id", async (req, reply) => {
    try {
      const { user_id } = req.params;
      if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
        reply.code(400);
        throw new Error("A valid user_id is required as request parameter.");
      } else {
        const user = await Person.findById(user_id);
        if (!user) {
          reply.code(404);
          throw new Error("User not found.");
        } else {
          reply.code(200).send({
            status: "success",
            msg: "User found.",
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
        msg: error.message,
      });
    }
  });
  fastify.put("/:user_id", async (req, reply) => {
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
            msg: "Person updated",
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
        msg: error.message,
      });
    }
  });

  fastify.delete("/:user_id", async (req, reply) => {
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
            msg: `Person with Id: ${user._id} has been deleted`,
          });
        }
      }
    } catch (error) {
      reply.send({
        status: "error",
        msg: error.message,
      });
    }
  });
  done();
};

module.exports = personRoutes;

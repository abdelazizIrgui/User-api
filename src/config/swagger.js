import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "User API",
      version: "1.0.0",
      description: "REST API for user management and authentication",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "65f123456789abcdef123456",
            },
            name: {
              type: "string",
              example: "Ahmed",
            },
            age: {
              type: "number",
              example: 25,
            },
            email: {
              type: "string",
              example: "ahmed@gmail.com",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              example: "user",
            },
          },
        },

        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              example: "ahmed@gmail.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },

        Register: {
          type: "object",
          required: ["name", "age", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Ahmed",
            },
            age: {
              type: "number",
              example: 25,
            },
            email: {
              type: "string",
              example: "ahmed@gmail.com",
            },
            password: {
              type: "string",
              example: "123456",
            },
          },
        },

        ChangePassword: {
          type: "object",
          required: ["currentPassword", "newPassword"],
          properties: {
            currentPassword: {
              type: "string",
              example: "123456",
            },
            newPassword: {
              type: "string",
              example: "654321",
            },
          },
        },

        ForgotPassword: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              type: "string",
              example: "ahmed@gmail.com",
            },
          },
        },

        ResetPassword: {
          type: "object",
          required: ["newPassword"],
          properties: {
            newPassword: {
              type: "string",
              example: "654321",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "User API",
      version: "1.0.0",
      description:
        "REST API for user management, authentication and authorization",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local server",
      },
    ],

    tags: [
      {
        name: "Auth",
        description: "Authentication endpoints",
      },
      {
        name: "Users",
        description: "User management endpoints",
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
            _id: {
              type: "string",
              example: "66f123abc456def789",
            },
            name: {
              type: "string",
              example: "Ahmed",
            },
            age: {
              type: "integer",
              example: 25,
            },
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
            role: {
              type: "string",
              enum: ["user", "admin"],
              example: "user",
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
              type: "integer",
              example: 25,
            },
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123",
            },
          },
        },

        Login: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123",
            },
          },
        },

        ChangePassword: {
          type: "object",
          required: ["currentPassword", "newPassword"],
          properties: {
            currentPassword: {
              type: "string",
              format: "password",
              example: "OldPassword123",
            },
            newPassword: {
              type: "string",
              format: "password",
              example: "NewPassword123",
            },
          },
        },

        ForgotPassword: {
          type: "object",
          required: ["email"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "ahmed@gmail.com",
            },
          },
        },

        ResetPassword: {
          type: "object",
          required: ["password"],
          properties: {
            password: {
              type: "string",
              format: "password",
              example: "NewPassword123",
            },
          },
        },

        Error: {
          type: "object",
          properties: {
            status: {
              type: "string",
              example: "fail",
            },
            message: {
              type: "string",
              example: "Something went wrong",
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
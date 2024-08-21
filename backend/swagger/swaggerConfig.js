const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { PORT, API_VERSION } = process.env;
const UserSchema = require('./schemas/User');
const AdminSchema = require('./schemas/Admin');

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "Loyalty API Documentation",
      version: "1.0.0",
      description: "API documentation for Loyalty application",
    },
    servers: [
      {
        url: `https://loyalty-app-pnwx.onrender.com`,
      },
      {
        url: `http://localhost:${PORT}/api/${API_VERSION}`,
      },
    ],
    components: {
      schemas: {
        ...UserSchema,
        ...AdminSchema,
        // Add other schemas here
      },
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  };

const options = {
    swaggerDefinition,
    apis: ["./src/swagger/paths/*.js"],
};

const swaggerOptions = {
    swaggerOptions: {
        docExpansion: "none",
        filter: true,
        tagsSorter: "alpha",
        operationsSorter: "alpha",
    },
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec, swaggerOptions };

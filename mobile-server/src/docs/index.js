import { Router } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const router = Router();

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Mobile API',
      version: '1.0.0',
      description: 'API for QuocHa mobile-app'
    },
    servers: [
      {
        description: 'localhost',
        url: 'http://localhost:3000'
      }
    ],
    components: {
      securitySchemes: {
        httpBearer: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  },
  apis: ['./src/docs/main/*.js']
};

const specs = swaggerJsDoc(options);

router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export { router as docsRouter };

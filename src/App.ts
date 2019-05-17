import * as express from 'express'
import {ImageReader} from './ImageReader'

class App {

    public express;

    constructor() {
        this.express = express();
        this.addRoutes();
    }

    private addRoutes(): void {
        const router = express.Router();

        router.get('/images/*.jpg', async function (request, response) {

            try {
                let imageName = request.params[0];
                let imageReader = new ImageReader(imageName);
                let height = request.query.height;
                let width = request.query.width;
                let ignoreAspectRatio:boolean = false;

                if (undefined !== request.query.doNotPreserveAspectRatio) {
                    ignoreAspectRatio = true
                }

                if (height) {
                    height = parseInt(height);
                }

                if (width) {
                    width = parseInt(width);
                }

                imageReader
                    .resize(width, height, ignoreAspectRatio)
                    .then(
                        function (result: Blob) {
                            response.writeHead(200, {'Content-type': 'image/jpg'});
                            response.write(result);
                            response.end();
                        },
                        function (error) {
                            response.writeHead(500, "Something went wrong!", {'Content-type': 'application/json'});
                            response.end();
                        }
                    );
            } catch (e) {
                response.writeHead(404);
                response.send();
            }
        });

        router.get('/check', async function (request, response)  {
            response.writeHead(200);
            response.end();
        });

        let swaggerStats = require('swagger-stats'),
            swaggerConfig = require('../swagger.json');

        this.express.use(swaggerStats.getMiddleware({swaggerSpec:swaggerConfig}));
        this.express.use('/', router);
    }
}

export default new App().express;
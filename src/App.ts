import * as express from 'express'

class App {
    public express;


    constructor() {
        this.express = express();
        this.addRoutes();
    }

    private addRoutes(): void {
        const router = express.Router();

        router.get('/*.jpg', (request, response) => {
            console.log(request);

            response.end();
        });

        this.express.use('/', router);
    }
}

export default new App().express;
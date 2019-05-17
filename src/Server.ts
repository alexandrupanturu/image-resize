import app from './App'

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.HTTP_PORT;

app.listen(port, (error) => {
    if (error) {
        return console.log(error);
    }
    return console.log(`Server started and listening on port ${port}`);
});
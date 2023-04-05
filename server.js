import routes from './routes';

const express = require('express');

const port = process.env.PORT || 5000;
const app = express();

routes(app);

app.listen(port, () => {
  console.log('Listening to port 5000: Success');
});

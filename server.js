import express from 'express';
import cors from 'cors'
//const cors = require('cors')

const app = express();

app.use(cors());

app.use('/Login', (req, res) => {

  res.send({

    token: 'test123'

  });

});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'))
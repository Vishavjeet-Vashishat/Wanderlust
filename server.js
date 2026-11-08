import 'dotenv/config'; // importing dotenv so that node can know variables in config.env file
import mongoose from 'mongoose';
import {app } from './app.js';

const DB = process.env.DATABASE 



const startServer = async () => {
try {

    await mongoose.connect(DB);

    console.log('DB connection successful!');

    const port = process.env.PORT || 3000;

      app.listen(port, () => {

      console.log(`App running on port ${port}`);

    });

  } catch (err) {

    console.log('DB connection failed!');

    console.log(err);

  }

};

startServer()


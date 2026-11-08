import fs from 'fs';

import mongoose from 'mongoose';
import 'dotenv/config'; // importing dotenv so that node can know variables in config.env file
import { Tour } from '../../models/tourModel.js';
import { User } from '../../models/userModel.js';
import { Review } from '../../models/reviewModel.js';

import path from 'node:path';

import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const DB = process.env.DATABASE;

// IMPORTING THE JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log(' Data successfully loaded !');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log(' Data successfully deleted !');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

mongoose
  .connect(DB)

  .then(() => {
    console.log('DB connection successful!');

    if (process.argv[2] === '--import') {
      importData();
    }

    if (process.argv[2] === '--delete') {
      // 2 is used because process.agrv gives us an array and it starts with 0 and we define the third
      // option either as import or delete , eg node dev-data.js --import or dev-data.js -- delete
      deleteData();
    }
  })

  .catch((err) => {
    console.log('DB connection failed!');

    console.log(err);
  });

console.log(process.argv);
// process.argv lets us read command-line arguments passed when running this file.

// We use it to choose the operation: "--import" imports tour data,

// while "--delete" deletes the tour data from the database.

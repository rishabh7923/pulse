import "reflect-metadata";
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';
import createRouter from 'express-file-routing';
import AppDataSource from "./database/connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { validatePostId } from "./middlewares/validation/validatePostId.js";
import { validateCommentId } from "./middlewares/validation/validateCommentId.js";

const app = express();
app.use(cors());
app.use(express.json());

/* Auto-register routes from the routes directory */
await createRouter(app, {
  directory: path.join(import.meta.dirname, 'routes')
});

/* Validate parameters */
app.param('postId', validatePostId);
app.param('commentId', validateCommentId);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => console.log('Connected to the database'))

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port ' + (process.env.PORT || 3000));
});

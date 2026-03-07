import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import path from 'path';
import createRouter from 'express-file-routing';

const app = express();
app.use(cors());
app.use(express.json());

/* Auto-register routes from the routes directory */
await createRouter(app, {
  directory: path.join(import.meta.dirname, 'routes')
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running on port ' + (process.env.PORT || 3000));
});

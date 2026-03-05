import 'dotenv/config';

import express from 'express';
import knexClient from 'knex';
import jwt from 'jsonwebtoken';

import { EMAIL_EXIST, INVALID_CREDENTIALS, INVALID_PARAMETERS, USERNAME_EXISTS } from './errors.js';

const app = express();
app.use(express.json());

const knex = knexClient({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'pulse',
    database: 'pulse',
  },
});

(async () => {
  app.post('/signup', async (req: express.Request, res: express.Response) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        error: INVALID_PARAMETERS
      });
    }

    /* Check if the email is unique */
    if (
      await knex('users').where({ email }).first()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          error: EMAIL_EXIST
        })
    }

    /* Check if the username is unique */
    if (
      await knex('users').where({ username }).first()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          error: USERNAME_EXISTS
        });
    }


    await knex('users').insert({ username, password, email, verified: false });
    res.status(201).json({ success: true, message: 'User signed up successfully' });
  });

  app.post('/login', async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: INVALID_PARAMETERS
      })
    }

    const user = await knex('users')
      .select('email', 'username')
      .where({ username, password })
      .first();

    if (!user) {
      return res.status(400).json({
        success: false,
        error: INVALID_CREDENTIALS
      })
    }

    const token = jwt.sign(user, process.env.JWT_SECRET_KEY!, { expiresIn: '1h' });
    return res.status(200).json({ success: true, token })
  })

  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello, World!');
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + (process.env.PORT || 3000));
  });
})();

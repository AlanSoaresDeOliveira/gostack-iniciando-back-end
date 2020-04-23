import { Router } from 'express';
import AuthenticationUserServer from '../services/AuthenticationUserSever';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticationUser = new AuthenticationUserServer();

  const { user, token } = await authenticationUser.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;

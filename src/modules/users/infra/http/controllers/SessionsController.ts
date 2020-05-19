import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticationUserServer from '@modules/users/services/AuthenticationUserSever';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticationUser = container.resolve(AuthenticationUserServer);

    const { user, token } = await authenticationUser.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}

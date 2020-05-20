import AppError from '@shared/errors/AppError';

import FakUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticationUserSever from './AuthenticationUserSever';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to Authenticate', async () => {
    const fakUsersRepository = new FakUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakUsersRepository,
      fakeHashProvider,
    );
    const authenticationUser = new AuthenticationUserSever(
      fakUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticationUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to Authenticate with non existing user', async () => {
    const fakUsersRepository = new FakUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticationUser = new AuthenticationUserSever(
      fakUsersRepository,
      fakeHashProvider,
    );

    expect(
      authenticationUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to Authenticate with worng password', async () => {
    const fakUsersRepository = new FakUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakUsersRepository,
      fakeHashProvider,
    );
    const authenticationUser = new AuthenticationUserSever(
      fakUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticationUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

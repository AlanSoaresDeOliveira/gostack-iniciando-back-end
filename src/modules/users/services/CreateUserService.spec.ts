import AppError from '@shared/errors/AppError';
import FakUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakUsersRepository = new FakUsersRepository();
    const createUser = new CreateUserService(fakUsersRepository);

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('should be able to create a new user with same email from another', async () => {
    const fakUsersRepository = new FakUsersRepository();
    const createUser = new CreateUserService(fakUsersRepository);

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

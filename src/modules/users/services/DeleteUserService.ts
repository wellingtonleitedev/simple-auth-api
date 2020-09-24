import AppError from '@common/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const user = await this.usersRepository.getById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    await this.usersRepository.delete(user);
  }
}

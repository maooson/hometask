import { AuthUser } from '../../src/user/auth-user';

export const mockUser = (fields?: Partial<AuthUser>): AuthUser => ({
  id: 1,
  username: 'test',
  passwordHash: 'P@ssw0rd!',
  updatedAt: new Date(),
  createdAt: new Date(),
  ...fields,
});

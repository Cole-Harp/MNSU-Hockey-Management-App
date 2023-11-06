import { createUser, getAllUsers, getUser } from '../db_actions/Auth'
import { prismaMock } from '../../../singleton'
import { UserRole } from '@prisma/client'

test('should get all users', async () => {
  const users = [
    {
      id: '1',
      name: 'Rich',
      email: 'hello@prisma.io',
      role: UserRole.Player,
    },
    {
      id: '2',
      name: 'John',
      email: 'john@prisma.io',
      role: UserRole.Admin,
    },
  ];

  prismaMock.user.findMany.mockResolvedValue(users);

  const result = await getAllUsers();

  expect(result).toEqual(users);
});


test('should return an existing user object', async () => {
  const userId = '1';
  const user = {
    id: userId,
    name: 'John',
    email: 'john@example.com',
    role: UserRole.Player,
  };

  prismaMock.user.findFirst.mockResolvedValue(user);

  const result = await getUser();

  expect(result).toEqual(user);
});
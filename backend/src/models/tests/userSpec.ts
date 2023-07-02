import { pgClient } from '../../database';
import User, { UserType } from '../user';
import Auth, { PasswordType } from '../auth';

const auth = new Auth();
const user = new User();

describe('User Model', () => {
  describe('Test methods exists', () => {
    it('expects all CRUD operation methods to be exists', () => {
      expect(user.createUser).toBeDefined();
      expect(user.getUser).toBeDefined();
      expect(user.updateUser).toBeDefined();
      expect(user.deleteUser).toBeDefined();
    });
  });
  describe('Methods returns', () => {
    const newUser1 = {
      first_name: 'Adham',
      last_name: 'Haddad',
      email: 'adhamhaddad.dev@gmail.com',
      password: 'adham123'
    } as UserType;

    const updateUser1 = {
      first_name: 'Adham',
      last_name: 'Ashraf',
      email: 'adhamhaddad.dev@gmail.com'
    } as UserType;

    beforeAll(async () => {
      const connection = await pgClient.connect();
      try {
        const query = {
          text: 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1'
        };
        await connection.query(query);
      } finally {
        connection.release();
      }
    });

    it('createUser method should return a new user', async () => {
      const result = await user.createUser(newUser1);
      expect(result).toEqual({
        id: 1,
        first_name: 'Adham',
        last_name: 'Haddad',
        email: 'adhamhaddad.dev@gmail.com'
      } as UserType);
    });

    it('getUser method should return Object of user', async () => {
      const result = await user.getUser('1');
      expect(result).toEqual({
        id: 1,
        first_name: 'Adham',
        last_name: 'Haddad',
        email: 'adhamhaddad.dev@gmail.com'
      } as UserType);
    });

    it('updateUser method should return object with new values', async () => {
      const result = await user.updateUser('1', updateUser1);
      expect(result).toEqual({
        id: 1,
        first_name: 'Adham',
        last_name: 'Ashraf',
        email: 'adhamhaddad.dev@gmail.com'
      } as UserType);
    });
  });
});
describe('Auth Model', () => {
  describe('Test methods exists', () => {
    it('expects updatePassword method to be exists', () => {
      expect(auth.updatePassword).toBeDefined();
    });
    it('expects authMe method to be exists', () => {
      expect(auth.authMe).toBeDefined();
    });
    it('expects authUser method to be exists', () => {
      expect(auth.authUser).toBeDefined();
    });
  });
  describe('Methods returns', () => {
    const authenticate = {
      email: 'adhamhaddad.dev@gmail.com',
      password: 'adham123'
    } as UserType;

    const updatePassword = {
      id: 1,
      old_password: 'adham123',
      new_password: 'adham12345'
    } as PasswordType;

    afterAll(async () => {
      const connection = await pgClient.connect();
      try {
        const query = {
          text: 'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1'
        };
        await connection.query(query);
      } finally {
        connection.release();
      }
    });

    it('authUser method should return a object user', async () => {
      const result = await auth.authUser(authenticate);
      expect(result).toEqual({
        id: 1,
        first_name: 'Adham',
        last_name: 'Ashraf',
        email: 'adhamhaddad.dev@gmail.com'
      } as UserType);
    });

    it('updatePassword method should return object with user id', async () => {
      const result = await auth.updatePassword('1', updatePassword);
      expect(result).toEqual({ id: 1 } as UserType);
    });
    it('deleteUser method should return object with deleted user id', async () => {
      const result = await user.deleteUser('1');
      expect(result).toEqual({
        id: 1
      } as UserType);
    });
  });
});

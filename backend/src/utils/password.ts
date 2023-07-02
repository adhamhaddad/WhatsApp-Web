import bcrypt from 'bcrypt';
import configs from '../configs';

export const hash = async (password: string) =>
  await bcrypt.hash(
    `${configs.pepper}${password}${configs.pepper}`,
    configs.salt
  );

export const compare = async (password: string, hash: string) =>
  await bcrypt.compare(`${configs.pepper}${password}${configs.pepper}`, hash);

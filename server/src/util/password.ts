import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scryptAsync = promisify(scrypt);

export class PasswordUtils {
  private static readonly KEY_LEN = 64;

  static async hash(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const derivedKey = (await scryptAsync(
      password,
      salt,
      this.KEY_LEN
    )) as Buffer;

    return `${salt}.${derivedKey.toString('hex')}`;
  }

  static async verify(
    password: string,
    storedHashPassword: string
  ): Promise<boolean> {
    if (!storedHashPassword) {
      return false;
    }

    const [salt, hash] = storedHashPassword.split('.');

    if (!salt || !hash) {
      return false;
    }

    const hashBuffer = Buffer.from(hash, 'hex');

    const derivedKey = (await scryptAsync(
      password,
      salt,
      this.KEY_LEN
    )) as Buffer;

    return timingSafeEqual(hashBuffer, derivedKey);
  }
}

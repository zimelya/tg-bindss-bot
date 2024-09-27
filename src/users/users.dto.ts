

import { z } from 'zod';

export const UserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  chatId: z.string(),
  password: z.string(),
});

export type UserDto = z.infer<typeof UserSchema>;

export type CreateUserDto = z.infer<typeof UserSchema> & {
  chatId: string;
  phone: string;
  password: string;
};

export type GetUserDto = z.infer<typeof UserSchema> & {
  chatId: string;
  phone: string;
  email: string;
  name: string;
};


import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  chatId: z.string(),
  password: z.string(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema> & {
  chatId: string;
  phone: string;
  password: string;
};

export type UserDto = z.infer<typeof CreateUserSchema> & {
  phone: string;
  password: string;
}
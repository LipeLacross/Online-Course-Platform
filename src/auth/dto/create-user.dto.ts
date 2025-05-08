// File: src/auth/dto/create-user.dto.ts
export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'admin' | 'instructor' | 'student';
}

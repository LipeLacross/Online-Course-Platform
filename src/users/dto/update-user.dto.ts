// File: src/users/dto/update-user.dto.ts

export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: 'admin' | 'instructor' | 'student';
}

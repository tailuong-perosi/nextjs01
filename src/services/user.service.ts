// services/user.service.ts
import { IUser } from '@/types/user';
import { api } from '@/library/api';

export class UserService {
  // Lấy danh sách người dùng
  static async getAll(): Promise<IUser[]> {
    const response = await api.get<IUser[]>('/users');
    return response.data;
  }

  // Lấy chi tiết người dùng theo ID
  static async getById(id: string): Promise<IUser> {
    const response = await api.get<IUser>(`/users/${id}`);
    return response.data;
  }

  // Tạo người dùng mới
  static async create(data: Partial<IUser>): Promise<IUser> {
    const response = await api.post<IUser>('/users', data);
    return response.data;
  }

  // Cập nhật người dùng
  static async update(id: string, data: Partial<IUser>): Promise<IUser> {
    const response = await api.put<IUser>(`/users/${id}`, data);
    return response.data;
  }

  // Xóa người dùng
  static async delete(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  }
}

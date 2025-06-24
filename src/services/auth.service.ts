
import { api } from '@/library/api';
import { IAuthLogin } from '@/types/next-auth'


export class AuthService {
  static async loginHandle(username: string, password: string): Promise<IAuthLogin> {
    const response = await api.post<IAuthLogin>('/auth/login-handle', { username, password });
    return response.data;
  }
  static async registerHandle(username: string, password: string, phone: string, email: string): Promise<IAuthLogin> {
    const response = await api.post<IAuthLogin>('/auth/register', { username, password, phone, email });
    return response.data;
  }
}
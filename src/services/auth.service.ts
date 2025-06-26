
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

  static async sendMail(email: string): Promise<IAuthLogin> {
    const response = await api.put<IAuthLogin>('/auth/send-mail', {email});
    return response.data;
  }

  static async verifyMail(email: string, code: string): Promise<IAuthLogin> {
    const response = await api.put<IAuthLogin>('/auth/verify-email', {email, code});
    return response.data;
  }
}
import { AxiosError } from 'axios';

export function getAxiosErrorMessage(error: unknown): string {
  const axiosError = error as AxiosError<any>;
  const raw = axiosError?.response?.data?.message;

  if (Array.isArray(raw)) return raw.join(', ');
  if (typeof raw === 'string') return raw;
  return 'Đã xảy ra lỗi không xác định';
}

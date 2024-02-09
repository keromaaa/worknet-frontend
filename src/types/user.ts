import { Post } from './post';

export interface User {
  id: number;
  email: string;
  password: string;
  role?: string | null;
  isLoggedIn: boolean;
  about?: string | null;
  image?: File | string | null;
  phoneNumber?: string | null;
  korisnikLocationId: number;
  location?: Lokacija | null;
  firstName: string;
  lastName: string;
  workedAt?: string | null;
  university?: string | null;
  skills?: string[] | null;
  companyName: string;
  companyOwner?: string | null;
  posts?: Post[] | null;
  reviews?: Review[] | null;
}

export interface Review {
  id: number;
  reviewEmployeeId: number;
  employee: User;
  reviewCompanyId: number;
  company: User;
  rating: number;
  title: string;
  content: string;
}

export interface Lokacija {
  id: number;
  city: string;
}

export interface AuthLoginRequest {
  email: string;
  password: string;
}

interface RegisterFormObj {
  ime?: string;
  prezime?: string;
  imeKompanije?: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type AuthRegisterRequest = Omit<RegisterFormObj, 'confirmPassword'>;

export interface AuthResponse {
  success: boolean;
  access_token: string;
  message: string;
  data: User | null;
}

export type AuthLogoutResponse = Omit<AuthResponse, 'access_token' | 'data'>;

export type AuthGetResponse = Omit<AuthResponse, 'access_token'>;

export interface UserResponse {
  data: any;
}

export interface CreateReviewRequest {
  companyId: number;
  rating: number;
  title: string;
  content: string;
}

export type EditReviewRequest = Omit<CreateReviewRequest, 'companyId'>;

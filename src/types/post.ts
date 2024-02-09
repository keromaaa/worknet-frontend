import { User, Lokacija } from './user';

export interface Post {
  id: number;
  title: string;
  content: string;
  companyId: number;
  company: User;
  date: Date;
  postLocationId: number;
  location: Lokacija;
  postEmploymentTypeId: number;
  employmentType: EmploymentType;
  postIndustryId: number;
  industry: Industry;
  views: number;
}

export interface Skill {
  id: number;
  name: string;
  industryId: number;
  industry: Industry;
}

export interface Industry {
  id: number;
  name: string;
}

export interface EmploymentType {
  id: number;
  title: string;
}

export interface PostCreateRequest {
  title: string;
  content: string;
  date: string;
  location: Lokacija;
  industry: Industry;
  employmentType: EmploymentType;
}

export interface PostEditRequest {
  title: string;
  content: string;
  date: string;
  location: Lokacija;
}

export interface PostResponse {
  success: boolean;
  message?: string;
  data?: Post[];
}

export interface PostGetResponse {
  success: boolean;
  message?: string;
  data?: Post;
}

export interface IndustriesResponse {
  success: boolean;
  message?: string;
  data?: Industry[];
}

export interface LocationResponse {
  success: boolean;
  message?: string;
  data?: Lokacija[];
}

export interface EmploymentTypeResponse {
  success: boolean;
  message?: string;
  data?: EmploymentType[];
}

export interface PostSearchRequest {
  jobTitle: string | null;
  company: string | null;
  industry: string | null;
  location: string | null;
  employmentType: string | null;
  popular: boolean;
  perPage: number;
  page: number;
}

export interface PostSearchResponse {
  data: Post[];
  totalPages: number;
}

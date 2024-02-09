import { Injectable } from '@angular/core';
import {
  AuthGetResponse,
  AuthLoginRequest,
  AuthRegisterRequest,
  AuthResponse,
  CreateReviewRequest,
  EditReviewRequest,
  User,
} from '../../types/user';
import axios from 'axios';
import { MyConfig } from '../app.config';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean | null = null;
  private user: User | null = null;
  private token: string | null = '';
  public loader: boolean = false;
  private userName: string = '';

  constructor(private httpClient: HttpClient, private toastr: ToastrService) {
    this.token =
      localStorage.getItem('Token') ?? sessionStorage.getItem('Token');

    this.verifyToken();
  }

  verifyToken = async () => {
    this.loader = true;
    const { data } = await axios.get<AuthGetResponse>(
      MyConfig.server_address + '/Korisnik/Get',
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          value:
            localStorage.getItem('Token') ?? sessionStorage.getItem('Token'),
        },
      }
    );

    if (data.success) {
      this.isAuthenticated = true;
      this.user = data.data;
      this.userName =
        data.data?.companyName ??
        data.data?.firstName + ' ' + data.data?.lastName;
    } else {
      this.isAuthenticated = false;
    }
    this.loader = false;
  };

  isAuthenticatedUser = async () => {
    if (!this.isAuthenticated) {
      await this.verifyToken();
      if (this.token?.length) {
        return true;
      } else return false;
    }
    return true;
  };

  login = async (params: AuthLoginRequest, rememberMe: boolean) => {
    const { data } = await axios.post<AuthResponse>(
      MyConfig.server_address + '/Korisnik/Login',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    if (data.success) {
      rememberMe
        ? localStorage.setItem('Token', data.access_token)
        : sessionStorage.setItem('Token', data.access_token);

      this.isAuthenticated = true;

      this.token = data.access_token;

      this.user = data.data;

      return true;
    }
    this.isAuthenticated = false;
    return data.message;
  };

  register = async (params: AuthRegisterRequest) => {
    const { data } = await axios.post<AuthResponse>(
      MyConfig.server_address + '/Korisnik/Create',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );

    if (data.success) {
      sessionStorage.setItem('Token', data.access_token);
      this.isAuthenticated = true;
      return true;
    }
    this.isAuthenticated = false;
    return data.message;
  };

  logout = async () => {
    const { data } = await axios.post<AuthResponse>(
      MyConfig.server_address + '/Korisnik/Logout',
      null,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          value:
            localStorage.getItem('Token') ?? sessionStorage.getItem('Token'),
        },
      }
    );

    if (data.success) {
      this.isAuthenticated = false;
      this.user = null;
      return true;
    }
    this.isAuthenticated = true;
    return false;
  };

  edit = async (body: any) => {
    const { data } = await axios.put(
      MyConfig.server_address + '/Korisnik/Edit',
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          value:
            localStorage.getItem('Token') ?? sessionStorage.getItem('Token'),
        },
      }
    );

    if (data.success) {
      console.log(data.data);
    }
  };

  addSkill = async (skill: string) => {
    await axios.post(MyConfig.server_address + '/Skill/Create', [skill], {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        value: localStorage.getItem('Token') ?? sessionStorage.getItem('Token'),
      },
    });
  };

  deleteSkill = async (skill: string) => {
    await axios.delete(
      MyConfig.server_address + '/Skill/Delete?skill=' + skill,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          value:
            localStorage.getItem('Token') ?? sessionStorage.getItem('Token'),
        },
      }
    );
  };

  addReview = async (params: CreateReviewRequest) => {
    const { data } = await axios.post(
      MyConfig.server_address + '/Review/Create',
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          value: this.token,
        },
      }
    );

    if (data) {
      this.toastr.success('Review created successfuly.');
    } else {
      this.toastr.error('Something went wrong.');
    }
  };

  editReview = async (id: number, params: EditReviewRequest) => {
    const { data } = await axios.put(
      MyConfig.server_address + '/Review/Edit?id=' + id,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          value: this.token,
        },
      }
    );

    if (data) {
      this.toastr.success('Review edited successfuly.');
    } else {
      this.toastr.error('Something went wrong.');
    }
  };

  deleteReview = async (id: number) => {
    const { data } = await axios.delete(
      MyConfig.server_address + '/Review/Delete?id=' + id,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          value: this.token,
        },
      }
    );

    if (data) {
      this.toastr.success('Review deleted successfuly.');
    } else {
      this.toastr.error('Something went wrong.');
    }
  };

  isLoggedIn = () => {
    return this.isAuthenticated;
  };

  getUser = () => {
    return this.user;
  };

  getId = () => {
    return this.user?.id;
  };

  getName = () => {
    return this.userName;
  };

  getEmail = () => {
    return this.user?.email;
  };

  getPhoneNumber = () => {
    return this.user?.phoneNumber;
  };

  getCity = () => {
    return this.user?.location?.city;
  };

  getUniversity = () => {
    return this.user?.university;
  };

  getPreviousJobs = () => {
    return this.user?.workedAt;
  };

  getAbout = () => {
    return this.user?.about;
  };

  getProfileType = () => {
    return this.user?.role;
  };
}

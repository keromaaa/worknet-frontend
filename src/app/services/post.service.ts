import { Injectable } from '@angular/core';
import {
  PostCreateRequest,
  PostEditRequest,
  PostGetResponse,
  PostResponse,
  PostSearchRequest,
  PostSearchResponse,
} from '../../types/post';
import axios from 'axios';
import { MyConfig } from '../app.config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private token: string | null =
    localStorage.getItem('Token') ?? sessionStorage.getItem('Token');
  private dataSubject = new BehaviorSubject<any>(null);
  public data$ = this.dataSubject.asObservable();

  constructor(private router: Router, private toastr: ToastrService) {}

  create = async (params: PostCreateRequest) => {
    const { data } = await axios.post<PostResponse>(
      MyConfig.server_address + '/Post/Create',
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

    if (data.success) {
      this.router.navigateByUrl('/landingPage');
      this.toastr.success('Your post has been created successfully.');
      return true;
    } else {
      this.toastr.error('Something went wrong.');
      return data.message;
    }
  };

  get = async (id: string) => {
    const { data } = await axios.get<PostGetResponse>(
      MyConfig.server_address + `/Post/Get?id=${id}`
    );

    if (data) {
      return data.data;
    }
    return console.error(data);
  };

  getTopPosts = async () => {
    const { data } = await axios.get(
      MyConfig.server_address + `/Post/TopPosts`
    );

    if (data) {
      return data.posts;
    }
    return console.error(data);
  };

  edit = async (id: number, params: PostEditRequest) => {
    const { data } = await axios.put<PostResponse>(
      MyConfig.server_address + '/Post/Edit?id=' + id,
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

    console.log(data);

    if (data) {
      this.toastr.success('Your post has been edited successfully.');
    } else {
      this.toastr.error('Something went wrong.');
    }
  };

  delete = async (id: number) => {
    const { data } = await axios.delete<PostResponse>(
      MyConfig.server_address + `/Post/Delete?id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
          value: this.token,
        },
      }
    );

    if (data.success) {
      this.router.navigateByUrl('/landingPage');
      this.toastr.success(data.message);
    } else {
      this.toastr.error(data.message);
    }
  };

  addView = (id: number) => {
    axios.post(MyConfig.server_address + '/Post/TopPostCounter?id=' + id, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        value: this.token,
      },
    });
  };

  search = async (params: PostSearchRequest) => {
    const { data } = await axios.post<PostSearchResponse>(
      MyConfig.server_address + '/Post/Search',
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

    return data;
  };
}

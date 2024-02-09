import { Injectable } from '@angular/core';
import axios from 'axios';
import { MyConfig } from '../app.config';
import { User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  get = async (id: number) => {
    const { data } = await axios.get<User>(
      MyConfig.server_address + `/Korisnik/GetById?id=${id}`
    );

    if (data) {
      return data;
    }
    return console.error(data);
  };
}

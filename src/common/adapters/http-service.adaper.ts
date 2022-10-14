import { HttpService } from '@nestjs/axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { lastValueFrom, map } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NestAxiosAdapter implements HttpAdapter {
  
    constructor(private nestAxios: HttpService){}

  async get<T>(url: string): Promise<T> {
    try {
      const observable = await this.nestAxios
        .get(url)
        .pipe(map((response) => response.data));

      const data = await lastValueFrom(observable);

      return data;
    } catch (error) {
      throw new Error('Error en NestAxios Adapter'+ error);
    }
  }
}

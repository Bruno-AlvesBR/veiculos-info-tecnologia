import { HttpClient } from '@angular/common/http';

export class BaseAPI {
  protected baseURL = '';

  constructor(private httpRequest: HttpClient) {}

  private request<T>(method = 'get', path = '', params = {}, body = {}): Promise<T> {
    const headers = { 'Content-Type': 'Application/json' };

    return new Promise((resolve, reject) => {
      let response;

      if (method.includes('get'))
        response = this.httpRequest.get<T>(path, {
          headers,
          params: { ...params, t: Date.now().toString() },
        });

      if (method.includes('put') || method.includes('post'))
        response = this.httpRequest[method](path, body, {
          headers,
          params,
        });
      else if (method.includes('delete'))
        response = this.httpRequest.delete(path, { headers, params });

      response.subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  protected get<T>(path = '', params = {}): Promise<T> {
    return this.request<T>('get', path, params);
  }

  protected put(path = '', params = {}, body = {}) {
    return this.request('put', path, params, body);
  }

  protected post<T>(path = '', params = {}, body = {}) {
    return this.request<T>('post', path, params, body);
  }

  protected delete(path = '', params = {}) {
    return this.request('delete', path, params);
  }
}

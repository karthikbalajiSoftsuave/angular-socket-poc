import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

export type API_RESPONSE<R = any> = {
  statusCode: number,
  status: "success" | "error",
  message: string,
  data: R
}

export interface IThesis {
  name: string,
  file: string,
  author: string,
  _id?: string
}

@Injectable({
  providedIn: 'root'
})
export class ThesisService {
  
  readonly regex = {
    whitespace: new RegExp(/(?!^$)([^\s])/)
  };

  constructor(
    public http: HttpService
  ) { }


  public getAllThesis(): Observable<API_RESPONSE<IThesis[]>> {
    return this.http.get(`thesis`);
  }

  public createThesis(thesis: IThesis): Observable<API_RESPONSE<IThesis>> {
    return this.http.post(`thesis`, thesis);
  }

  public updateThesis(thesis: IThesis): Observable<API_RESPONSE<IThesis>> {
    return this.http.put(`thesis`, thesis);
  }

  public deleteThesis(thesis: IThesis): Observable<API_RESPONSE<IThesis>> {
    return this.http.delete(`thesis${thesis?._id}`);
  }

}

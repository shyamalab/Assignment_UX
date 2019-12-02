import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Youtube } from './model/youtube';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigfakerestService {

  url ='http://localhost:3000/youtube';

  constructor(private _httpclient : HttpClient) { 
    this.getvideoplayerlist();
  }

    // Http Headers
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    // Add Youtube player
      //POST
  addyoutubevideo(data): Observable<Youtube>{
    return this._httpclient.post<Youtube>(this.url, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.ErrorHanlding)
    ) 
  }

  getvideoplayerlist() : Observable<any>{
    return this._httpclient.get(this.url)
    .pipe(retry(1), catchError(this.ErrorHanlding));
  }

    // GET Employee based on specific Id
    getvideoplayer(id): Observable<Youtube> {
      return this._httpclient.get<Youtube>(this.url + '/' + id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ErrorHanlding)
      )
    }

      //EDIT You tube Video

  editvideoplayer(id, data) : Observable<Youtube>{
    return this._httpclient.put<Youtube>(this.url+"/"+id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.ErrorHanlding)
    )
    }
   

    //DELETE You Tube Video 
    deletevideoplayer(id) : Observable<any>{
      return this._httpclient.delete<any>(this.url+"/"+id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.ErrorHanlding)
      )
    }



  ErrorHanlding(error){
    let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}

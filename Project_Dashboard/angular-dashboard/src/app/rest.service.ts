import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Widget } from './widget-list/widget';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

get(url: string): Observable<Widget[]> {
    return this.http.get<Widget[]>(url);
}

getById(url: string): Observable<Widget> {
    return this.http.get<Widget>(url);
}

put(url: string, dataStringified: string): Observable<Widget> {
    
    const options = {
        headers: {
            "Content-type": "application/json"
        }
    };
        return this.http.put<Widget>(url, dataStringified, options);
}


post(url: string, dataStringified: string): Observable<Widget> {

    const options = {
        headers: {
            "Content-type": "application/json"
        }
    };
    return this.http.post<Widget>(url, dataStringified, options);
}

delete(url: string): Observable<Widget> {
    const options = {
        headers: {
            "Content-type": "application/json"
        }
    };
    return this.http.delete<Widget>(url, options);
}
}

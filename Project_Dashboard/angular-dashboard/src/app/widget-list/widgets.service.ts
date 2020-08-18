import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { widgetInterface } from './widget.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) { }

  public getWidgets(url: string): Observable<widgetInterface[]> {
      return this.http.get<widgetInterface[]>(url);
  }
}

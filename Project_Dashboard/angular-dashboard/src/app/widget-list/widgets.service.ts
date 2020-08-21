import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { widgetInterface } from './widget.interface';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../utils/urls';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) { }

  public getWidgets(): Observable<widgetInterface[]> {
      return this.http.get<widgetInterface[]>(BACKEND_URL);
  }

  public getWidgetById(widgetId: string | number): Observable<any> {
    return this.http.get(BACKEND_URL + '/' + widgetId);
}

  public updateWidget(widgetId: string | number, changes: Partial<widgetInterface>): Observable<any> {
    return this.http.put(BACKEND_URL + '/' + widgetId, changes);
}

  public createWidget(widget: widgetInterface): Observable<widgetInterface> {
    return this.http.post<widgetInterface>(BACKEND_URL, widget);
}

  public deleteWidget(widgetId:string | number): Observable<any> {
    return this.http.delete(BACKEND_URL + '/' + widgetId);
}


}

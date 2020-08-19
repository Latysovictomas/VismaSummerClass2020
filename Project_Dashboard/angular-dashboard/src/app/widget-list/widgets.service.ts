import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { widgetInterface } from './widget.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient) { }

  public getWidgets(url: string): any {
      return this.http.get(url);
  }

  public getWidgetById(url: string): any {
    return this.http.get(url);
}

  public putWidget(url: string, dataStringified: string): any {
    
  const options = {
      headers: {
        'Content-type': 'application/json'
      }
  };
      return this.http.put(url, dataStringified, options);
}

  public postWidget(url: string, dataStringified: string): any {

  const options = {
      headers: {
        'Content-type': 'application/json'
      }
  };
  return this.http.post(url, dataStringified, options);
}

  public deleteWidget(url: string): any {
  const options = {
      headers: {
        'Content-type': 'application/json'
      }
  };
  return this.http.delete(url, options);
}


}

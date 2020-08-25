import { widgetInterface } from './widget.interface';

export function getWidgetDataAsArray(widget: widgetInterface): string[] {
  if(!widget.data){
    return [];
  }

  return Array.isArray(widget.data) ? widget.data : Array.of(widget.data);
}
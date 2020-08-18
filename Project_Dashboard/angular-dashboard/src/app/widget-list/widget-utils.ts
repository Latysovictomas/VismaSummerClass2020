import { widgetInterface } from "./widget.interface";

export function getWidgetDataAsArray(widget: widgetInterface): string[] {
  return Array.isArray(widget.data) ? widget.data : Array.of(widget.data);
}
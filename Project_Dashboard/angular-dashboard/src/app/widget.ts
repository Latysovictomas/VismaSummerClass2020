import { widgetInterface } from './widget-interface';

export class Widget implements widgetInterface {
    title: string;
    column: number;
    type: number;
    headerType: number;
    data: string;

    constructor(title: string, column: number, type: number, headerType: number, data: string) {
        this.title = title;
        this.column = column;
        this.type = type;
        this.headerType = headerType;
        this.data = data;
    }
}
import { widgetInterface } from './widget-interface';

export class Widget implements widgetInterface {
    title: string;
    column: number;
    type: number;
    headerType: number;
    data: string;

    constructor(title, column, type, headerType, data) {
        this.title = title;
        this.column = column;
        this.type = type;
        this.headerType = headerType;
        this.data = data;
    }
}
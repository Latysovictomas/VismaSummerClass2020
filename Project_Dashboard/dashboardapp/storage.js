// Database
// localStorage for prefilling values
export class Store {
    static getWidgetsInLocalStorage() {
        let widgets;
        if (localStorage.getItem('widgets') === null) {
            widgets = [];
        } else {
            widgets = JSON.parse(localStorage.getItem("widgets"));
        }
        return widgets;
    }

    static addWidget(widget) {
        const widgets = Store.getWidgetsInLocalStorage();
        widgets.push(widget);
        localStorage.setItem('widgets', JSON.stringify(widgets));
    }

    static removeWidget(id) {
        const widgets = Store.getWidgetsInLocalStorage();
        widgets.forEach((widget, index) => {
            if (widget.id === id) {
                widgets.splice(index, 1);
            }
        });
        localStorage.setItem('widgets', JSON.stringify(widgets));
    }

}
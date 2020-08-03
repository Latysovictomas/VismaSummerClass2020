// TASKS:
// fix redirection when added succesfully
// add contents copy to dashboard2
// Event: if localStorage is not empty then put request and remove from localStorage else post request
// remove widgets in localStorage (inside if)
// check if Widget object is created correctly
// check if index.html table is scrollable
// isValidJSON data input as array?
// element cuts off 1px

import { Store } from './storage.js';
import { Widget } from './widget.js';

const widgets = Store.getWidgetsInLocalStorage();

if (!widgets.length == 0) {
    document.getElementById("title").value = widgets[0].title;
    document.getElementById("column-number").value = widgets[0].column;
    document.getElementById("types").value = widgets[0].type;
    document.getElementById("header-types").value = widgets[0].headerType;
    document.getElementById("text-area").value = JSON.stringify(widgets[0].data);

}




function isValidJSON(text) { //Array?
    try {
        JSON.parse('"' + text + '"');
        return true;
    } catch (error) {
        return false;
    }
}



// Event: Add a widget
document.getElementById('widget-form').addEventListener('submit', (e) => {
    // Prevent fast reload
    e.preventDefault();

    if (isValidJSON(document.getElementById('text-area').value) === false) {
        alert("Data input is not valid JSON. Do not use outer quotes.");

    } else {
        // get form data
        const title = document.getElementById('title').value;
        const column = Number(document.getElementById('column-number').value);
        const type = Number(document.getElementById('types').value);
        const headerType = parseInt(document.getElementById('header-types').value);
        const data = document.getElementById('text-area').value;

        const widget = new Widget(title, column, type, headerType, data);

        //clearfields


        // here decide on what type of request based on localStorage
        // http post request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", URL, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) { //fix redirection
                window.location.replace("index.html");
            };

        };
        var jsonData = JSON.stringify(widget);
        xhr.send(jsonData);

    }

});
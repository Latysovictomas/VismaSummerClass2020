import { Widget } from "./widget.js";
import { BACKEND_URL, CURRENT_WIDGET_ID } from "./utils/urls.js";
import { Rest } from "./utils/rest.js";


class WidgetForm {

    static fillFormByCurrentId() {
        if (CURRENT_WIDGET_ID != null) {
            //get request to fill form
            Rest.get(BACKEND_URL, WidgetForm.fillForm, CURRENT_WIDGET_ID);
        } else {
            console.log("Warning: No widget id is selected.");
        }
    }

    static fillForm(widget) {
        // get widget by id and fill a form
        document.getElementById("title").value = widget.title;
        document.getElementById("column-number").value = widget.column;
        document.getElementById("types").value = widget.type;
        document.getElementById("header-types").value = widget.headerType;
        document.getElementById("text-area").value = JSON.stringify(widget.data).replace('"null"', "null");
    }


    static isValidJSON(text) {
        try {
            JSON.parse(text);
            return true;
        } catch (error) {
            return false;
        }
    }


    static redirect() {
        window.location.href = "index.html";
    }

    static postOrPutFormData(widget) {

        var widgetStringified = JSON.stringify(widget).replace('"{', "{").replace('}"', '}').replace(/\\/g, "").replace('"[', "[").replace(']"', "]");

        if (CURRENT_WIDGET_ID != null) { // put request
            Rest.put(BACKEND_URL, WidgetForm.redirect, widgetStringified, CURRENT_WIDGET_ID);
        } else { // post request
            Rest.post(BACKEND_URL, WidgetForm.redirect, widgetStringified, CURRENT_WIDGET_ID);
        }
    }
    static setDeleteBtnDisplay() {
        var x = document.getElementById("delete-btn");
        if (CURRENT_WIDGET_ID != null) {
            x.style.display = "inline";
        } else {
            x.style.display = "none";
        }
    }

}


// run the fill form function
WidgetForm.fillFormByCurrentId();
// to display or not to display button
WidgetForm.setDeleteBtnDisplay();


// Event: Add/Edit a widget using post/put
document.getElementById("widget-form").addEventListener("submit", (e) => {
    // Prevent fast reload
    e.preventDefault();
    // validate json
    var data = document.getElementById("text-area").value.trim();
    // replace white space between the following chars: { , }, and other replacements
    data = data.replace(/({)\s+/g, "{").replace(/(,)\s+/g, ",").replace(/\s*(})\s*/g, "}").replace(/\'/g, '"');
    if (!WidgetForm.isValidJSON(data)) {
        alert("Data input is not valid JSON.");
    } else {
        // get form data
        var title = document.getElementById("title").value;
        var column = Number(document.getElementById("column-number").value);
        var type = Number(document.getElementById("types").value);
        var headerType = parseInt(document.getElementById("header-types").value);
        const widget = new Widget(title, column, type, headerType, data);
        // here decide on what type of request based on current id
        WidgetForm.postOrPutFormData(widget);
    }
});


// Event: Delete request
document.getElementById("delete-btn").addEventListener("click", (e) => {
    Rest.delete(BACKEND_URL, WidgetForm.redirect, CURRENT_WIDGET_ID);
});
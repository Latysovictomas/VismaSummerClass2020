import { Store } from './storage.js';
// import { Widget } from './widget.js';
const URL = "http://localhost:3000/widgets";

// UI
class UI {


    static insertAfter(referenceNode, newNode) {
        referenceNode.after(newNode);
    }



    static displayWidgets(widgets) {

        var mainSection = document.getElementById("main-cards");



        widgets.forEach((widget, index) => {
            var card = document.createElement("section");
            card.className = "card userList-card";



            if (widget.type === 1) { // userList

                //header
                var headerLink = document.createElement('a');
                headerLink.addEventListener('click', masterEventHandler, false); //redirect widget-form.html
                headerLink.href = "#";
                headerLink.className = "widget-link";
                var header = document.createElement('div');
                header.className = "widget-header";
                header.id = widget.id;
                var headerText = document.createElement('p');
                headerText.innerHTML = "<b>" + widget.title + "</b>";

                // header: appending
                header.appendChild(headerText);
                headerLink.append(header);
                card.appendChild(headerLink);

                // table
                var table = document.createElement("table");
                table.className = "card-table";
                var row = document.createElement('tr');

                row.innerHTML =
                    '<th>#</th>\
                <th>First Name</th>\
                <th>Last Name</th>\
                <th>Username</th>';

                table.appendChild(row);

                var widgetDataList = [];
                if (!Array.isArray(widget.data)) {
                    widgetDataList.push(widget.data);
                } else {
                    widgetDataList = widget.data;
                }

                widgetDataList.forEach((object, index) => {
                    var dataRow = document.createElement('tr');

                    // var dataObject = JSON.parse(object);
                    // console.log(object);
                    dataRow.innerHTML =
                        '<td>' + object.id + '</td>\
                    <td>' + object.firstName + '</td>\
                    <td>' + object.lastName + '</td>\
                    <td>' + object.userName + '</td>';
                    table.appendChild(dataRow);
                });



                card.appendChild(table);
                mainSection.appendChild(card);

            } else if (widget.type === 2) { // messages

            }



        });



    }

    static getWidgets(url) {
        // get request
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();
        // Ajax
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var widgetObj = JSON.parse(xhr.responseText);
                UI.displayWidgets(widgetObj);
            }
        };
    }

}






// Event: Display on initial page load
document.addEventListener('DOMContentLoaded', UI.getWidgets(URL));


// Event: add widget object to localStorage based on clicked widget
function masterEventHandler(e) {
    // add widget by id to localStorage

    const xhr = new XMLHttpRequest();
    xhr.open("GET", URL);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var widgets = JSON.parse(xhr.responseText);


            for (var i = 0; i < widgets.length; i++) {

                if (Number(widgets[i].id) == Number(e.target.id)) {
                    Store.addWidget(widgets[i]);
                    return;
                }
            }
            // redirect
            window.location.href = "widget-form.html";
        }
    };




}
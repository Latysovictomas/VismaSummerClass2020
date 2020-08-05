// TASKS:
// fix redirection when added succesfully
// add contents copy to dashboard2
// Event: if localStorage is not empty then put request and remove from localStorage else post request
// remove widgets in localStorage (inside if)
// check if Widget object is created correctly
// check if index.html table is scrollable
// isValidJSON data input as array?
// element cuts off 1px

import { Widget } from './widget.js';

const URL = "http://localhost:3000/widgets";
const CURRENT_WIDGET_ID = window.location.href.split("id=")[1];

function fillFormByCurrentId() {

    if (CURRENT_WIDGET_ID != null) {
        fetch(URL)
            .then(response => response.json())
            .then(widgets => {

                // get widget by id and fill a form
                var widget = widgets.find(x => Number(x.id) === Number(CURRENT_WIDGET_ID));
                document.getElementById("title").value = widget.title;
                document.getElementById("column-number").value = widget.column;
                document.getElementById("types").value = widget.type;
                document.getElementById("header-types").value = widget.headerType;
                document.getElementById("text-area").value = JSON.stringify(widget.data).replace('"null"', "null");

            }).catch((error) => {
                console.log('Requestfailed', error)
            });
    } else {
        console.log("Warning: Either editing a widget on unknown id.");
    }

}

// run the fill form function
fillFormByCurrentId();


function isValidJSON(text) { //Array?
    try {
        JSON.parse(text);
        return true;
    } catch (error) {
        return false;
    }
}


function postOrPutFormData(widget) {
    console.log(CURRENT_WIDGET_ID);
    var widgetStringified = JSON.stringify(widget).replace('"{', "{").replace('}"', '}').replace(/\\/g, "").replace('"[', "[").replace(']"', "]");

    if (CURRENT_WIDGET_ID != null) { // put request
        console.log("not Null. Using Put.");



        const putMethod = {
            method: 'PUT', // Method itself
            headers: {
                'Content-type': 'application/json' // Indicates the content 
            },
            body: widgetStringified
        };

        console.log(widgetStringified);
        fetch(URL + "/" + CURRENT_WIDGET_ID, putMethod)
            .then(response => response.json())
            .then(data => {
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.log('PutRequestfailed', error)
            });


    } else { // post request


        const postMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: widgetStringified
        };

        fetch(URL, postMethod)
            .then(response => response.json())
            .then(data => {

                window.location.href = "index.html";
            })
            .catch((error) => {
                console.log('PostRequestfailed', error)
            });

    }

}



// Event: Add/Edit a widget using post/put
document.getElementById('widget-form').addEventListener('submit', (e) => {
    // Prevent fast reload
    e.preventDefault();

    if (isValidJSON(document.getElementById('text-area').value) === false) {
        alert("Data input is not valid JSON. Do not use outer quotes.");

    } else {
        // get form data
        var title = document.getElementById('title').value;
        var column = Number(document.getElementById('column-number').value);
        var type = Number(document.getElementById('types').value);
        var headerType = parseInt(document.getElementById('header-types').value);
        var data = document.getElementById('text-area').value.trim();
        // replace white space between the following chars: { , }
        data = data.replace(/({)\s+/g, '{').replace(/(,)\s+/g, ',').replace(/\s*(})\s*/g, '}');

        const widget = new Widget(title, column, type, headerType, data);

        // here decide on what type of request based on current id
        postOrPutFormData(widget);


    }

});

function setDeleteBtnDisplay() {
    var x = document.getElementById("delete-btn");
    if (CURRENT_WIDGET_ID != null) {
        x.style.display = "inline";
    } else {
        x.style.display = "none";
    }
}

setDeleteBtnDisplay();

// Event: Delete request
document.getElementById('delete-btn').addEventListener('click', (e) => {

    const deleteMethod = {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json'
        }
    };

    fetch(URL + "/" + CURRENT_WIDGET_ID, deleteMethod)
        .then(response => {
            if (response.ok) {
                return Promise.resolve('User deleted.');
            } else {
                return Promise.reject('An error occurred.');
            }
        })
        .then(data => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.log('DeleteRequestfailed', error)
        });

});
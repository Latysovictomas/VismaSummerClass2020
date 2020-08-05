const URL = "http://localhost:3000/widgets";

// UI
class UI {

    static displayWidgets(widgets) {

        var mainSection = document.getElementById("main-cards");

        // append {three} div column containers
        UI.appendColumnContainers(3, mainSection);

        // for each widget
        widgets.forEach((widget, index) => {
            var card = document.createElement("section");
            if (widget.type === 1) { // userList
                UI.createUserListWidget(widget, card);
            } else if (widget.type === 2) { // messages
                UI.createMessageWidget(widget, card);
            }
        });
    }

    static createMessageWidget(widget, card) {
        // create header
        card.className = "card messages-card";
        var headerLink = UI.createWidgetHeader(widget);
        card.appendChild(headerLink);

        // create chat log
        var chatLog = UI.createChatLog(widget);

        // create form below chat log
        var form = UI.createChatForm();

        // append to card chatlog and form
        card.appendChild(chatLog);
        card.appendChild(form);

        // append to the right column
        UI.setWidgetPosition(widget, card);

    }

    static createChatForm() {
        //creating elements
        var form = document.createElement("form");
        form.className = "form-container";
        var textarea = document.createElement("textarea");
        textarea.name = "msg";
        textarea.placeholder = "Type message...";
        textarea.required = true;
        var sendBtn = document.createElement("button");
        sendBtn.type = "submit";
        sendBtn.className = "btn-send";
        sendBtn.style.cssText = "cursor: pointer;";
        var btnContainer = document.createElement("div");
        btnContainer.className = "btn-container";
        var sendIcon = document.createElement("span");
        sendIcon.className = "send-icon";
        var sendText = document.createElement("span");
        sendText.className = "send-text";
        sendText.innerText = "Send";
        // appending in proper structure
        btnContainer.appendChild(sendIcon);
        btnContainer.appendChild(sendText);
        sendBtn.appendChild(btnContainer);
        form.appendChild(textarea);
        form.appendChild(sendBtn);
        return form;
    }
    static createChatLog(widget) {
        var chatLog = document.createElement("div");
        chatLog.className = "chat-log";
        // put into chat data
        var widgetDataList = [];
        if (!Array.isArray(widget.data)) {
            widgetDataList.push(widget.data);
        } else {
            widgetDataList = widget.data;
        }
        // for each widget data (message)
        widgetDataList.forEach((object, index) => {
            //create elements to store message
            var messageContainer = document.createElement("div");
            messageContainer.className = "chat-message";
            var spanAuthor = document.createElement("span");
            spanAuthor.className = "chat-message-author";
            var messageText = document.createElement("p");
            //assign message contents
            spanAuthor.innerHTML = "<b>" + object.author + "</b>";
            messageText.innerText = object.message;
            messageContainer.appendChild(spanAuthor);
            messageContainer.appendChild(messageText);
            if ((index % 2) != 0) {
                messageContainer.className = messageContainer.className + " chat-message-right";
            }
            console.log(index)
            chatLog.appendChild(messageContainer);

        });
        return chatLog;
    }

    static createUserListWidget(widget, card) {
        // create header and return it as a link
        card.className = "card userList-card";
        var headerLink = UI.createWidgetHeader(widget);
        card.appendChild(headerLink);

        // table
        var table = UI.createTable(widget);

        // table container
        var tableContainer = document.createElement("div");
        tableContainer.id = "userList-container";
        tableContainer.appendChild(table);
        card.appendChild(tableContainer); // at this point card is prepared

        // append to the right column
        UI.setWidgetPosition(widget, card);
    }

    static createTable(widget) {
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
            dataRow.innerHTML =
                '<td>' + object.id + '</td>\
            <td>' + object.firstName + '</td>\
            <td>' + object.lastName + '</td>\
            <td>' + object.userName + '</td>';
            table.appendChild(dataRow);
        });
        return table;
    }


    static createWidgetHeader(widget) {
        //header and text
        var headerLink = document.createElement('a');
        headerLink.href = "widget-form.html?id=" + widget.id;
        headerLink.className = "widget-link";
        var header = document.createElement('div');
        header.className = "widget-header";
        header.id = widget.id;
        var headerText = document.createElement('p');
        headerText.innerHTML = "<b>" + widget.title + "</b>";

        // header color
        UI.setHeaderColor(widget, header);

        // header: appending
        header.appendChild(headerText);
        headerLink.append(header);

        return headerLink;
    }

    static setHeaderColor(widget, headerElement) {
        switch (widget.headerType) {
            case 1: // light
                headerElement.style.cssText = "background-color: rgba(100, 124, 151, 0.200);";
                break;
            case 2: // dark
                headerElement.style.cssText = "background-color: rgba(100, 124, 151, 0.700);";
                break;
        }
    }

    static setWidgetPosition(widget, card) {
        var container;
        switch (widget.column) {
            case 1:
                container = document.getElementById("column-1");
                container.appendChild(card);

                break;
            case 2:
                container = document.getElementById("column-2");
                container.appendChild(card);

                break;
            case 3:
                container = document.getElementById("column-3");
                container.appendChild(card);

        }
    }

    static appendColumnContainers(numberOfColumns, mainSectionElement) {
        var container;
        for (var i = 0; i < numberOfColumns; i++) {
            container = document.createElement('div');
            container.className = "main-column";
            container.id = "column-" + (i + 1);
            container.style.cssText = "grid-area: column-" + (i + 1) + ";";
            mainSectionElement.appendChild(container);
        }
    }

    static getWidgets() {

        const options = {
            method: "GET"
        }
        fetch(URL, options)
            .then(response => response.json())
            .then(data => {
                UI.displayWidgets(data);
            });


    }


}



// Event: Display on initial page load
document.addEventListener('DOMContentLoaded', UI.getWidgets());
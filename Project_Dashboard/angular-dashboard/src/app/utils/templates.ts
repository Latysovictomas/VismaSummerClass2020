export const chatInputHTML = () => `
<form class="form-container">
    <textarea class="form-container__textarea" name="msg" placeholder="Type message required"></textarea>
        <button class="form-container__btn-send" type="submit">
            <div class="btn-container">
                <span class="btn-container__send-icon"></span>
                <span class="btn-container__send-text">Send</span>
            </div>
        </button>
</form>`;


export const headerHTML = (widget, colorTheme) => `
<a href="form?id=${widget.id}" class="widget-link">
    <div class="widget-link__widget-header ${colorTheme}">
        <p>${widget.title}</p>
    </div>
</a>`;

export const tableHTML = (widgetsDataAsArray) => `
<div id="userList-container">
<table class="userList-container__table">
    <tr>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
    </tr>${widgetsDataAsArray.map((object) => rowData(object)).join("")}
</table></div>`;

const rowData = (object) => `
<tr>
    <td>${object.id}</td>
    <td>${object.firstName}</td>
    <td>${object.lastName}</td>
    <td>${object.userName}</td>
</tr>`;


export const chatLogHTML = (widgetsDataAsArray) => `
<div class="chat-log">
${widgetsDataAsArray.map((object, index) => chatLogMessages(object, index)).join("")}</div>`;


const chatLogMessages = (object, index) => `
<div class="chat-log__chat-message${index%2!==0?" chat-log__chat-message-right":""}">
    <span class="chat-log__chat-message-author">
        <b>${object.author}</b>
    </span>
    <p>${object.message}</p>
</div>`;
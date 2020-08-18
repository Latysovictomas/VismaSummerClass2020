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
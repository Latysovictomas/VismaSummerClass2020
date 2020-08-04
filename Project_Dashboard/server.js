// noded express
// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (req, res) => {
//     // res.send('Hello World!')
// })

// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// })

const http = require('http');
const express = require('express');
const path = require('path');


const app = express();
// app.use(express.json());
// app.use(express.static(__dirname + "/dashboardapp/css"));

// default URL for website
app.use('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/dashboardapp/html/index.html'));
    //__dirname : It will resolve to your project folder.
});


const server = http.createServer(app);

const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
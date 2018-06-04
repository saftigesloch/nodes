var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({port: 8080});
console.log("Server is Running on 8080...");

// Create a "broadcast" function on our WebSocketServer object.
// The function will take a "msg" paramter. When called, it will
// loop through all the connected clients and send them the msg.
wss.broadcast = function broadcastMsg(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
    });
};

// Create a listener function for the "connection" event.
// Each time we get a connection, the following function
// is called.
wss.on('connection', function connection(ws) {
    // Store the remote systems IP address as "remoteIp".
    var remoteIp = ws.upgradeReq.connection.remoteAddress;
    // Print a log with the IP of the client that connected.
    console.log('Connection received: ', remoteIp);
    // Add a listener which listens for the "message" event.
 
    // When a "message" event is received, take the contents
    // of the message and pass it to the broadcast() function.
    ws.on('message', wss.broadcast);
});

const ws = require('ws')

const wss = new ws.WebSocketServer({
    port: 5000
}, () => console.log(`WS: server started 5000`))


wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(message)

        switch (message.event) {
            case 'message':
                broadCastMessage(message)
                break;
            case 'connection':
                broadCastMessage(message)
                break;
        }
    })
})

const broadCastMessage = message => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}
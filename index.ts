import { Client, Message, Server } from 'node-osc';

const client = new Client('127.0.0.1', 5336);




const oscServer = new Server(5335, '127.0.0.1');

oscServer.on('message', function (msg) {
  console.log("oscMessage", msg)

  const outMsg = new Message('/newNotes');
  
  client.send(outMsg, (err) => {
    if (err) {
      console.error(new Error(err.message));
    }
    client.close();
  });
});
const Client = require("./src/EHBot")
const client = new Client()
require("./main").start()
client.loadCommands();
client.loadEvents();

client.connect().then(async() => require("./src/structures/ProtoTypes").start());
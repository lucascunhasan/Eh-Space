const Command = require("../../structures/Command")
module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            description: 'Mostra o ping de envio de mensagens, o da API e o da Base de dados',
            category: 'Info',
            aliases: ['latencia', 'latency'],
            dm: false,
            cooldown: 4,
            OnlyDevs: false
        })
    }
    async execute(message, args) {
    	message.channel.createMessage(`🏓 <@${message.author.id}>, **Pong!**\n**⏱️ Gateway:** \`${this.client.shards.get(0)?.latency || 0}ms\`\n**💓 API:** \`${this.client.requestHandler.latencyRef.latency}ms\``)
    }
};
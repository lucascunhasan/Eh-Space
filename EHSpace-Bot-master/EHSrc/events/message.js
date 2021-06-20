let moment = require("moment");
require("moment-duration-format");
module.exports = class MessageCreate {
  constructor(client) {
    this.client = client;
  }
  async run(message) {
      if(message.author.bot) return;
    const prefix = ";";
    if (new RegExp(`^<@!?${this.client.user.id}>$`).test(message.content)) {
    message.channel.send(`<:PepeCool:847224387723722852> | Salve, <@!${message.author.id}>! Meu prefixo é \`;\`, para ver o que eu posso fazer, use \`;ajuda\`!`, { reply: { messageReference: message.id }, allowedMentions: { repliedUser: true }})
      message.react("peepoFofo:847223558786252880");
      return;
    }
    const regExp = /[a-zA-Z]/g;

    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const comando = args.shift()?.toLowerCase();
    if (!comando) return;
    if (!regExp.test(comando)) return;
    let command = this.client.commands.find(
      (c) => c.name === comando || c.aliases?.includes(comando)
    );
    if (!command)
      return;
    if (!command?.dm && message.channel.type === 1) return;
    if (command.OnlyDevs) {
      if (message.author.id !== "821086275204808764")
        return message.channel.send("Este comando é apenas para meus desenvolvedores, devido a isso, você não pode executar.");
    }

    const cooldownAmount = (command.cooldown || 3) * 100;
    if (this.client.cooldowns.has(message.author.id)) {
      let time = this.client.cooldowns.get(message.author.id);
      return message.channel.send(
        `você está utilizando os comandos muito rápido! Aguarde ${
          time - Date.now() > 1000
            ? moment.utc(time - Date.now()).format(`s [segundos]`)
            : moment.duration(time - Date.now()).format(`[milissegundos]`)
        } para utilizar outro comando!`
      );
    }
    this.client.cooldowns.set(message.author.id, Date.now() + cooldownAmount);

    setTimeout(() => {
      this.client.cooldowns.delete(message.author.id);
    }, cooldownAmount);
    try {
      command.execute(message, args);
    } catch (e) {
      message.channel.send("Ocorreu um erro durante a execução do comando, por favor, abra um ticket e reporte o bug!");
    }
  }
};

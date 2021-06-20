let moment = require("moment");
require("moment-duration-format");
module.exports = class MessageCreate {
  constructor(client) {
    this.client = client;
  }
  async run(message) {
    const regExp = /[a-zA-Z]/g;
    if (message.channel.id == "848265473120272414") {
      if (
        regExp.test(message.content) &&
        message.author.id == "510016054391734273"
      ) {
        message.channel.purge({ limit: 99 }, (msg) => !msg.pinned);
      } else if (
        regExp.test(message.content) &&
        message.author.id !== "510016054391734273"
      ) {
        setTimeout(() => {
          message.delete();
        }, 1000);
      }
    }
    if (message.author.bot) return;
    if (message.channel.id == "849356568503255051") {
      if (message.attachments[0]) {
        const { readFileSync } = require("fs");
        message.channel.createMessage("", {
          name: "Instagram.png",
          file: readFileSync("src/images/Instagram.png"),
        });
      } else if (!message.attachments[0]) {
        message.delete();
      }
    }
    const prefix = ";";
    if (new RegExp(`^<@!?${this.client.user.id}>$`).test(message.content)) {
      message.channel.createMessage({
        content: `<:PepeCool:847224387723722852> | Salve, <@!${message.author.id}>! Meu prefixo é \`;\`, para ver o que eu posso fazer, use \`;ajuda\`!`,
        messageReferenceID: message.id,
      });
      message.addReaction("peepoFofo:847223558786252880");
      return;
    }
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
        return message.channel.createMessage("Nao pode");
    }

    const cooldownAmount = (command.cooldown || 3) * 100;
    if (this.client.cooldowns.has(message.author.id)) {
      let time = this.client.cooldowns.get(message.author.id);
      return message.channel.createMessage(
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
      message.channel.createMessage("Ocorreu um erro!");
    }
  }
};

const Command = require("../../structures/Command")
const { Type } = require('@anishshobith/deeptype');
const { inspect } = require("util")
let moment = require("moment")
const { MessageAttachment } = require("discord.js")
moment.locale("pt-BR")
module.exports = class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'eval',
            description: 'Executa um código JavaScript e retorna o seu resultado',
            aliases: ['e', 'ev', 'evl', 'evaluate'],
            usage: '<código>',
            category: 'Dev',
            dm: true,
            OnlyDevs: true
        });
    }
    async execute(message, args) {
        /*
        * @param { Message } message
        * @param { Array[String] } args
        */
       if(!args[0]) return message.channel.send(message.channel.id, { content: "você precisa enviar um código JavaScript para obter o seu resultado!"})
       const clean = (text) => {
        if (typeof text === 'string') {
          text = text
            .replace(/`/g, `\`${String.fromCharCode(8203)}`)
            .replace(/@/g, `@${String.fromCharCode(8203)}`)
            .replace("ODQ2NTMyNzY1MzUyMDY3MTAy.YKw5Ew.UG46Xo1rm87QLtz8O0jtArFE1n8", "T0K3N");
        }
        return text;
      }
      try{
      const start = process.hrtime();
      const code = args.join(' ');
      let evaled = eval(code);

      if (evaled instanceof Promise)
        evaled = await evaled;

      const stop = process.hrtime(start);

      const time = ((stop[0] * 1e9) + stop[1]) / 1e6;
      const response = [
        `${clean(inspect(evaled, { depth: 0 }))}`
      ];
      const res = response.join('\n');
          let att = new MessageAttachment(Buffer.from(res, 'utf-8'), `EHBot ${moment().format("L")}.txt`);

           message.reply(`<@!${message.author.id}>, o resultado está no arquivo abaixo, algumas informações do código executado:\n\nTipo de saída: ${new Type(evaled).is}\nTempo de execução: ${time > 1 ? `${time}ms` : `${(time * 1e3).toFixed(3)}μs`}`, att)
} catch(e) {
                         let att2 = new MessageAttachment(Buffer.from(e.toString(), 'utf-8'), `EHBot ${moment().format("L")}.txt`);

   message.reply(`<@!${message.author.id}>, o resultado do código obteve um erro, veja-o no arquivo abaixo`, att2)
}
    }
}

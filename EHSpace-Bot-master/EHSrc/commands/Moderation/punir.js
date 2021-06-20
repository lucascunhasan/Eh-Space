const Command = require("../../structures/Command")

const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
module.exports = class PunirCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'punir',
            description: 'Viu alguém quebrando as regras? Vamos punir!',
            aliases: ["banir", "expulsar"],
            usage: '<@user> [motivo]',
            category: 'Moderation',
            dm: false,
            OnlyDevs: false
        });
    }
    async execute(message, args) {
        if(!message.member.permissions.has("BAN_MEMBERS") && !message.member.permissions.has("KICK_MEMBERS")) return message.reply(`<@!${message.author.id}>, para utilizar esse comando, você precisa das permissões de \`Banir Membros\` e \`Expulsar Membros\`!`)
        if(!args[0]) return message.reply(`<@!${message.author.id}>, você precisa mencionar ou inserir o ID de alguém que está dentro do servidor!`)
        let motivo = args.slice(1).join(" ")
        if(!args[1]) motivo = "Motivo não definido"
        let user = await message.guild.members.fetch(args[0].replace(/<|@|>|!/g,''))
        if(!user) return message.reply(`<@!${message.author.id}>, você precisa mencionar ou inserir o ID de alguém que está dentro do servidor!`)
        if(user.id == message.author || user.id == this.client.user.id) return message.reply(`<@!${message.author.id}>, você não pode se banir e/ou me banir!`)
        let punicaoMsg = new MessageEmbed()
        .setColor("#C06FFF")
        .setAuthor(`${message.author.tag} | Punições`, "https://media.discordapp.net/attachments/836994562643722290/837009276093857813/gsLGBTQ-removebg-preview2.png")
        .setDescription(`Escolha o tipo de punição.\n\nUsuário: \`${user.user.tag}\` (\`${user.user.id}\`)\nMotivo: \`${motivo}\``)
        let punicaoMsg2 = new MessageEmbed()
        .setColor("#C06FFF")
        let punicaoMsg3 = new MessageEmbed()
        .setColor("#C06FFF")
        let punicaoMsg4 = new MessageEmbed()
        .setColor("#C06FFF")
        .setAuthor(`${message.author.tag} | Punições`, "https://media.discordapp.net/attachments/836994562643722290/837009276093857813/gsLGBTQ-removebg-preview2.png")
            let ban = new MessageButton()
            .setStyle("DANGER")
                .setLabel("BANIR")
                .setCustomID("ban")

                let kick = new MessageButton()
                .setStyle("PRIMARY")
                .setLabel("EXPULSAR")
                .setCustomID("kick")
                let sim = new MessageButton()
                .setStyle("SUCCESS")
                .setLabel("SIM")
                .setCustomID("sim")          
                let nao = new MessageButton()
                .setStyle("DANGER")
                .setLabel("NÃO")
                .setCustomID("nao")
                let sn = new MessageActionRow()
                .addComponents([sim, nao])


                let row = new MessageActionRow()
                .addComponents([ban, kick])
            let m = await message.channel.send({ embed: punicaoMsg, components: [row] })

            const filter = (button) => button.user.id === message.author.id;
            const collector = m.createMessageComponentInteractionCollector(filter, { time: 90000, max: 1 }); 

            collector.on('collect', (collected) => {
                if (collected.customID == "kick") {
                    if(!user.kickable){
                         message.reply(`<@!${message.author.id}>, você não pode expulsar esse usuário!`)
                         return m.delete()
                        }
                    if(message.member.roles.highest.position <= user.roles.highest.position && message.guild.owner.id == user.user.id){ 
                        message.channel.send(`Ei, <@!${message.author.id}>. Você não pode expulsar esse usuário!`).then(msg => {
                            setTimeout(async() => msg.delete(), 7500)
                        })
                         return m.delete()

                        }
                         punicaoMsg2.setDescription(`Você deseja continuar com a punição?\n\nUsuário: \`${user.user.tag}\` (\`${user.user.id}\`)\nMotivo: \`${motivo}\`\nTipo de punição: \`Expulsão\``)
        
                    m.delete()
                    message.channel.send({embed: punicaoMsg2, components: [sn] }).then(async(msg) => {
                        const filter = (interaction) => interaction.user.id === message.author.id;
        const collector = msg.createMessageComponentInteractionCollector(filter, { time: 90000, max: 1 });
        collector.on('collect', i => {
            msg.delete()
            if(i.customID == "sim"){
                user.kick({ reason: motivo })
                punicaoMsg3.setDescription(`<@!${message.author.id}>, o usuário punido com sucesso!\nUsuário: \`${user.user.tag}\` (\`${user.user.id}\`)\nMotivo: \`${motivo}\`\nPunição: \`Expulsão\``)
                punicaoMsg4.setDescription(`Usuário: \`${user.user.tag}\` (\`${user.user.id}\`)\nMotivo: \`${motivo}\`\nPunição: \`Expulsão\``)
                message.guild.channels.cache.get("844061397418770462").send(punicaoMsg4)
                return message.reply(message.author.toString(), punicaoMsg3)
                } else if(i.customID == "nao") {
                msg.delete()
                message.reply(`<@!${message.author.id}>, a expulsão foi cancelada com sucesso!`)
            }
        })
    })
} else if (collected.customID == "ban") {
            if(!user.bannable){
                 message.reply(`Ei, <@!${message.author.id}>. Você não pode banir esse usuário!`).then(msg => {
                    setTimeout(async() => msg.delete(), 7500)
                })
                 return m.delete()
            }
                 if(message.member.roles.highest.position <= user.roles.highest.position && message.guild.owner.id == user.user.id){
                      message.channel.send(`<@!${message.author.id}>, você não pode banir esse usuário!`)
                      return m.delete()
                 }
            punicaoMsg2.setDescription(`Você deseja continuar com a punição?\n\nUsuário: \`${user.user.tag}\` (\`${user.user.id}\`) \nMotivo: \`${motivo}\`\nTipo de punição: \`Banimento\``)

            m.delete()
            message.channel.send({embed: punicaoMsg2, components: [sn] }).then(async(msg) => {
                const filter = (interaction) => interaction.user.id === message.author.id;
const collector = msg.createMessageComponentInteractionCollector(filter, { time: 90000, max: 1 });
collector.on('collect', i => {
    msg.delete()
    if(i.customID == "sim"){
        user.ban({ reason: motivo })
        punicaoMsg3.setDescription(`<@!${message.author.id}>, o usuário punido com sucesso!\nUsuário: \`${user.user.tag}\`\nMotivo: \`${motivo}\`\nPunição: \`Banimento\``)
        punicaoMsg4.setDescription(`Usuário: \`${user.user.tag}\` (\`${user.user.id}\`)\nMotivo: \`${motivo}\`\nPunição: \`Banimento\``)
        message.guild.channels.cache.get("844061397418770462").send(punicaoMsg4)
        return message.reply(message.author.toString(), punicaoMsg3)
        } else if(i.customID == "nao") {
        msg.delete()
        message.reply(`<@!${message.author.id}>, o banimento foi cancelado com sucesso!`)
    }
});
collector.on('end', collected => { return collected });
})                    
        } 
            });
            collector.on('end', collected => { return collected });
        }
    }
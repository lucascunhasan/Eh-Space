const { Message } = require("eris");
const emotes = require("../utils/emotes")
module.exports = class ProtoTypes {
    static start() {
        //—————————————————————————————— sendDrakon - Mensagem Quote With Emote ——————————————————————————————
        Message.prototype.sendDrakon = async function (emoji, message, ...args) {
            emoji = emotes[emoji];
            return this.quote(`${emoji ? emoji : emotes["lua"]} **|** <@${this.author.id}>, ${message}`, ...args)
        }
        //—————————————————————————————— quote - Mensagem Quote ——————————————————————————————
        Message.prototype.quote = async function (message) {
            return this.channel.createMessage({ content: message, messageReferenceID: this.id })
        }
        //—————————————————————————————— sendEmbed - Send a Embed with Quote ——————————————————————————————
        Message.prototype.sendEmbed = async function (message, embed) {
            return this.channel.createMessage({ content: message, embed: embed, messageReferenceID: this.id })
        }
    }
}
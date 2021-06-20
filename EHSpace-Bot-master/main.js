const { Client } = require("discord.js")

module.exports = class Space {
  static start() {
    const Client = require("./EHSrc/EHBot")
    const client = new Client()
      client.connect()
    }
}
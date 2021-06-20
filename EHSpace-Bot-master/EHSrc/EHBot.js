const { Client, Intents } = require("discord.js");
const { readdirSync } = require("fs");
const config = require("../config");

module.exports = class EHBot extends Client {
    constructor() {
        super({intents: [Intents.NON_PRIVILEGED]});
        this.commands = [];
        this.cooldowns = new Map();
        this.config = config;
       // this.embed = require("./structures/EmbedStructure")
    }
    loadCommands() {
        readdirSync('./EHSrc/commands').forEach(dir => {
          if (dir.endsWith('.js')) {
            const cmd = require(`./commands/${dir}`).default;
            this.commands.push(new cmd(this));
          } else {
            readdirSync(`${__dirname}/commands/${dir}`).filter(file => file.endsWith('.js')).forEach(file => {
              const command = require(`../EHSrc/commands/${dir}/${file}`);
              this.commands.push(new command(this));
            });
          }
        });
      }
    
      loadEvents() {
        readdirSync(`${__dirname}/events`).filter(file => file.endsWith('.js')).forEach(file => {
          const event = new (require(`${__dirname}/events/${file}`))(this);
          const eventName = file.split('.')[0];
    
          if (eventName === 'ready') {
            super.once('ready', (...args) => event.run(...args));
          } else {
            super.on(eventName, (...args) => event.run(...args));
          }
        })
      }
    
      connect(token = "ODQ2NTMyNzY1MzUyMDY3MTAy.YKw5Ew.UG46Xo1rm87QLtz8O0jtArFE1n8") {
        super.login(token);
        this.loadEvents();
        this.loadCommands();
      }
}


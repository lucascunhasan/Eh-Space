const { Client } = require("eris");
const { readdirSync } = require("fs");
const config = require("../config");
const Options = {
  intents: [
    'guilds',
    'guildMembers',
    'guildEmojis',
    'guildVoiceStates',
    'guildPresences',
    'guildMessages',
    'guildMessageReactions',
    'directMessages',
    'directMessageReactions'
  ],
    getAllUsers: true,
    restMode: true,
    compress: true,
};
module.exports = class EHBot extends Client {
    constructor() {
        super(config.token, Options);
        this.commands = [];
        this.cooldowns = new Map();
        this.config = config;
        this.embed = require("./structures/EmbedStructure")
    }
    loadCommands() {
        readdirSync('./src/commands').forEach(dir => {
          if (dir.endsWith('.js')) {
            const cmd = require(`./commands/${dir}`).default;
            this.commands.push(new cmd(this));
          } else {
            readdirSync(`${__dirname}/commands/${dir}`).filter(file => file.endsWith('.js')).forEach(file => {
              const command = require(`../src/commands/${dir}/${file}`);
              this.commands.push(new command(this));
            });
          }
        });
      }
    
      loadEvents() {
        readdirSync('./src/events').filter(file => file.endsWith('.js')).forEach(file => {
          const event = new (require(`${__dirname}/events/${file}`))(this);
          const eventName = file.split('.')[0];

          if (eventName === 'ready') {
            super.once('ready', (...args) => event.run(...args));
          } else {
            super.on(eventName, (...args) => event.run(...args));
          }
        })
      }
    
      connect() {
        return super.connect();
      }
}


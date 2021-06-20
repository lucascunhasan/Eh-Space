module.exports = class Command {
  
    constructor(client, options) {
      this.client = client;
  
      this.name = options.name;
      this.description = options.description || 'Sem descrição';
      this.aliases = options.aliases;
      this.usage = options.usage;
      this.category = options.category;
      this.dm = options.dm || false;
      this.args = options.args;
      this.cooldown = options.cooldown || 3;
      this.OnlyDevs = options.OnlyDevs || false;
    }
  }
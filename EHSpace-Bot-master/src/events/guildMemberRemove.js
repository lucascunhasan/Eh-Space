module.exports = class guildMemberAdd {
    constructor(client)  { 
      this.client = client;
    }
    async run(guild, member)  { 
        this.client.editChannel("844268217467535391", { name: `〡🙋・Tripulantes: ${guild.members.filter(u => !u.bot).length}`}, "Contador")
        this.client.editGuild("790940065789378561", { name: `✨ EHSpace | #${guild.members.filter(u => !u.bot).length}`}, "Contador") 
    };
  };
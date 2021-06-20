module.exports = class Ready {
  constructor(client)  { 
    this.client = client;
  }
  async run()  { 
    const status = [
      { name: `🎧 Ouvindo músicas com meus amigos`, type: 2 },
      {
        name: `🦋 Vendo mais de ${
          this.client.users.filter((user) => !user.bot).length
        } pessoas incríveis!`,
        type: 3,
      },
      {
        name: `💸 Estou aceitando doações! Vá até o canal de donates do Servidor.`,
        type: 3,
      },
      {
        name: `❓ Está com dúvidas ou com problemas? Vá até o canal de Suporte do Servidor!`,
        type: 3,
      },
      {
        name: `❗ Sugestões ou Seja Staff? Vá até o canal de Suporte do Servidor!`,
        type: 3,
      },
      {
        name: `💫 É novo no Servidor? Faça sua verificação digitando ;verificar!`,
        type: 3,
      },
      {
        name: `📨 Envie seus memes, compartilhe links e muito mais no canal de Mídias do Servidor!`,
        type: 3,
      },
      {
        name: `🎬 Viu um momento engraçado na Stream? Envie seu clipe no canal de Clipes do Servidor!`,
        type: 3,
      },
      {
        name: `❤️ Você é fã? Envie sua arte do Gabriel e ganhe um cargo no canal de Fan Arts!`,
        type: 3,
      },
      {
        name: `😂 Compartilhe os momentos engraçados do Servidor reagindo a uma mensagem com "⭐"`,
        type: 3,
      },
      {
        name: `🎮 Venha jogar jogos com meus amigos na categoria de "Games Estelares" do Servidor!`,
        type: 3,
      },
      {
        name: `📷 Poste suas fotos, selfies e muito mais no canal Instagram do Servidor e ganhe um cargo especial por uma semana!`,
        type: 3,
      },
      {
        name: `🗣️Conversando com meus amigos na categoria "Comunicações" do Servidor.`,
        type: 3,
      },
      {
        name: `🤝 Seja Parceiro do Servidor, divulgue seu Servidor e ganhe benefícios! Vá até o canal de "Requisitos" e saiba mais!`,
        type: 3,
      },
    ];
    let randomStatus = status[Math.floor(Math.random() * status.length)];
    this.client.editStatus("online", {
      name: randomStatus.name,
      type: randomStatus.type
    });
    setInterval(() => {
      let randomStatus = status[Math.floor(Math.random() * status.length)];
      this.client.editStatus("online", {
        name: randomStatus.name,
        type: randomStatus.type
      });
    }, 15000);
      console.log(`${this.client.user.username} | Eris †`)
    };
};

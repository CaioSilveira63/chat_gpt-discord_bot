const { SlashCommandBuilder } = require("discord.js");
const { ClearAiMessages } = require("../ai");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears chat!"),
  async execute(interaction) {
    var msg_size = 100;
    while (msg_size == 100) {
      await interaction.reply(ClearAiMessages());
      await interaction.channel
        .bulkDelete(100)
        .then((messagesList) => (msg_size = messagesList.size))
        .catch(console.error);
    }
  },
};

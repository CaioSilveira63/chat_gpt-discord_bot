const { SlashCommandBuilder } = require("discord.js");
const { ClearAiMessages, getStatus } = require("../ai");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Checks ChatGPT bot status"),
  async execute(interaction) {
    await interaction.reply(getStatus());
  },
};

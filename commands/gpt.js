const { SlashCommandBuilder } = require("discord.js");
const { ClearAiMessages, getStatus, ask } = require("../ai");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gpt")
    .setDescription("Talk with the chat gpt bot")
    .addStringOption((option) =>
      option.setName("mesage").setDescription("Your mesage to the chat gpt bot").setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply(await ask(interaction.options.getString("mesage")));
  },
};

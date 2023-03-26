require("dotenv").config();
const { ask } = require("./ai.js");
const { Client, GatewayIntentBits, Events, Collection } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
const { deployCommands } = require("./deployCommands");

if (!process.env.discordToken) {
  throw new Error(
    "No discord token provided! Please add a .env file with the discord token in it. (See .env.example for an example)"
  );
}

if (!process.env.openAIToken) {
  throw new Error(
    "No OpenAI api token provided! Please add a .env file with the OpenAI api token in it. (See .env.example for an example)"
  );
}
if (!process.env.botBehaviour) {
  throw new Error(
    "No bot behaviour description provided! Please add a .env file with the bot behaviour description in it. (See .env.example for an example)"
  );
}

if (!process.env.clientId) {
  throw new Error(
    "No clientId provided! Please add a .env file with the clientId of your bot in it. (See .env.example for an example)"
  );
}
if (!process.env.guildId) {
  throw new Error(
    "No guildId provided! Please add a .env file with the guildId in it. (See .env.example for an example)"
  );
}

if (!process.env.channelID) {
  throw new Error(
    "No channelID provided! Please add a .env file with the channelID in it. (See .env.example for an example)"
  );
}

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, () => {
  deployCommands();
  console.log("Commands Ready!");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.on("ready", () => {
  console.log("The AI bot is online");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.channel.id === process.env.channelID) {
    await message.channel.sendTyping();
    console.log("Message received: " + message.content);
    const answer = await ask(message.content);
    message.channel.send(answer);
  }
});

client.login(process.env.discordToken);

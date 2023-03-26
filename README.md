# Chat GPT Discord Bot

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/Pix4wh?referralCode=MUugF-)

## A simple and easy to deploy Chat GPT Discord Bot

### **ATTENTION:**

That's just a simple implementation of a ChatGPT 3 discord bot on a specific text channel on a specific server, and this bot is not ment to be utilized by a chat with multiple people, becouse it will recognize all users as a single pearson talking to it.

## **How to deploy:**

1. Create your bot on the [discord developer portal](https://discord.com/developers).
   * you will need to get a bunch of discord id's, to get those you will need to enable the developer mode on discord advanced settings, and them just right click on the element name (discord server and text channel), and there will be an option to copy it's id.
     
   * you will need to allow permissions to read/write mesages and to delete mesages for the bot work properly.
2. Set your discord information on the .env file.
   * you will need to put your bot token on the discordToken field on your .env file.
   * you will need to put your discord application id on the clientId field on your .env file.
   * you will need to put your guild Id(discord server id) on the guildId field on your .env file.
   * you will need to put your server desired text channel id on the channelID field on your .env file.

3. [Get your OpenAI api token](https://platform.openai.com/).  
   * you will need to put your token on the openAIToken field on the .env file.
    
4. Create a description of the behaviour of your bot on the botBehaviour field on your .env file.
   * that description will determine how you bot will behave, like:
    
          You are a general purpose assistant who wants to chat. 
        or
      
          "You are a technical support virtual assistant who responds things in a more technical way.


## **Usage:**

After deployed the bot on a specific channel, just say anything and the bot will answer.

## **Commands:**

* `/status`
  * Returns the current token usage status of your bot.
* `/clear`
  * clears the conversation with the bot 
   **(it clears the mesages that you have sent to the bot too)**


  
  

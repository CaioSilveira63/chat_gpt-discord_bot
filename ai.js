const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.openAIToken,
});
const openai = new OpenAIApi(configuration);

const InitialMessages = [
  {
    role: "system",
    content: process.env.botBehaviour,
  },
];

let Messages = InitialMessages;
let Status = null;
function ClearAiMessages() {
  Messages = InitialMessages;
  return "Clearing AI messages";
}

function getStatus() {
  if (Status) {
    return "```json\n" + JSON.stringify(Status) + "\n```";
  } else {
    return "No status";
  }
}

async function ask(message) {
  Messages.push({ role: "user", content: message });

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: Messages,
  });
  Status = response.data.usage;

  console.log(
    "Answer: " + JSON.stringify(response.data.choices[0].message.content)
  );

  Messages.push({
    role: "assistant",
    content: response.data.choices[0].message.content,
  });
  return response.data.choices[0].message.content;
}
module.exports = {
  ask,
  ClearAiMessages,
  getStatus,
};

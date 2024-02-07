import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {

  console.log("Welcome to the chatbot program!".bold.green);
  console.log("You can start chatting with the bot!".bold.green);

  const chatHistory = [];

  while (true) {
    const userMessage = readlineSync.question("User: ".yellow);
    try {
      // construct msg by iterating over the history
      const botMessages = chatHistory.map(([role, content]) => ({role, content}))

      botMessages.push({ role: "user", content: userMessage });

      
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: botMessages,
      });

      // 
      if (userMessage.toLowerCase() === "exit") {
        // console.log("Goodbye!".bold.red);
        console.log(
          "Bot:".bold.green,
          chatCompletion.choices[0].message.content
        );
        break;
      }
      console.log("Bot:".bold.green, chatCompletion.choices[0].message.content);
      
      // Update history with user input and assistant response

      chatHistory.push(["user", userMessage]);
      chatHistory.push(["assistant", chatCompletion.choices[0].message.content]);

    }catch(e){
      console.log("Error:".red, e);
    }

    
  }


}

main();

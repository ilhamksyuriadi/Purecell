const { createServer } = require("bottender/express");
const { LineBot } = require("bottender")

const bot = new LineBot({
    accessToken:
      "LlrW5RNNYS/18PFhxqSBB0V1SOIicCPyS/mlYn9noUaMfnVPbIsbXAQYdU3vsnHTqrH+N6EYqCnCy/1jzqTTDdCyYnreFYFyvpkhRRXxnbjQWiHdFJ6chv1fWxEQh590VtmIMRvyIPImzis8a2MGWgdB04t89/1O/w1cDnyilFU=",
    channelSecret: "757906b1f7f59310fdc9322b90e1f40e"
  });

let features = require("./flex/features")

bot.onEvent(async context=>{
    switch (context.event.text){
        case "fitur":
          await context.replyFlex(
            "[All Features]",
            features);
          break;

        default:
            await context.replyText("Coba lagi");
    }
})

const server = createServer(bot);

server.listen(process.env.PORT || 7000, () => {
  console.log("server is running on 7000 port...");
});
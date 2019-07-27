const { createServer } = require("bottender/express");
const { LineBot } = require("bottender")

const bot = new LineBot({
    accessToken:
      "LlrW5RNNYS/18PFhxqSBB0V1SOIicCPyS/mlYn9noUaMfnVPbIsbXAQYdU3vsnHTqrH+N6EYqCnCy/1jzqTTDdCyYnreFYFyvpkhRRXxnbjQWiHdFJ6chv1fWxEQh590VtmIMRvyIPImzis8a2MGWgdB04t89/1O/w1cDnyilFU=",
    channelSecret: "757906b1f7f59310fdc9322b90e1f40e"
  });

bot.onEvent(async context=>{
    if (context.event.text){
        await context.replyText('test')
    }
})

const server = createServer(bot);

server.listen(process.env.PORT || 5000, () => {
  console.log("server is running on 5000 port...");
});
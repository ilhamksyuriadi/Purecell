const { createServer } = require("bottender/express");
const { LineBot } = require("bottender")
const mongoose = require('mongoose');

const bot = new LineBot({
    accessToken:
      "LlrW5RNNYS/18PFhxqSBB0V1SOIicCPyS/mlYn9noUaMfnVPbIsbXAQYdU3vsnHTqrH+N6EYqCnCy/1jzqTTDdCyYnreFYFyvpkhRRXxnbjQWiHdFJ6chv1fWxEQh590VtmIMRvyIPImzis8a2MGWgdB04t89/1O/w1cDnyilFU=",
    channelSecret: "757906b1f7f59310fdc9322b90e1f40e"
  });

//DB config
const db = 'mongodb+srv://ilham:171197@purecell-vlp1l.mongodb.net/test?retryWrites=true&w=majority;'

//DB connection
mongoose
  .connect(db, { useNewUrlParser: true }) // Let us remove that nasty deprecation warrning :)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB error : '+err));

//Schema config
let watchSchema = new mongoose.Schema({
  name: String
})
let WatchModel = mongoose.model('watchModel', watchSchema)

let features = require("./flex/features")
let watchListFlex = require("./flex/watchList")
let listTemplate = require("./flex/listTemplate")
let elementTemplate = require("./flex/elementTemplate")
let watchList = []
let toDoList = []
let downloadList = []

// for (let i = 0; i < watchList.length; i++){
//   let newWatch = listTemplate
//   newWatch.contents[1].text = watchList[i]
//   watchListFlex.body.contents.push(newWatch)
// }

bot.onEvent(async context=>{
  let command = context.event.text

  if (command == "features"){
    await context.replyFlex(
      "[All Features]",
      features);
  }

  else if (command == "watch list"){
    await context.replyFlex(
      "[Watch List]",
      watchListFlex);
  }

  else if (command.includes("add watch list")){
    let movie = command.substring(15,command.length)
    watchList.push(movie)
    console.log(watchList)

    let watchModel = new WatchModel()
    watchModel.name = movie
    watchModel.save()

    let newWatch = elementTemplate
    newWatch.contents[1].text = movie
    watchListFlex.body.contents.push(newWatch)
    // let newWatch = listTemplate
    // newWatch.contents[1].text = movie
    // watchList.push(newWatch)
    // watchListFlex.body.contents.push(watchList[watchList.length-1])
    await context.replyText(movie + " ditambahkan ke dalam watch list")
  }

  else if (command.includes("add to do list")){
    let toDo = command.substring(15,command.length)
    toDoList.push(toDo)
    await context.replyText(toDo + " ditambahkan ke dalam to do list")
  }

  else if (command.includes("add download list")){
    let download = command.substring(18,command.length)
    downloadList.push(download)
    await context.replyText(download + " ditambahkan ke dalam download list")
  }

  else{
    await context.replyText("Coba lagi");
  }
})

const server = createServer(bot);

server.listen(process.env.PORT || 7000, () => {
  console.log("server is running on 7000 port...");
});
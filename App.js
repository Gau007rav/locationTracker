let express = require("express")
let app = express();
const path = require('path')
let socketio = require("socket.io")
let http = require("http")
let server = http.createServer(app);
let io= socketio(server)

app.set("view engine" , "ejs")
app.use(express.static (path.join(__dirname,"public")))



io.on("connection" ,function(socket){
    socket.on("send-location",function(data){
           io.emit("recieved-location",{id:socket.id,...data})
    })

    socket.on("disconnected" , function(){
        io.emit("user-disconnected",socket.id)
    })
    console.log("connected")
})

app.get("/",(req,res)=>{
    res.render("index")
})
server.listen(8000,()=>{
    console.log("server is running")
})
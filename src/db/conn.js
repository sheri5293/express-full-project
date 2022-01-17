const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/studentRegister", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connection successful")) //it pass promise thats mean if conection sucees then execute then otherwise execute (e )
    .catch((err) => console.log(err));
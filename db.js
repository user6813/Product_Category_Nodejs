const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/nodeJS', {useNewUrlParser: true,useUnifiedTopology:true}).then(result=>{ 
    console.log("Database Connected")
},err=>{console.log(err)})
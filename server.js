import mongoose from "mongoose";
import app from './app.js'
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGODB_URL ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDb Database connected...");
});


const server = app.listen(process.env.PORT,()=>{
    console.log("Server set up at port : " + process.env.PORT);
})

process.on("unhandledRejection", (err) => {
    console.log(err.name, err.message);
    console.log("UNHANDLED REJECTION....... SHUTTING DOWN!!!");
  
    server.close(() => {
      process.exit(1);
    });
  });
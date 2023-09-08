import express from "express";
import answerRouter from "./routes/answerRouter.js";
import postRouter from "./routes/postRouter.js";
import authRouter from "./routes/authRouter.js";
import cookieParser from "cookie-parser";
import cors  from 'cors';

const app = express();


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://chic-faloodeh-63c56a.netlify.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(express.json({limit: '10kb' })); 
app.use(cookieParser()); 
app.use(express.urlencoded({extended:true,limit:'10kb'}));
app.use(cors({
    origin: ["http://localhost:3001","https://byte-solvers.netlify.app/"],
    credentials: true,
    
}));

app.use("/post", postRouter);
app.use("/answer", answerRouter);
app.use("/user", authRouter);


export default app;

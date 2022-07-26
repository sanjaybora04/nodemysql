const express = require("express")
const cors  = require ("cors")

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api",require("./routes/db"));


app.listen("5000",()=>{
    console.log("Server started successfully on port 5000....");
})
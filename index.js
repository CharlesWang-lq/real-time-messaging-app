const express = require("express")
const app = express();
const port = 8800
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")


dotenv.config()

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB!');
});

//middleware
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cors())
app.use("/api/users", userRoute)
app.use("/api/auth",authRoute)



app.listen(port,()=>{
    console.log("Backend server is running on port " + port )
})
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import scoresRoute from "./routes/scores.route.js";
import applicationRoute from "./routes/application.route.js";
import savedProjectRoute from "./routes/savedProject.route.js";
import taskRoutes from "./routes/tasks.route.js";


dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/scores", scoresRoute);
app.use("/api/v1/saved-projects", savedProjectRoute);
app.use('/api/tasks', taskRoutes);



app.use(cors({
    origin: "http://localhost:5173", // replace with your frontend URL
    credentials: true,  // allow cookies if needed
  }));
  

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
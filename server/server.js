// import express from 'express';
// import cors from 'cors';
// import "dotenv/config";
// import connectDB from './configs/db.js';
// import userRouter from './routes/userRoutes.js';
// import resumeRouter from './routes/resumeRouter.js';
// import aiRouter from './routes/aiRoutes.js';

// const app=express();
// const PORT=process.env.PORT||4000;

// // database connection
// await connectDB();

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://your-resume-builder-frontend.vercel.app" // your deployed frontend
//   ],
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); 

// app.get('/',(req,res)=>{
// res.send("Server is live........")
// })

// app.use('/api/users',userRouter);
// app.use('/api/resumes',resumeRouter);
// app.use('/api/ai',aiRouter);

// app.listen(PORT,()=>{
// console.log("Server is running on the port 3000");
// })




import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import resumeRouter from './routes/resumeRouter.js';
import aiRouter from './routes/aiRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://resume-builder-sigma-ruby.vercel.app", // your actual deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman, curl, server-to-server

    const isAllowed =
      allowedOrigins.includes(origin) ||
      /^https:\/\/resume-builder-.*\.vercel\.app$/.test(origin); // Vercel previews

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send("Server is live........");
});

app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
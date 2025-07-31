import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // ✅ ADD THIS
import connectDB from './config/db.js';
import testRoutes from './routes/testRoutes.js';
import JobRoutes from './routes/JobRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // ✅ Allow your frontend URL
app.use(express.json());

// Routes
app.use('/api/test', testRoutes);
app.use('/api/jobs', JobRoutes);
app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

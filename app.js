import express from 'express';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// Mount the task router
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
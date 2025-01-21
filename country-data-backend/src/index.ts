import express from 'express';
import cors from 'cors';
import 'express-async-errors';
// Project dependencies
import countryRoutes from './routes/countryRoutes';
import { errorHandler } from './middlewares/error';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/countries', countryRoutes);
// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

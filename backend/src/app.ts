import express from 'express';
import globalErrorHandler from './middlewares/globalErrorHandler';

const app = express();

// Global error handler
app.use(globalErrorHandler);

export default app;

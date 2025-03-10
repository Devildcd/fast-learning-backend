import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    mongoURI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fastLearning',
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN?.split(',') || '*', // Convierte en array si hay múltiples orígenes
    jwtSecretKey: process.env.JWT_SECRET,
    jwtRefreshKey: process.env.JWT_REFRESH_SECRET
};
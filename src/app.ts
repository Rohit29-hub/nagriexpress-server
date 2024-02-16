import express from 'express'
const app = express();
import cookieParser from 'cookie-parser'
import registerRoute from './routes/register.routes'
import loginRoute from './routes/login.routes'
import { authMiddleware } from './middlewares/authMiddleware';


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/nagriexpress/user/v1/account',registerRoute);
app.use('/nagriexpress/user/v1/account',loginRoute);
app.get('/nagriexpress/v1/backend/profile',authMiddleware,(req,res) => {
    res.json({
        message: 'Hello World'
    })
})


export default app;
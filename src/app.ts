import express from 'express'
const app = express();
import cookieParser from 'cookie-parser'
import registerRoute from './routes/register.routes'
import loginRoute from './routes/login.routes'
import productRoute from './routes/product.routes'
import adminRoute from './routes/admin.routes'

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

// user routes
app.use('/nagriexpress/user/v1/account',registerRoute);
app.use('/nagriexpress/user/v1/account',loginRoute);

// product routes
app.use('/nagriexpress/v2/',productRoute);

// admin routes

app.use('/nagriexpress/v3/admin/',adminRoute)





export default app;
import express from 'express'
const app = express();
import registerRoute from './routes/register.routes'

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use('/',registerRoute);


export default app;
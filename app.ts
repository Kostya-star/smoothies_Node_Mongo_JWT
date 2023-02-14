import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import { checkUser, requireAuth } from './src/middleware/authMiddleware';
import authRoutes from './src/routes/authRoutes';

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './src/views');

mongoose.set('strictQuery', false);

const mongoDB =
  'mongodb+srv://Constantin:deefterAdi2022@smoothiecluster.lzkdtdg.mongodb.net/auth?retryWrites=true&w=majority';
mongoose
  .connect(mongoDB)
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

app.get('*', checkUser);

app.get('/', requireAuth, (req, res) => res.render('home'));

app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);

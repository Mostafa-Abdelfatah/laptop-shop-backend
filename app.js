const { connectDB, app, express } = require('./config/db.js');
const cors = require('cors');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes.js');
const laptopRoutes = require('./routes/laptopRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const brandRoutes = require('./routes/brandRoutes')
const authRoutes = require('./routes/authRoutes')
const rateRoutes = require('./routes/rateRoutes')
const cartRoutes = require('./routes/cartRoutes')
const cartItemRoutes = require('./routes/cartItemRoutes')


app.use(cors());
app.use(express.json()); // this allow us to use json to send and receive data
app.use(express.urlencoded({ extended: true })); // this allow us to use url to send and receive data
app.use(helmet());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use('/laptop', laptopRoutes)
app.use('/category', categoryRoutes)
app.use('/brand', brandRoutes)
app.use('/rate', rateRoutes)
app.use('/cart', cartRoutes)
app.use('/cartItem', cartItemRoutes)

connectDB();
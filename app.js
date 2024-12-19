const { connectDB, app, express } = require('./config/db.js');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');

app.use(cors());
app.use(express.json()); // this allow us to use json to send and receive data
app.use(express.urlencoded({ extended: true })); // this allow us to use url to send and receive data
connectDB();


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/user', userRoutes)
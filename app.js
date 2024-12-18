const {express,app}=require('./server');
const cors = require('cors');

app.use(cors());
app.use(express.json()); // this allow us to use json to send and receive data
app.use(express.urlencoded({ extended: true })); // this allow us to use url to send and receive data


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('user',(req,res) =>{
  res.json({message: 'get all users'})
})


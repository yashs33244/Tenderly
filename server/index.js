require('dotenv').config();
const express = require('express'); 
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const tenderRoutes = require('./routes/tender');
const bidRoutes = require('./routes/bid');



//connect to db
connection();

//middlewares
app.use(express.json());
app.use(cors(
    {
        origin: ["https://tenderly.vercel.app","http://localhost:5173"],
        methods: ['GET,PUT,POST,DELETE'],
        credentials: true
    }
));
app.get('/', (req, res) => {
    res.send('Welcome to the server');
});
//routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tenders',tenderRoutes);
app.use('/api/bids',bidRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
});

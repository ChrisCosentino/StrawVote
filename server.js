const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// //connect DB
connectDB();

// //init middleware
// //this allows us to get the json body in a post request(removing it gives undefined)
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('api running'));

app.use('/api/poll', require('./routes/api/poll'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static( 'client/build' ));

    app.get('*', () => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
    });
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started ${PORT}`));
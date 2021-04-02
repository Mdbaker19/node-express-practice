const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv/config');
const Post = require('./model/Post');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});


// const apiRoute = require('./routes/posts');
// app.use('/new', apiRoute);

// get all from mongo db (?)
app.get('/api', (req, res) => {
    Post.find({ })
        .then((data) => {
            // console.log("data", data);
            res.json(data);
        })
        .catch( (error) => {
            console.log("error", error);
        })
})

// connect to db
const mongoDBURI = process.env.DB_Connection;
mongoose.connect(mongoDBURI, {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
    console.log("connected");
});

app.listen(3000)




const words = ['hats', 'apples', 'dogs', 'animals', 'table'];
const body = ['a lot of them', 'very loud ones', 'it is for sale', 'do not mess with it', 'it looks like you'];

app.post('/new', async (req, res) => {
    const post = new Post({
        title: words[random()],
        body: body[random()]
    });
    try{
        const savePost = await post.save();
        res.json(savePost);
    } catch (err){
        res.json({message: err})
    }
    // await res.redirect("/api");
});

function random(){
    return ~~(Math.random() * 5);
}
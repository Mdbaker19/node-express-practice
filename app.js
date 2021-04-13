const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv/config');
const Post = require('./model/Post');
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        // res.json(posts);
    } catch (err) {
        res.json(err);
    }
    res.sendFile(path.join(__dirname + '/index.html'));
    // res.render('index');
});


// const apiRoute = require('./routes/posts');
// app.use('/new', apiRoute);

// get all from mongo db (?)
app.get('/api', (req, res) => {
    Post.find({ })
        .then((data) => {
            // console.log("data", data);
            res.json(data);
            // document.getElementById("info").innerText = data;
            res.sendFile(path.join(__dirname + '/data.html'));
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



app.post('/new', async (req, res) => {

    let titleLen = req.body.title.length;
    let descLen = req.body.desc.length;

    if(titleLen < 1 || descLen < 1) {
        res.redirect("/");
        return;
    }

    const post = new Post({
        title: req.body.title,
        body: req.body.desc
    });
    try{
        const savePost = await post.save();
        res.json(savePost);
    } catch (err){
        res.json({message: err})
    }
    await res.redirect("/api");
});


app.get('/post/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
})

app.delete('/post/:id', async (req, res) => {
    try {
        const removed = await Post.remove({_id : req.params.id})
        res.json("post with id " +req.params.id+ " was deleted");
    } catch (err) {
        res.json(err);
    }
})
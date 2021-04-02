const express = require('express');
const Post = require('../model/Post');

const router = express.Router();

const words = ['hats', 'apples', 'dogs', 'animals', 'table'];
const body = ['a lot of them', 'very loud ones', 'it is for sale', 'do not mess with it', 'it looks like you'];

router.get('/api', (req, res) => {
    Post.find({ })
        .then((data) => {
            res.json(data);
            console.log(data);
        })
        .catch( (error) => {
            console.log("error", error);
        })
});

// router.post('/new', async (req, res) => {
//    const post = new Post({
//        title: words[random()],
//        body: body[random()]
//    });
//    try{
//        const savePost = await post.save();
//        res.json(savePost);
//    } catch (err){
//        res.json({message: err})
//    }
// });


function random(){
    return ~~(Math.random() * 5);
}

module.exports = router;
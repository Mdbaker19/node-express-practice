const express = require('express');
const Post = require('../model/Post');

const router = express.Router();

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

router.get('/post/:id', async (req, res) => {
    try {
        console.log("getting one by id");
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.json(err);
    }
})

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


module.exports = router;
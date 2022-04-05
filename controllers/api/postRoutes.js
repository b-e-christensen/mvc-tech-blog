const router = require('express').Router();
const { Post } = require('../../models');

// -----> /api/posts

router.put('/:id', async (req, res) => {
    try {
        console.log('put route reached')
        const postData = await Post.update({
            title: req.body.title,
            content: req.body.content }, {
                where: {
                    id: req.params.id
                }
            })
            if (!postData) {
                res.status(404).json({ message: 'No category found with that id.' });
                return;
              }
              const updatedPost = await Post.findByPk(req.params.id);
              res.status(200).json(updatedPost)
        
    } catch (err) {
        res.status(500).json(err)
    }
}) 

router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        res.status(200).json(postData)
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})
    
module.exports = router
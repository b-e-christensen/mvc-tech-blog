const router = require('express').Router();
const { Post } = require('../../models');

// -----> /api/posts
router.get('/:id', (req, res) => {
    try {
        console.log('mega put route reached')
    } catch (error) {
        console.log(error)
    }
    
})


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
    
module.exports = router
const router = require('express').Router();
const { Comment, User, Post, CommentBoard } = require('../../models');
const withAuth = require('../../utils/auth');


// ---> /api/comments

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{ model: User }, { model: Comment}]
    })

    // res.status(200).json(postData)

    const post = postData.get({ plain: true });
    res.render('comment', {
      post
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/delete/:id', async (req, res) => {
    try {
      const commentData = await Comment.findOne({
        where: {
          id: req.params.id
        },
        include: [{ model: User }, { model: Post}]
      })
      const comment = commentData.get({ plain: true });
      res.render('delete-comment', {
        comment
      })

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

  router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
      const deletedComment = await Comment.destroy({
        where: {
          id: req.params.id
        }
      })
      if (res.status(200)) {
        // req.method = 'GET'
        res.redirect(303, '/profile')
        }
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  })

  router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id, 
            user_name: req.session.user_name
        })

        const newCommentBoard = await CommentBoard.create({
            comment_id: newComment.id,
            post_id: req.body.postId
        })
        
        if (res.status(200)) {
          res.redirect('/')
        }
        
        
    } catch (err) {
      console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router
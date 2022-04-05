const router = require('express').Router();
const { Comment, User, Post, CommentBoard } = require('../../models');


// ---> /api/comments

// router.get('/', async (req, res) => {
//     try {
//         const commentData = await Comment.findAll({
//             include: ({ model: User })
//         })
//         res.status(200).json(commentData)
//     } catch (err) {
//         console.log(err)
//         res.status(500).json(err)
//     }

// })

router.get('/', async (req, res) => {
    try {
      const postData = await Comment.findAll({
        include: [{ model: User }, { model: Post}]
      })

      res.status(200).json(postData)

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

router.post('/', async (req, res) => {
    try {
        const newComment = await Comment.create({
            content: req.body.content,
            user_id: req.session.user_id
        })

        const newCommentBoard = await CommentBoard.create({
            comment_id: newComment.id,
            post_id: postId
        })
        
    } catch (err) {
        
    }
})

module.exports = router
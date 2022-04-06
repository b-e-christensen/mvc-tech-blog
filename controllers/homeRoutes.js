const router = require('express').Router();
const { User, Post, Comment, CommentBoard } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        include: [{ model: User }, { model: Comment}]
      })

      const posts = postData.map((post) => post.get({ plain: true }));


      res.render('dashboard', {
        posts, 
        logged_in: req.session.logged_in 
      })

    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

  // Use withAuth middleware to prevent access to route
  router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }, {model: Comment}],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/edit/:id', withAuth, async (req, res) => {
    const postData = await Post.findOne({
      where: {
        id: req.params.id
      }
    })

    const post = postData.get({ plain: true });
    res.render('edit', {
      post
    })
  })
  
  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/profile');
      return;
    }
  
    res.render('login');
  });
  
  router.get('/new-post', (req, res) => {
    res.render('new-post')
  })


  
  module.exports = router;
const express = 'express'
const usersDb = require('./userDb.js')

const router = express.Router()

router.post('/', (req, res) => {
  usersDb
    .insert(req.body)
    .then(user => {
      res.status(201).json(user)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.post('/:id/posts', validateUserId, validateUser, (req, res) => {
  const postInfor = { ...req.body, user_id: req.params.id }
  postDb
    .insert(postInfor)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
  usersDb
    .get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user)
})

router.get('/:id/posts', validateUserId, (req, res) => {
  usersDb
    .getUserPosts(req.params.id)
    .then(userPosts => {
      res.status(200).json(userPosts);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', validatePostId, (req, res) => {
  postsDB
    .remove(req.params.id)
    .then(removed => {
      res.status(200).json({ message: 'The post has been removed' });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {})

// custom middleware

function validateUserId (req, res, next) {}

function validateUser (req, res, next) {}

function validatePostId(req, res, next) {
  postsDB
    .getById(req.params.id)
    .then(post => {
      console.log(post); // { id: 9, text: 'Well, that rules you out.', user_id: 3 }
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: 'Id not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
}




module.exports = router

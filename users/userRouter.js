const express = 'express';
const usersDb = require('./userDb.js')

const router = express.Router();

router.post('/', (req, res) => {
usersDb
.insert(req.body)
.then(user => {
  res.status(201).json(user)
})
.catch(err => {
  res.status(500).json(err)
})
});

router.post('/:id/posts',  validateUserId, validateUser, (req, res) => {
const postInfor = {...req.body, user_id: req.params.id}
postDb
.insert(postInfor)
.then(post => {
  res.status(201).json(post)
})
.catch(err => {
  res.status(500).json(err)
})
});

router.get('/', (req, res) => {
  usersDb
    .get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;

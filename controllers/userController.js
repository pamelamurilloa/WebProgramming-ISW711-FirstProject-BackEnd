const User = require("../models/userModel");
const Kid = require("../models/kidModel");
/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */


const userPost = async (req, res) => {
  let user = new User();

  user.email = req.body.name;
  user.password  = req.body.password;
  user.pin  = req.body.pin;
  user.name  = req.body.name;
  user.lastname  = req.body.lastname;
  user.country  = req.body.country;
  user.birthdate  = req.body.birthdate;
  user.kids  = req.body.kids;

  if (user.name && user.url) {
    await user.save()
      .then(data => {
        res.status(201); // Created
        res.header({
          'location': `/tubekids/users/?id=${data.id}`
        });
        res.json(data);
      })
      .catch( err => {
        res.status(422);
        console.log('error while saving the user', err);
        res.json({
          error: 'There was an error saving the user'
        });
      });

  } else {
    res.status(422);
    console.log('error while saving the user')
    res.json({
      error: 'No valid data provided for user'
    });
  }
};

/**
 * Get all users
 *
 * @param {*} req
 * @param {*} res
 */

const userGet = (req, res) => {
    User.findById(req.params.id)
      .then( (user) => {
        res.json(user);
      })
      .catch(err => {
        res.status(404);
        console.log('error while trying to find the user', err)
        res.json({ error: "User doesnt exist" })
      });
};

const userGetAll = (req, res) => {
  User.find()
    .then( users => {
      res.json(users);
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

/**
 * Updates a user
 *
 * @param {*} req
 * @param {*} res
 */

const userPatch = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.status(404);
      console.log('error while trying to find the user', err)
      res.json({ error: "User doesnt exist" })
    }

    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;
    user.pin = req.body.pin ? req.body.pin : user.pin;
    user.name = req.body.name ? req.body.name : user.name;
    user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
    user.country = req.body.country ? req.body.country : user.country;
    user.birthdate = req.body.birthdate ? req.body.birthdate : user.birthdate;
    user.kids = req.body.kids ? req.body.kids : user.kids;

    user.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the user', err)
        res.json({
          error: 'There was an error saving the user'
        });
      }
      res.status(200); // Saved
      res.json(user);
    });
  });
};

/**
 * Deletes a user
 *
 * @param {*} req
 * @param {*} res
 */
 const userDelete = (req, res) => {
  // get user by id
    User.findById(req.params.id, function (err, user) {
      if (err) {
        res.status(404);
        console.log('error while queryting the user', err)
        res.json({ error: "User doesnt exist" })
      }
      
      Kid.deleteMany( {_id: { $in: user.kids } }, function (err) {
        if (err) {
          res.status(422);
          console.log('error while deleting the kids', err)
          res.json({
            error: 'There was an error deleting the kids'
          });
        }
        res.status(204); //No content
        res.json({});
      });

      user.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log('error while deleting the user', err)
          res.json({
            error: 'There was an error deleting the user'
          });
        }
        res.status(204); //No content
        res.json({});
      });
      
    });
};

module.exports = {
  userGet,
  userGetAll,
  userPost,
  userPatch,
  userDelete
}
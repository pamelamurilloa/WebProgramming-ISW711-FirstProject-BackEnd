const User = require("../models/userModel");
const Kid = require("../models/kidModel");
var moment = require('moment');
/**
 * Creates a user
 *
 * @param {*} req
 * @param {*} res
 */

const userPost = async (req, res) => {
  let user = new User();

  user.email = req.body.email;
  user.password  = req.body.password;
  user.pin  = req.body.pin;
  user.name  = req.body.name;
  user.lastname  = req.body.lastname;
  user.country  = req.body.country;
  user.birthdate  = moment(req.body.birthdate).format('YYYY-MM-DD');
  user.kids = [];

  if (user.email && user.password && user.pin && user.name && user.lastname && user.birthdate && user.kids) {
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
    res.json({error: 'No valid data provided for user'});
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
 * Compares passwords
 *
 * @param {*} req
 * @param {*} res
 */
const userCompare = (req, res) => {
  const email = req.params.email;
  const password = req.params.password;

  User.findOne({ email: email, password: password })
  .then( (user) => {
    res.status(200);
    res.json(user);
  })
  .catch(err => {
    res.status(404);
    console.log('error while trying to find the user', err)
    res.json({ error: "User doesnt exist" })
  });

}

/**
 * Updates a user
 *
 * @param {*} req
 * @param {*} res
 */

const userPatch = async (req, res) => {
    let user = new User();
    await User.findById(req.params.id)
    .then( (data) => {
      user = data;
    })
    .catch(err => {
      res.status(404);
      console.log('error while trying to find the user', err)
      res.json({ error: "User doesnt exist" })
    });

    user.email = req.body.email ? req.body.email : user.email;
    user.password = req.body.password ? req.body.password : user.password;
    user.pin = req.body.pin ? req.body.pin : user.pin;
    user.name = req.body.name ? req.body.name : user.name;
    user.lastname = req.body.lastname ? req.body.lastname : user.lastname;
    user.country = req.body.country ? req.body.country : user.country;
    user.birthdate = req.body.birthdate ? req.body.birthdate : user.birthdate;
    user.kids = req.body.kids ? req.body.kids : user.kids;

    await user.save()
    .then (data => {
      res.status(200); // Saved
      res.json(data);
    })
    .catch (err => {
      res.status(422);
      console.log('error while saving the user', err);
      res.json({error: 'There was an error saving the user'});
    })
};

/**
 * Deletes a user
 *
 * @param {*} req
 * @param {*} res
 */
 const userDelete = async (req, res) => {
    // get user by id
    let user = new User();
    await User.findById(req.params.id)
    .then( (data) => {
      user = data;
    })
    .catch(err => {
      res.status(404);
      console.log('error while trying to find the user', err)
      res.json({ error: "User doesnt exist" })
    });

    try {
        await Kid.deleteMany( {_id: { $in: user.kids } } )
        .catch (err => {
          res.status(422);
          console.log('error while deleting the user', err);
          res.json({error: 'There was an error deleting the user'});
        })
      
        await user.deleteOne(req.body.id)
        .then ( () => {
            res.status(204); //No content
            res.json('User deleted succesfully');
          }
        )
        .catch (err => {
          res.status(422);
          console.log('error while saving the user', err);
          res.json({error: 'There was an error saving the user'});
        })
    }
    catch (err) {
      console.log('error while deleting the user', err);
      res.json({error: 'User doesnt exist'});
    }
};

module.exports = {
  userGet,
  userGetAll,
  userCompare,
  userPost,
  userPatch,
  userDelete
}
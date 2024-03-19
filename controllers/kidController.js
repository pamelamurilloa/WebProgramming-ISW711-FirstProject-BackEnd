const User = require("../models/userModel");
const Kid = require("../models/kidModel");

/**
 * Creates a kid
 *
 * @param {*} req
 * @param {*} res
 */

const getUser = async (userId) => {
    let user = await User.findById(userId)
    .catch(err => {
      console.log('error while trying to find the user', err)
    });

    return user;
}

const kidPost = async (req, res) => {
    let kid = new Kid();    

    let userId = req.body.userId;
    let user = new User();
    user = await getUser(userId);

    kid.name = req.body.name;
    kid.pin  = req.body.pin;
    kid.avatar = req.body.avatar;
    kid.age  = req.body.age;

    // Saves the kid with their parent
    if (user && kid.name && kid.pin && kid.avatar && kid.age) {
        let newKid = await kid.save()
        .catch(err => {
            res.status(404);
            console.log('error while saving the kid', err)
            res.json({ error: "There was an error saving the kid" })
            });

        // Add the kid's ID to the user's kids array
        user.kids.push(newKid._id);

        // Updated the user file with the new information
        await user.save()
        .then (data => {
            res.status(200); // Saved
            res.header({
                'kidlocation': `/tubekids/kids/?id=${newKid.id}`,
                'user_location': `/tubekids/users/?id=${data.id}`
            });
            res.json(data);
        })
        .catch (err => {
            res.status(422);
            console.log('error while saving the user', err);
            res.json({error: 'There was an error saving the user'});
        })
    }

};

/**
 * Get all kids
 *
 * @param {*} req
 * @param {*} res
 */

const kidGet = (req, res) => {
    Kid.findById(req.params.id)
      .then( (kid) => {
        res.json(kid);
      })
      .catch(err => {
        res.status(404);
        console.log('error while trying to find the kid', err)
        res.json({ error: "Kid doesnt exist" })
      });
};

const kidGetAll = async (req, res) => {
  
  let userId = req.body.userId;
  let user = await getUser(userId);

  console.log(user);

    await Kid.find({ _id: { $in: user.kids } })
    .then(kids => {
      res.json(kids);
    })
    .catch(err => {
        res.status(422);
        console.log('error while trying to find the kid', err)
        res.json({ error: "Kid doesnt exist" })
    });
};

/**
 * Updates a kid
 *
 * @param {*} req
 * @param {*} res
 */

const kidPatch = (req, res) => {
  Kid.findById(req.params.id, function (err, kid) {
    if (err) {
      res.status(404);
      console.log('error while trying to find the kid', err)
      res.json({ error: "Kid doesnt exist" })
    }

    kid.name = req.body.name ? req.body.name : kid.name;
    kid.pin = req.body.pin ? req.body.pin : kid.pin;
    kid.avatar = req.body.avatar ? req.body.avatar : kid.avatar;
    kid.age = req.body.age ? req.body.age : kid.age;

    kid.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the kid', err)
        res.json({
          error: 'There was an error saving the kid'
        });
      }
      res.status(200); // Saved
      res.json(kid);
    });
  });
};

/**
 * Deletes a kid
 *
 * @param {*} req
 * @param {*} res
 */
 const kidDelete = (req, res) => {
  // get kid by id
  let userId = req.params.userId;

    Kid.findByIdAndDelete( req.params.id, function (err) {
        if (err) {
                res.status(422);
                console.log('error while deleting the kid', err)
                res.json({error: 'There was an error deleting the kid'});
            }
            res.status(204); //No content
            res.json({});
    });
      
    User.findByIdAndUpdate(userId, { $pull: { kids: req.params.id } }, function (err) {
        if (err) {
          res.status(422);
          console.log('Error while removing the kid from the parent', err);
          return res.json({error: 'There was an error removing the kid from the parent'});
        }
        res.status(204); // No content
        res.json({});
      });
};

module.exports = {
  kidGet,
  kidGetAll,
  kidPost,
  kidPatch,
  kidDelete
}
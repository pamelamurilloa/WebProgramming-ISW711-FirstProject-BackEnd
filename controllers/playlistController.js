const Playlist = require("../models/playlistModel");

/**
 * Creates a playlist
 *
 * @param {*} req
 * @param {*} res
 */


const playlistPost = async (req, res) => {
  let playlist = new Playlist();

  playlist.name = req.body.name;
  playlist.user  = req.body.userId;
  playlist.kids  = req.body.kids;
  playlist.videos  = req.body.videos;

  if (playlist.name && playlist.user) {
    await playlist.save()
      .then(data => {
        res.status(201); // Created
        res.header({
          'location': `/tubekids/playlists/?id=${data.id}`
        });
        res.json(data);
      })
      .catch( err => {
        res.status(422);
        console.log('error while saving the playlist', err);
        res.json({
          error: 'There was an error saving the playlist'
        });
      });

  } else {
    res.status(422);
    console.log('error while saving the playlist')
    res.json({
      error: 'No valid data provided for playlist'
    });
  }
};

const playlistPostVideo = async (req, res) => {
};


/**
 * Get all playlists
 *
 * @param {*} req
 * @param {*} res
 */

const playlistGet = (req, res) => {
    Playlist.findById(req.params.id)
      .then( (playlist) => {
        res.json(playlist);
      })
      .catch(err => {
        res.status(404);
        console.log('error while trying to find the playlist', err)
        res.json({ error: "Playlist doesnt exist" })
      });
};

const playlistGetAll = (req, res) => {
  Playlist.find()
    .then( playlists => {
      res.json(playlists);
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

/**
 * Updates a playlist
 *
 * @param {*} req
 * @param {*} res
 */

const playlistPatch = (req, res) => {
  Playlist.findById(req.params.id, function (err, playlist) {
    if (err) {
      res.status(404);
      console.log('error while trying to find the playlist', err)
      res.json({ error: "Playlist doesnt exist" })
    }

    playlist.name = req.body.name ? req.body.name : playlist.name;
    playlist.url = req.body.url ? req.body.url : playlist.url;

    playlist.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the playlist', err)
        res.json({
          error: 'There was an error saving the playlist'
        });
      }
      res.status(200); // Saved
      res.json(playlist);
    });
  });
};

/**
 * Deletes a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistDelete = (req, res) => {
  // get playlist by id

  Playlist.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.status(422);
      console.log('error while deleting the playlist', err)
      res.json({
        error: 'There was an error deleting the playlist'
      });
    }
    res.status(204); //No content
    res.json({});
  });

};

module.exports = {
  playlistGet,
  playlistGetAll,
  playlistPost,
  playlistPostVideo,
  playlistPatch,
  playlistDelete
}
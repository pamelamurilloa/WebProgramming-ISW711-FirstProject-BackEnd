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
  playlist.kids  = [];
  playlist.videos  = [];

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
    console.log('error while saving the playlist', err)
    res.json({
      error: 'No valid data provided for playlist'
    });
  }
};

const playlistPostVideo = async (req, res) => {

  let videoName = req.body.name;
  let videoUrl = req.body.url;

  if (videoName && videoUrl) {
    try {
      const playlist = await Playlist.findById(req.params.id);

      playlist.videos.push( {name: videoName, url: videoUrl} );
    
      await playlist.save();

      res.status(201); // Created
      res.header({
        'location': `/tubekids/playlists/?id=${playlist._id}`
      });

      res.json(playlist);

    } catch (err) {
      res.status(422);
      console.error(err);
      res.json({
        error: 'No valid data provided for playlist'
      });
    }
  }
  
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
 * Updates a video in a playlist
 *
 * @param {*} req
 * @param {*} res
 */

const playlistPatchVideo = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    playlist.videos = playlist.videos.filter(function(video) {
      if (video._id == req.params.videoId) {
        video.name = req.body.name ? req.body.name : video.name;
        video.url = req.body.url ? req.body.url : video.url;
      }
      return video;
    });

    await playlist.save();

    res.status(200);
    res.json(playlist);

  } catch (err) {
    res.status(422);
    console.log('error while updating the video', err);
    res.json({error: 'There was an error updating the video'});
  }
};

/**
 * Deletes a playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistDelete = (req, res) => {

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

/**
 * Deletes a video from playlist
 *
 * @param {*} req
 * @param {*} res
 */
const playlistDeleteVideo =  async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);

    playlist.videos = playlist.videos.filter(function(video) {
      return video._id != req.params.videoId;
    });

    await playlist.save();

    res.status(200);
    res.json(playlist);

  } catch (err) {
    res.status(422);
    console.log('error while deleting the video', err);
    res.json({error: 'There was an error deleting the video'});
  }
};

module.exports = {
  playlistGet,
  playlistGetAll,
  playlistPost,
  playlistPostVideo,
  playlistPatch,
  playlistPatchVideo,
  playlistDelete,
  playlistDeleteVideo
}
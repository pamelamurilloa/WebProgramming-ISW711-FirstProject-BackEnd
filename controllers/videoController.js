const Video = require("../models/videoModel");

/**
 * Creates a video
 *
 * @param {*} req
 * @param {*} res
 */


const videoPost = async (req, res) => {
  let video = new Video();

  video.name = req.body.name;
  video.url  = req.body.url;

  if (video.name && video.url) {
    await video.save()
      .then(data => {
        res.status(201); // Created
        res.header({
          'location': `/tubekids/videos/?id=${data.id}`
        });
        res.json(data);
      })
      .catch( err => {
        res.status(422);
        console.log('error while saving the video', err);
        res.json({
          error: 'There was an error saving the video'
        });
      });

  } else {
    res.status(422);
    console.log('error while saving the video')
    res.json({
      error: 'No valid data provided for video'
    });
  }
};

/**
 * Get all videos
 *
 * @param {*} req
 * @param {*} res
 */

const videoGet = (req, res) => {
    Video.findById(req.params.id)
      .then( (video) => {
        res.json(video);
      })
      .catch(err => {
        res.status(404);
        console.log('error while trying to find the video', err)
        res.json({ error: "Video doesnt exist" })
      });
};

const videoGetAll = (req, res) => {
  Video.find()
    .then( videos => {
      res.json(videos);
    })
    .catch(err => {
      res.status(422);
      res.json({ "error": err });
    });
};

/**
 * Updates a video
 *
 * @param {*} req
 * @param {*} res
 */

const videoPatch = (req, res) => {
  Video.findById(req.params.id, function (err, video) {
    if (err) {
      res.status(404);
      console.log('error while trying to find the video', err)
      res.json({ error: "Video doesnt exist" })
    }

    video.name = req.body.name ? req.body.name : video.name;
    video.url = req.body.url ? req.body.url : video.url;

    video.save(function (err) {
      if (err) {
        res.status(422);
        console.log('error while saving the video', err)
        res.json({
          error: 'There was an error saving the video'
        });
      }
      res.status(200); // Saved
      res.json(video);
    });
  });
};

/**
 * Deletes a video
 *
 * @param {*} req
 * @param {*} res
 */
 const videoDelete = (req, res) => {
  // get video by id
    Video.findById(req.params.id, function (err, video) {
      if (err) {
        res.status(404);
        console.log('error while queryting the video', err)
        res.json({ error: "Video doesnt exist" })
      }

      video.deleteOne(function (err) {
        if (err) {
          res.status(422);
          console.log('error while deleting the video', err)
          res.json({
            error: 'There was an error deleting the video'
          });
        }
        res.status(204); //No content
        res.json({});
      });
    });

};

module.exports = {
  videoGet,
  videoGetAll,
  videoPost,
  videoPatch,
  videoDelete
}
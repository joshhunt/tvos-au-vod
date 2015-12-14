import api from '../../api';

export default function (ctx) {
  // We've passed the data, as JSON, as the querystring. This might not be very good
  const programData = JSON.parse(ctx.querystring);

  // Create a video and set some metadata
  const video = new MediaItem('video', programData.streamUrl);
  video.artworkImageURL = programData.thumbnail;

  if (programData.title) {
    video.subtitle = programData.seriesTitle;
    video.title = programData.title;
  } else {
    video.title = programData.title
  }

  // Create a playlist with the video. Even though we only have one video
  // you always need a playlist
  const playlist = new Playlist();
  playlist.push(video);

  // And finally, create the player and present it to play the video
  const player = new Player();
  player.playlist = playlist;
  player.present();
}

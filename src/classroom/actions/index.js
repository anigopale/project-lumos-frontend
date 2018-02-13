import resources from './json/resources.json';

export const FETCH_RESOURCE = 'fetch-resource';
export const FETCH_PLAYLIST = 'fetch-playlist';

export function fetchResource(resource_id) {
  return function(dispatch) {
    resources.items.map(resource => {
      if(resource.id === resource_id) {
        dispatch({
          type: FETCH_RESOURCE,
          payload: resource
        })
      }
    })
  }
}

export function fetchPlaylist(playlist_id, page_token) {
  if(!page_token) {
    console.log("not page token", page_token);
    page_token = "";
  }
  return function(dispatch) {
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${playlist_id}&part=snippet,contentDetails&key=AIzaSyDJ2uIGO_wec2F040cacRqn08SP0VWbtIg&pageToken=${page_token}`)
    .then(response => {
      response.json().then(data => {
        console.log(data);
        if(!data.prevPageToken) {
          data.prevPageToken = "0";
        }
        if(!data.nextPageToken) {
          data.nextPageToken = "0";
        }

        dispatch({
          type: FETCH_PLAYLIST,
          payload: {
            playlist_id,
            previous_page: data.prevPageToken,
            next_page: data.nextPageToken,
            current_page: page_token,
            videos: data.items,
          }
        })
      })
    })
  }
}

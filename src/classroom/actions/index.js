import resources from './json/resources.json';

export const FETCH_RESOURCE = 'fetch-resource';

export function fetchResource(resource_id) {
  return function(dispatch) {
    resources.items.map(resource => {
      if(resource.id === resource_id) {
        console.log('inside action creator', resource);
        dispatch({
          type: FETCH_RESOURCE,
          payload: resource
        })
      }
    })
  }
}

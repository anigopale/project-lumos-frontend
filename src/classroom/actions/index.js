import resources from './json/resources.json';
import resources_new from './json/resources_new.json';

export const FETCH_RESOURCE = 'fetch-resource';

export function fetchResource(resource_id) {
  return function(dispatch) {
    resources_new.items.map(resource => {
      if(resource.id == resource_id) {
        dispatch({
          type: FETCH_RESOURCE,
          payload: resource
        })
      }
    })
  }
}

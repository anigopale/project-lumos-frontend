import resources from './json/resources.json';
import resources_new from './json/resources_new.json';

export const FETCH_RESOURCE = 'fetch-resource';

const url = 'https://private-eb08cd-plbackendmockup.apiary-mock.com/api/v1/courses';

export function fetchResource(resource_id) {
  return function(dispatch) {
    fetch(`${url}/${resource_id}`)
    .then(response => {
      response.json()
      .then(data => {
        dispatch({
          type: FETCH_RESOURCE,
          payload: data[0]
        });
      })
    })
    // resources_new.items.map(resource => {
    //   if(resource.id == resource_id) {
    //     dispatch({
    //       type: FETCH_RESOURCE,
    //       payload: resource
    //     })
    //   }
    // })
  }
}

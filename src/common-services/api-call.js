
// apiCall returns promise, if status code !=200, function return custom error object
export function apiCall(api_url, request_type) {
  return fetch(api_url, {
    method: request_type
  })
  .then(response => {
    if(response.status === 200)
      return { response };
    else
      return { error: 'error' };
  })
  .catch(error => {
    return { error };
  })
}

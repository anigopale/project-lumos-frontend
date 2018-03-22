
// apiCall returns promise, if status code !=200, function return custom error object
export function apiCall(api_url, request_type, data) {
  if(request_type === 'post') {
    return fetch(api_url, {
      method: request_type,
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(response.status === 201)
        return { response };
      else
        return { error: 'error' };
    })
    .catch(error => {
      return { error };
    })
  }


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

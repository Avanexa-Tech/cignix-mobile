import { baseUrl } from './base_url';
export const api = {
  header: () => {
    return {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  },
  // GET Method
  getMethod: (url, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return fetch(baseUrl + url, {
      method: 'GET',
      headers: headers,
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          return data;
        }
      })
      .catch(err => Promise.reject(err));
  },

  // POST Method
  postMethod: (url, data, accessToken) => {
    const headers = {
      ...api.header(),
    };
    console.log('token ===== ', accessToken);
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    console.log('Check', headers);
    return fetch(baseUrl + url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(datas => {
        console.log("datas ------------- :", datas);

        if (datas) {
          return datas;
        }
      })
      .catch(err => Promise.resolve(err));
  },
  // PUT Method
  putMethod: (url, data, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if(data instanceof FormData){
      headers['Content-Type'] = 'multipart/form-data'
    }
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return fetch(baseUrl + url, {
      method: 'PUT',
      headers: headers,
      body: data, 
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          return data;
        }
      })
      .catch(err => {
        console.log(err);
        Promise.reject(err)
      }
    );
  },
  // PUT Method in NOTIFICATION
  putMethodNotification: (url, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return fetch(baseUrl + url, {
      method: 'PUT',
      headers: headers,
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          return data;
        }
      })
      .catch(err => Promise.reject(err));
  },

  // DELETE Method
  deleteMethod: (url, accessToken) => {
    const headers = {
      ...api.header(),
    };
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    return fetch(baseUrl + url, {
      method: 'DELETE',
      headers: headers,
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          return data;
        }
      })
      .catch(err => Promise.reject(err));
  },
};

import store from '@/store';
class UserService {
  handleResponse(response) {
    if (!response.ok) {
      const error =  new Error("HTTP status " + response.status);
      error.status = response.status;
      throw error;
    }
    return response.json();
  }

  get(id) {
    return new Promise((resolve, reject) => {
      if (!store.state.authentication.user || !store.state.authentication.user.token) {
        const error = new Error('No token available.');
        error.status = 401;
        return reject(error);
      }
      const token = store.state.authentication.user.token;
      fetch(`${process.env.VUE_APP_API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => this.handleResponse(response))
        .then((userResponse) => resolve(userResponse))
        .catch((error) => {
          console.error(error);
          return reject(error);
        });
    });
  }

  add(link) {
    return new Promise((resolve, reject) => {
      if (!store.state.authentication.user || !store.state.authentication.user.token) {
        const error = new Error('No token available.');
        error.status = 401;
        return reject(error);
      }
      const token = store.state.authentication.user.token;
      fetch(`${process.env.VUE_APP_API_URL}/bookmarks`, {
        method: 'POST',
        body: JSON.stringify(link),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => this.handleResponse(response))
        .then((linkResponse) => resolve(linkResponse))
        .catch((error) => {
          console.error(error);
          return reject(error);
        });
    });
  }

  remove(linkId) {
    return new Promise((resolve, reject) => {
      if (!store.state.authentication.user || !store.state.authentication.user.token) {
        const error = new Error('No token available.');
        error.status = 401;
        return reject(error);
      }
      const token = store.state.authentication.user.token;
      fetch(`${process.env.VUE_APP_API_URL}/bookmarks/${linkId}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => this.handleResponse(response))
        .then((linkResponse) => resolve(linkResponse))
        .catch((error) => {
          console.error(error);
          return reject(error);
        });
    });
  }

  login(user) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.VUE_APP_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((response) => this.handleResponse(response))
        .then((userResponse) => {
          if (userResponse.token) {
            localStorage.setItem('user', JSON.stringify(userResponse));
            return resolve(userResponse);
          }
          return reject(new Error('No token received'));
        })
        .catch((error) => {
          console.error(error);
          return reject(error);
        });
    });
  }

  signup(user) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.VUE_APP_API_URL}/signup`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((response) => this.handleResponse(response))
        .then((json) => {
          console.log(json);
          return resolve(json);
        })
        .catch((error) => {
          console.error(error);
          return reject(error);
        });
    });
  }

  logout() {
    localStorage.removeItem('user');
  }
}

export const userService = new UserService();

class UserService {
  get(id) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.VUE_APP_API_URL}/users/${id}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
        .then((response) => response.json())
        .then((userResponse) => resolve(userResponse))
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
        .then((response) => response.json())
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
        .then((response) => response.json())
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

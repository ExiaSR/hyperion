import { Container } from 'unstated';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import * as API from '../api';

class AuthStore extends Container {
  state = {
    user: null,
  };

  get user() {
    let { user } = this.state;
    if (window.localStorage.getItem('basic_auth') && user) {
      return user;
    } else if (window.localStorage.getItem('basic_auth')) {
      // let cachedUserInfo = window.localStorage.getItem('user_info');
      // if (cachedUserInfo) user = JSON.parse(cachedUserInfo);
      return user ? user : { user: 'placeholder' };
    } else return null;
  }

  // Currently login user's primary key
  get userPk() {
    return this.user && this.user.id
      ? this.user.id.substr(this.user.id.lastIndexOf('/') + 1)
      : null;
  }

  getUserInfo = async (cached = true) => {
    if (window.localStorage.getItem('basic_auth') && this.state.user) {
      if (cached) return this.state.user;
      let { user } = await API.Auth.getCurrentUser();
      user = camelcaseKeys(user);
      window.localStorage.setItem('user_info', JSON.stringify(user));
      this.setState({ user });
      return user;
    } else if (window.localStorage.getItem('basic_auth')) {
      let { user } = await API.Auth.getCurrentUser();
      user = camelcaseKeys(user);
      window.localStorage.setItem('user_info', JSON.stringify(user));
      this.setState({ user });
      return user;
    } else {
      let error = new Error('Failed to get user info');
      Object.assign(error, { response: { status: 401 } });
      throw error;
    }
  };

  signup = async (username, email, password) => {
    await API.Auth.signup(username, email, password);
    window.localStorage.setItem(
      'basic_auth',
      window.btoa(`${username}:${password}`)
    );
  };

  login = async (username, password) => {
    try {
      let { user } = await API.Auth.login(username, password);
      window.localStorage.setItem(
        'basic_auth',
        window.btoa(`${username}:${password}`)
      );
      user = camelcaseKeys(user);
      window.localStorage.setItem('user_info', JSON.stringify(user));
      this.setState({ user });
    } catch (err) {
      console.error(err.response);
    }
  };

  logout = async () => {
    this.setState({ user: null });
    window.localStorage.removeItem('basic_auth');
    window.localStorage.removeItem('user_info');
  };

  /**
   * Create a new patch
   * @param {object} author - An author object
   */
  updateProfile = async author => {
    await API.Author.updateProfile(snakecaseKeys(author));
    this.getUserInfo(false); // async re-fetch user profile without keeping the model open
  };
}

export default AuthStore;

import axios from 'axios';

export const baseUrl = 'http://192.168.1.74:8084';

const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/auth/login`, {
      user_name: username,
      password: password,
    });
    return {
      token: response.data.message.token,
      // email: response.data.data.email,
      // username: response.data.data.username,
    };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.debug('axios request cancelled', error.message);
    } else if (error.response) {
      res = error.response;
      console.debug('Status:', res.status);
      console.debug('Data:', res.data);
      console.debug('Headers:', res.headers);
      throw new Error(res.data.message);
    } else {
      console.debug('Message:etahoki??', error.message);
      throw new Error(error.message);
    }
  }
};

const signUp = async values => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, values);
    if (response.status == 200) {
      return {
        token: response.data.message.token,
      };
    }
  } catch (error) {
    if (error.response) {
      res = error.response;
      console.debug('Status: ', res.status);
      console.debug('Data: ', res.data);
      console.debug('Headers: ', res.headers);
      throw new Error(res.data.message);
    } else {
      console.log(error, 'authservice');
      throw new Error(error.message);
    }
  }
};

export const authService = {
  signIn,
  signUp,
};

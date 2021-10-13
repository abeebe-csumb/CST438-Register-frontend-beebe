import React, { Component } from 'react';
import {SERVER_URL} from '../constants.js'
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import '../Login.css';

class Login extends Component {
 
  componentDidMount() {
    this.fetchUser();
  }
 
  fetchUser = () => {
    const token = Cookies.get('XSRF-TOKEN');
    fetch(SERVER_URL + '/user', 
      {  
        method: 'GET', redirect: 'follow',
        headers: { 'X-XSRF-TOKEN': token }, 
        credentials: 'include'
      })
    .catch(err => {
      console.error(err);
      } );
    }
  
  render() {
    return (
      <main class="form-signin bg-dark">
        <h3 class="mb-3 p-3 text-light">Welcome to the Registration Portal</h3>
        <form>
          <a class="btn btn-primary mb-4" href={SERVER_URL + '/oauth2/authorization/google'}>Sign in with Google</a>
          <button class="btn btn-light mb-4" href='#'>Sign in as Admin</button>
        </form>
      </main>
    ); 
  }
}

export default Login;
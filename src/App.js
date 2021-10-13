import './App.css';
import SchedList from './components/SchedList';
import Semester from './components/Semester';
import Login from './components/Login';
import { SERVER_URL } from './constants.js'
import Cookies from 'js-cookie';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { is_admin: false };
    this.fetchRole();
  }

  fetchRole = () => {
    console.log("SchedList.fetchRole");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(SERVER_URL + '/admin',
      {
        method: 'GET',
        headers: { 'X-XSRF-TOKEN': token },
        credentials: 'include'
      }).then((response) => {
        return response.json();
      })
      .then((responseData) => {
        var x = false;
        if(responseData != null) {
          x = true;
        }
        this.setState({
          is_admin: x
        })
        return;
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route
              exact path='/semester'
              component={() => <Semester is_admin={this.state.is_admin} />} />
            <Route 
              path='/schedule' component={SchedList} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
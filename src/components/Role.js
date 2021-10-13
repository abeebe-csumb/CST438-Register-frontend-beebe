import React, { Component } from 'react';
import { SERVER_URL } from '../constants.js'
import Cookies from 'js-cookie';

class Role extends Component {

    constructor(props) {
        super(props);
        this.state = { role: '', is_admin: 0 };
    }

    componentDidMount() {
        this.fetchRole();
    }

    fetchRole = () => {
        const token = Cookies.get('XSRF-TOKEN');
        fetch(SERVER_URL + '/role',
            {
                method: 'GET',
                headers: { 'X-XSRF-TOKEN': token },
                credentials: 'include'
            }).then((response) => {
                console.log("FETCH RESP:" + response);
                return response.json();
            })
            .then((responseData) => {
                this.setState({
                    role: responseData.role,
                    is_admin: responseData.is_admin
                })
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const role = this.state.admin === 0 ? this.state.role : "ADMIN";
        return (
            <div name="role" value={role}>Logged in as {role}</div>
        );
    }
}

export default Role;
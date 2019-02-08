import React from 'react';
import {Container, Icon, Image, Menu} from 'semantic-ui-react';
import Clock from "../components/Clock";
import AuthSingleton from "../components/AuthService";
import logo from "../assets/logo.png";
import PropTypes from "prop-types";

const Auth = AuthSingleton.getInstance();

export default class Navigation extends React.Component {
    renderUserItem() {
        if (Auth.loggedIn()) {
            return (
                <Menu.Item onClick={() => {
                    Auth.removeToken();
                    this.props.history.push("/login");
                }}><Icon name='user'/>Logout</Menu.Item>
            );
        }
    }

    renderUsersItem() {
        if (this.props.user.is_super_admin) {
            return (
                <Menu.Item active={window.location.pathname === '/users'} onClick={() => {
                    this.props.history.push("/users")
                }}><strong>Users</strong></Menu.Item>
            );
        }
    }

    renderSettingsItem() {
        if (this.props.user.is_super_admin) {
            return (
                <Menu.Item active={window.location.pathname === '/settings'} onClick={() => {
                    this.props.history.push("/settings")
                }}><strong>Settings</strong></Menu.Item>
            );
        }
    }

    render() {
        return (
            <Menu fixed='top' size='tiny' inverted>
                <Container>
                    <Menu.Item><Image src={logo} spaced='right'
                                      style={{position: 'absolute', right: 0}}/></Menu.Item>
                    <Menu.Item active={window.location.pathname === '/'} onClick={() => {
                        this.props.history.push("/")
                    }}><strong>Home</strong></Menu.Item>
                    {this.renderUsersItem()}
                    {this.renderSettingsItem()}
                    <Menu.Menu position='right'>
                        <Menu.Item><Clock format='dddd, YY/MM/DD, HH:mm:ss'/></Menu.Item>
                        {this.renderUserItem()}
                    </Menu.Menu>
                </Container>
            </Menu>
        );
    }
}

Navigation.propTypes = {
    history: PropTypes.object.isRequired,
    user: PropTypes.shape({
        is_super_admin: PropTypes.bool.isRequired
    }),
};

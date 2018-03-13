import React, { Component } from 'react';
import {showAlert} from '../alerts.js';
import '../../css/login.css';
import Form from './';

export default class LoginForm extends Component {

    checkEmptyForm = () => {
        if(document.getElementById('login').value === "") {
            showAlert("Введите логин!");
            return false;
        } else if (document.getElementById('password').value === "") {
            showAlert("Введите пароль!");
            return false;
        } else {
            return true;
        }
    }

    sendLoginRequest = () => {
        let me = this;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://test.susu-online.ru:8080/api/v1/user/login/univeris/web', false);
        xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
        let body = 'login=' + encodeURIComponent(document.getElementById('login').value) +
        '&password=' + encodeURIComponent(document.getElementById('password').value);
        xhr.onerror = function() {
            showAlert('CORS...');
        }
        xhr.send(body);
        if(xhr.status === 200) {
            sessionStorage.setItem('token', JSON.parse(xhr.response).result.access_token);
            me.setState({autorization: true});
        } else if (xhr.status === 500) {
            showAlert("Неверный логин или пароль!");
        }
    }

    login = () => {
        if(this.checkEmptyForm()) {
            this.sendLoginRequest();
        }
    }

    loginCheck () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test.susu-online.ru:8080/api/v1/faculties', false);
        xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
        xhr.send();
        if(xhr.status === 200) {
            window.log = true;
        } else if (xhr.status === 401) {
            window.log = false;
        } else if (sessionStorage.getItem('token') === "") {
            window.log = false;
        }
        console.log(sessionStorage.getItem('location'));
        console.log(window.log);
    }

    render () {
        this.loginCheck();
        if (window.log === false) {
            return (
                <div className="LoginForm" id="LoginForm">
                    <div className="LoginFormHeader">
                        <h1>Вход</h1>
                    </div>
                    <div className="LoginFormBody">
                        <div className="LoginFormInputs">
                            <label htmlFor="login">Логин</label>
                            <input type="login" className="form-control" id="login" placeholder="Введите логин" />
                        </div>
                        <div className="LoginFormInputs">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" className="form-control" id="password" placeholder="Введите пароль" />
                        </div>
                        <button className="btn LoginBtn" onClick={this.login}>Войти</button>
                    </div>
                </div>
            )
        } else {
            sessionStorage.setItem('location', 'NotificationForm');
            return (<Form name='NotificationForm' />);
        }
    }
}
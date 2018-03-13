import React, { Component } from 'react';
import NotificationForm from './notifications/notification';
import NewsForm from './news/newsList';
import LoginForm from './login';

export default class Form extends Component {

    constructor(props) {
        super(props);
    }

    IndexloginCheck () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test.susu-online.ru:8080/api/v1/faculties', false);
        xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
        xhr.send();
        if(xhr.status === 200) {
            window.autorization = true;
        } else if (xhr.status === 401) {
            window.autorization = false;
        } else if (sessionStorage.getItem('token') === "") {
            window.autorization = false;
        }
    }

    render () {
        this.IndexloginCheck();
        if (this.props.name === 'LoginForm' || window.autorization === false) {
            return (
                <LoginForm />
            )
        } else if (this.props.name === 'NotificationForm' || this.props.name === null) {
            return (
                <NotificationForm />
            )
        } else if (this.props.name === 'NewsForm') {
            return (
                <NewsForm />
            )
        } else {
            return (
                <div>Какая то ошибка</div>
            )
        }
    }
}
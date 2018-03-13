import React, { Component } from 'react';
import '../css/mainPanel.css';
import Form from './forms';


class MainPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: sessionStorage.getItem('location'),
            autorization: ''
        };
    }

    LogOut () {
        sessionStorage.setItem('token', "");
        this.setState({location: 'LoginForm'});
        sessionStorage.setItem('location', 'LoginForm');
    }

    setNotification () {
        this.setState({location: 'NotificationForm'});
        sessionStorage.setItem('location', 'NotificationForm');
    }

    setNews () {
        this.setState({location: 'NewsForm'});
        sessionStorage.setItem('location', 'NewsForm');
    }

    render () {
        return (
            <div>
                <div className="MainPanel">
                    <p className="MainP">Панель администратора ЮУрГУ онлайн</p>
                    <p className="MainActiveP" onClick={this.setNotification.bind(this)}>Рассылка уведомлений</p>
                    <p className="MainActiveP" onClick={this.setNews.bind(this)}>Новости</p>
                    <p className="MainActiveP">Вакансии</p>
                    <p className="MainActiveP">Статистика</p>
                    <p className="MainActiveP" onClick={this.LogOut.bind(this)}>Выход</p>
                </div>
                <div id="forms">
                    <Form name={sessionStorage.getItem('location')} />
                </div>
            </div>
        )
    }
}

export default MainPanel;
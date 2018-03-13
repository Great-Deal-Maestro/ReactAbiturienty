import React, { Component } from 'react';
import {showAlert} from '../../alerts.js';
import '../../../css/notification.css';
import Rule from './rules';

export default class NotificationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rules: []
        }
        window.RulesCount = 0;
    }

    addRule () {
        if(window.RulesCount < 10) {
            var arr = this.state.rules;
            let i = arr.length;
            arr.push(<Rule key={i} index={i} deleteRule={this.deleteRule.bind(this)} />);
            this.setState ({rules: arr});
            window.RulesCount++;
        } else {
            showAlert('Допустимо максимум 10 правил!');
        }
    }

    deleteRule (i) {
        var arr = this.state.rules;
        arr[i] = '';
        this.setState ({rules: arr});
        window.RulesCount--;
    }

    eachRule (item, i) {
        return (item);
    }

    SendNotification () {
        showAlert("Отправлено!");
    }

    render() {
        return (
            <div className="NotificationForm" id="NotificationForm">
                <div className="NotificationFormHeader">
                    <h1>Рассылка уведомлений</h1>
                </div>
                <div className="NotificationFormBody">
                    <input type="text" className="form-control NotificationFormInputs" id="Notification" placeholder="Заголовок" />
                    <textarea className="form-control NotificationFormInputs" rows="5" id="password" placeholder="Текст уведомления" />
                    <div className="RuleHeader">Правила {window.RulesCount}/10</div>
                    <div className="RuleAdd" onClick={this.addRule.bind(this)}>+</div>
                    <div className="RulesContainer">
                        {this.state.rules.map (this.eachRule.bind(this))}
                    </div>
                    <button className="btn NotificationBtn" onClick={this.SendNotification}>Отправить</button>
                </div>
            </div>
        )
    }
}
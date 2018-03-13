import React, { Component } from 'react';
import Lists from '../notifications/lists';
import '../../../css/rules.css';

export default class AddNewsRule extends Component {
    render() {
        return (
            <div className="RulesForm" id="RulesForm">
            
                <Lists text='Все факультеты' index={this.props.index} />
                <Lists text='Все курсы' index={this.props.index} />
                <Lists text='Все группы' index={this.props.index} />

            </div>
        )
    }
}
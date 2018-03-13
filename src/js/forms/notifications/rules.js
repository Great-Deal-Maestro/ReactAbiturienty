import React, { Component } from 'react';
import '../../../css/rules.css';
import Lists from './lists';

export default class Rule extends Component {

    deleteRule () {
        this.props.deleteRule(this.props.index);
    }

    render () {
        return (
            <div className="RulesForm" id="RulesForm">
                <button className="closeBtn" onClick={this.deleteRule.bind(this)}>X</button>

                <Lists text='Все факультеты' index={this.props.index} />
                <Lists text='Все курсы' index={this.props.index} />
                <Lists text='Все группы' index={this.props.index} />

            </div>
        )
    }
}
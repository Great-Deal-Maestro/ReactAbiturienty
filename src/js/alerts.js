import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';

function showAlert (text) {
    ReactDOM.render(
        <Alert text={text} />, 
        document.getElementById('Alerts')
    );
}

export default class Alert extends Component {

    deleteAlert = () => {
        ReactDOM.unmountComponentAtNode(document.getElementById('Alerts'));
    }

    render () {
        setTimeout(this.deleteAlert, 3000);
        return (
            <div id="alert">
                <button className="closeBtn" onClick={this.deleteAlert}>X</button>
                <strong>{this.props.text}</strong>
            </div>
        )
    }
}

export {showAlert}
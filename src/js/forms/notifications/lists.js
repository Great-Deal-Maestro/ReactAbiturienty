import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {showAlert} from '../../alerts.js';
import FacultiesStrings from './facultiesStrings';
import Form from '../';
import '../../../css/rules.css';
import '../../../css/index.css';
import '../../../css/lists.css';

export default class Lists extends Component {

    constructor(props) {
        super(props)
        let index = this.props.index;
        sessionStorage.setItem(index+'facultCount', '');
        sessionStorage.setItem(index+'courseCount', '');
    }

    takegroups () {
        let index = this.props.index;
        if(sessionStorage.getItem(index+'courseCount').length === 1) {
            window.facultiesArray.map(function (item, i) {
                if (item.name === document.getElementById(index+'facultFinalChoice').innerHTML.slice(0, -2))
                {
                    window.chooseFacId = item.id;
                }
                return 0;
            });
            if (sessionStorage.getItem(index+'grouplistShow') === 'false') {
                let xhr = new XMLHttpRequest();
                xhr.open('GET', 'http://test.susu-online.ru:8080/api/v1/groups/'+window.chooseFacId, true);
                xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
                
                xhr.onerror = function() {
                    showAlert('Ошибка ' + this.statusText);
                }

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if(xhr.status === 200) {
                            sessionStorage.setItem(index+'grouplistShow', 'true');
                            ReactDOM.render (
                                <FacultiesStrings array={JSON.parse(xhr.response).result} name='groups' index={index} />,
                                document.getElementById(index+"groupsList")
                            );
                            document.getElementById(index+'groupsList').style.display = 'inline-block';
                        } else if (xhr.status === 401) {
                            ReactDOM.render(
                                <Form name="LoginForm" />,
                                document.getElementById('forms')
                            )
                            showAlert("Требуется авторизация!");
                        }
                    }
                };
                xhr.send();
            } else {
                document.getElementById(index+'groupsList').style.display = 'none';
                ReactDOM.unmountComponentAtNode(document.getElementById(index+'groupsList'));
                sessionStorage.setItem(index+'groupsList', 'false');
                sessionStorage.setItem(index+'grouplistShow', 'false');
            }
        }
    }

    takecourses () {
        let index = this.props.index;
        if (sessionStorage.getItem(index+'facultCount').length === 1) {
            if (sessionStorage.getItem(index+'courselistShow') === 'false') {
                sessionStorage.setItem(index+'courselistShow', 'true');
                ReactDOM.render (
                    <FacultiesStrings array={[1,2,3,4,5,6]} name='courses' index={index} />,
                    document.getElementById(this.props.index+"coursesList")
                );
                document.getElementById(this.props.index+'coursesList').style.display = 'inline-block';
            } else {
                document.getElementById(this.props.index+'coursesList').style.display = 'none';
                ReactDOM.unmountComponentAtNode(document.getElementById(this.props.index+'facultiesList'));
                sessionStorage.setItem(index+'courselistShow', 'false');
            }
        }
    }

    takefaculties () {
        let index = this.props.index;
        if (sessionStorage.getItem(index+'facultlistShow') === 'false') {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://test.susu-online.ru:8080/api/v1/faculties', true);
            xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            
            xhr.onerror = function() {
                showAlert('CORS');
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if(xhr.status === 200) {
                        sessionStorage.setItem(index+'facultlistShow', 'true');
                        window.facultiesArray = JSON.parse(xhr.response).result;
                        ReactDOM.render (
                            <FacultiesStrings array={JSON.parse(xhr.response).result} name='faculties' index={index} />,
                            document.getElementById(index+"facultiesList")
                        );
                        document.getElementById(index+'facultiesList').style.display = 'inline-block';
                    } else if (xhr.status === 401) {
                        ReactDOM.render(
                            <Form name="LoginForm" />,
                            document.getElementById('forms')
                        )
                        showAlert("Требуется авторизация!");
                    }
                }
            };
            xhr.send();
        } else {
            document.getElementById(index+'facultiesList').style.display = 'none';
            ReactDOM.unmountComponentAtNode(document.getElementById(index+'facultiesList'));
            sessionStorage.setItem(index+'facultlistShow', 'false');
        }
    }

    render () {
        let index = this.props.index;
        sessionStorage.setItem(index+'facultlistShow', 'false');
        sessionStorage.setItem(index+'courselistShow', 'false');
        sessionStorage.setItem(index+'grouplistShow', 'false');
        if (this.props.text === 'Все факультеты') {
            return (
                <div id="facultContainer" className="container">
                    <div onClick={this.takefaculties.bind(this)} id={this.props.index+'facultFinalChoice'} className="ruleChoice">{this.props.text}</div>
                    <div id={this.props.index+"facultiesList"} className="facultiesList"></div>
                </div>
            )
        } else if (this.props.text === 'Все курсы') {
            return (
                <div id="courseContainer" className="container">
                    <p onClick={this.takecourses.bind(this)} id={this.props.index+'courseFinalChoice'} className="ruleChoice">{this.props.text}</p>
                    <div id={this.props.index+"coursesList"} className="coursesList"></div>
                </div>
            )
        } else if (this.props.text === 'Все группы') {
            return (
                <div id="groupContainer" className="container">
                    <p onClick={this.takegroups.bind(this)} id={this.props.index+'groupFinalChoice'} className="ruleChoice">{this.props.text}</p>
                    <div id={this.props.index+"groupsList"} className="groupsList"></div>
                </div>
            )
        }
    }
}
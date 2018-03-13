import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {showAlert} from '../../alerts.js';
import '../../../css/news.css';
import Form from '../';
import News from './news';
import AddNewsForm from './addNewsForm';
import ChangeNewsForm from './changeNewsForm';

export default class NewsList extends Component {

    constructor(props) {
        super(props);
        window.NewsArr = [];
        window.newsRequestResult = [];
        window.changeNews = {};
        this.sendNewsRequest();
        this.state = {
            news: window.NewsArr,
            newsRequestResult: window.newsRequestResult,
            changeNews: window.changeNews,
            sost: 'norm'
        }
    }

    changeNews (id) {
        this.sendNewsRequest();
        this.state.newsRequestResult.map(function (item, i) {
            if (item.id === id) {
                window.changeNews = {
                    title: item.title,
                    feed_group_id: item.feed_group_id,
                    publish_at: item.publish_at,
                    body: item.body,
                    link: item.link,
                    id: item.id,
                    file: item.img
                }
            }
            return 0;
        });
        this.setState({changeNews: window.changeNews});
        this.setState({sost: 'change'});
    }

    sendNewsRequest () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://test.susu-online.ru:8080/api/v1/feed', false);
        xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
        xhr.onerror = function() {
            showAlert('CORS');
        }
        xhr.send();
        if (xhr.status === 401) {
            setTimeout(
                function () {
                    ReactDOM.render(
                        <Form name="LoginForm" />,
                        document.getElementById('forms')
                    )
                    showAlert("Требуется авторизация!");
                },1)
        } else {
            window.NewsArr = [];
            window.newsRequestResult = JSON.parse(xhr.response).result.feed;
            JSON.parse(xhr.response).result.feed.map((item, i) => {
                let theDate = new Date(item.publish_at * 1000);
                theDate = theDate.toLocaleString();
                window.NewsArr.push(
                    <News title={item.title} date={theDate} link={item.link} key={i} index={item.id} changeNews={this.changeNews.bind(this)} deleteNews={this.deleteNews.bind(this)} />
                );
                return 0;
            });
            this.setState({newsRequestResult: window.newsRequestResult});
            this.setState({news: window.NewsArr});
        }
    }

    deleteNews (id, title) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://test.susu-online.ru:8080/api/v1/feed/'+id, false);
        xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
        xhr.onerror = function() {
            showAlert('CORS');
        }
        xhr.send();
        if (xhr.status === 401) {
            setTimeout(
                function () {
                    ReactDOM.render(
                        <Form name="LoginForm" />,
                        document.getElementById('forms')
                    )
                    showAlert("Требуется авторизация!");
                },1)
        } else {
            showAlert('Удалена новость '+title);
        }
        this.sendNewsRequest();
    }

    newsTypeConvert (typeText) {
        switch (typeText) {
            case 'Общее': return 1;
            case 'О науке': return 2;
            case 'Спортивные': return 3;
            case 'Общественная деятельность': return 4;
            case 'Информационные': return 5;
            default: return 1;
        }
    }

    eachNews (item, i) {
        return (item);
    }

    addNews () {
        this.setState({sost: 'add'});
    }

    checkEmptyForm (form) {
        if (form === 'add') {
            if (document.getElementById('addNewsTitle').value === '') {
                return 'Введите заголовок!';
            } else if (document.getElementById('addNewsText').value === '') {
                return 'Введите текст новости!';
            } else if (document.getElementById('addNewsImg').files.length === 0) {
                return 'Приложите файл!';
            } else {
                return '';
            }
        } else {
            if (document.getElementById('ChangeNewsTitle').value === '') {
                return 'Введите заголовок!';
            } else if (document.getElementById('ChangeNewsText').value === '') {
                return 'Введите текст новости!';
            } else if (document.getElementById('ChangeNewsImg').files.length === 0) {
                return 'Приложите файл!';
            } else {
                return '';
            }
        }
        
    }

    addNewsNotificationSend () {
        let faculties = document.getElementById("addNewsfacultFinalChoice").innerHTML;
        let faculties_names = [];
        let faculties_ids = [];
        let courses = document.getElementById("addNewscourseFinalChoice").innerHTML;
        let courses_numbers = [];
        let groups = document.getElementById("addNewsgroupFinalChoice").innerHTML;
        let groups_names = [];
        let groups_ids = [];
        if (faculties !== 'Все факультеты') {
            for (let i = 0; faculties.length > 0; i++) {
                faculties_names.push(faculties.slice(0,faculties.indexOf(';')));
                faculties = faculties.slice(faculties_names[i].length+2);
            }
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://test.susu-online.ru:8080/api/v1/faculties', false);
            xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            xhr.send();
            if(xhr.status === 200) {
                JSON.parse(xhr.response).result.map(function(item,i) {
                    for (let i = 0; i < faculties_names.length; i++) {
                        if (faculties_names[i] === item.name) {
                            faculties_ids.push('"'+item.id+'"');
                        }
                    }
                    return 0;
                });
            } else if (xhr.status === 401) {
                ReactDOM.render(
                    <Form name="LoginForm" />,
                    document.getElementById('forms')
                )
                showAlert("Требуется авторизация!");
            }
        }
        if (courses !== 'Все курсы') {
            for (let i = 0; courses.length > 0; i++) {
                courses_numbers.push(courses.slice(0,courses.indexOf(';')));
                courses = courses.slice(courses_numbers[i].length+2);
            }
        }
        if (groups !== 'Все группы') {
            for (let i = 0; groups.length > 0; i++) {
                groups_names.push(groups.slice(0,groups.indexOf(';')));
                groups = groups.slice(groups_names[i].length+2);
            }
            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://test.susu-online.ru:8080/api/v1/groups/'+faculties_ids[0].slice(1,-1), false);
            xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            xhr.send();
            if(xhr.status === 200) {
                JSON.parse(xhr.response).result.map(function(item,i) {
                    for (let i = 0; i < groups_names.length; i++) {
                        if (groups_names[i] === item.name) {
                            groups_ids.push('"'+item.id+'"');
                        }
                    }
                    return 0;
                });
            } else if (xhr.status === 401) {
                ReactDOM.render(
                    <Form name="LoginForm" />,
                    document.getElementById('forms')
                )
                showAlert("Требуется авторизация!");
            }
        }
        let targets = '[{"faculty_ids":['+faculties_ids+'],"course_numbers":['+courses_numbers+'],"group_ids":['+groups_ids+']}]';
        console.log(targets);
        return targets;
    }

    addNewsApply () {
        if (this.checkEmptyForm('add') === '') {
            let date = new Date();
            date = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()) / 1000;
            let xhr = new XMLHttpRequest();
            let formData = new FormData();
        
            formData.append( 'file', document.getElementById("addNewsImg").files[0]);
            formData.append( 'title', document.getElementById("addNewsTitle").value);
            formData.append( 'body', document.getElementById("addNewsText").value);
            formData.append( 'publish_at', date);
            formData.append( "feed_group_id", this.newsTypeConvert(document.getElementById("addNewsType").value));
            formData.append( "link", document.getElementById("addNewsLink").value);
            if (document.getElementById("addNewsfacultFinalChoice") !== null) {
                formData.append( "targets", this.addNewsNotificationSend());
            }
            xhr.open('POST', 'http://test.susu-online.ru:8080/api/v1/feed', false);
            xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            xhr.send(formData);
            if (xhr.status === 500) {
                showAlert('Некорректный тип файла!');
            } else if (xhr.status === 401) {
                setTimeout(
                    function () {
                        ReactDOM.render(
                            <Form name="LoginForm" />,
                            document.getElementById('forms')
                        )
                        showAlert("Требуется авторизация!");
                    },1)
            } else {
                showAlert('Новость '+document.getElementById("addNewsTitle").value+' добавлена!');
            }
            this.sendNewsRequest();
            this.setState({sost: 'norm'});
        } else {
            showAlert(this.checkEmptyForm('add'));
        }
    }

    changeNewsApply (id) {
        if (this.checkEmptyForm('change') === '') {
            let date = new Date();
            date = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()) / 1000;
            let xhr = new XMLHttpRequest();
            let formData = new FormData();
        
            formData.append( 'file', document.getElementById("ChangeNewsImg").files[0]);
            formData.append( 'title', document.getElementById("ChangeNewsTitle").value);
            formData.append( 'body', document.getElementById("ChangeNewsText").value);
            formData.append( 'publish_at', date);
            formData.append( "feed_group_id", this.newsTypeConvert(document.getElementById("ChangeNewsType").value));
            formData.append( "link", document.getElementById("ChangeNewsLink").value);
            formData.append( "id", id);
            xhr.open('PATCH', 'http://test.susu-online.ru:8080/api/v1/feed', false);
            xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));
            xhr.send(formData);
            if (xhr.status === 500) {
                showAlert('Некорректный тип файла!');
            } else if (xhr.status === 401) {
                setTimeout(
                    function () {
                        ReactDOM.render(
                            <Form name="LoginForm" />,
                            document.getElementById('forms')
                        )
                        showAlert("Требуется авторизация!");
                    },1)
            } else {
                showAlert('Новость '+document.getElementById("ChangeNewsTitle").value+' изменена!');
            }
            this.sendNewsRequest();
            this.setState({sost: 'norm'});
        } else {
            showAlert(this.checkEmptyForm('change'));
        }
    }

    closeNewsForm () {
        this.setState({sost: 'norm'});
    }

    render () {
        if (this.state.sost === 'norm') {
            return (
                <table className="NewsContainer">
                    <tr className="NewsHeader">
                        <td className="NewsHeaderTd">Заголовок</td>
                        <td className="NewsHeaderTd">Опубликовано</td> 
                        <td className="NewsHeaderTd">IOS</td>
                        <td className="NewsHeaderTd">Android</td>
                        <td className="NewsHeaderTd">Общее</td>
                        <td className="NewsHeaderTd">Ссылка</td>
                        <td className="NewsHeaderTd addnewsBtn" title="Добавить новость" onClick={this.addNews.bind(this)}>+</td>
                    </tr>
                    {this.state.news.map (this.eachNews.bind(this))}
                </table>
            )
        } else if (this.state.sost === 'add') {
            return (
                <AddNewsForm closeNewsForm={this.closeNewsForm.bind(this)} addNewsApply={this.addNewsApply.bind(this)} />
            )
        } else if (this.state.sost === 'change') {
            return (
                <ChangeNewsForm title={this.state.changeNews.title} body={this.state.changeNews.body} link={this.state.changeNews.link} feed_group_id={this.state.changeNews.feed_group_id} img={this.state.changeNews.img} index={this.state.changeNews.id} closeNewsForm={this.closeNewsForm.bind(this)} changeNewsApply={this.changeNewsApply.bind(this)} />
            )
        }
    }
}                
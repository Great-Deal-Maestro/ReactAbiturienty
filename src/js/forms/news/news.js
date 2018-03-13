import React, { Component } from 'react';
import '../../../css/news.css';

export default class NewsForm extends Component {

    changeNews () {
        this.props.changeNews(this.props.index);
    }

    deleteNews () {
        this.props.deleteNews(this.props.index, this.props.title);
    }

    render () {
        return (
            <tr>
                <td className="NewsTd">{this.props.title}</td>
                <td className="NewsTd">{this.props.date}</td> 
                <td className="NewsTd">0/0</td>
                <td className="NewsTd">0/0</td>
                <td className="NewsTd">0/0</td>
                <td className="NewsTd">{this.props.link}</td>
                <td className="NewsTd ChangeNews" title="Изменить новость" onClick={this.changeNews.bind(this)}>⚙</td>
                <td className="NewsTd DeleteNews" title="Удалить новость" onClick={this.deleteNews.bind(this)}>✖</td>
            </tr>
        )
    }
}
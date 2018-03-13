import React, { Component } from 'react';
import AddNewsRule from './addNewsRule';
import '../../../css/addNewsForm.css';

export default class AddNewsForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkbox: false
        }
    }

    closeNewsForm () {
        this.props.closeNewsForm();
    }

    checkbox () {
        this.setState({checkbox: !this.state.checkbox});
    }

    checkBoxDiv () {
        if (this.state.checkbox) {
            return(<AddNewsRule index='addNews' />);
        }
    }

    addNewsApply () {
        this.props.addNewsApply();
    }

    render () {
        return (
            <div className="AddNewsForm">
                <div className="closeBtn" onClick={this.closeNewsForm.bind(this)}>X</div>
                <div className="AddNewsFormHeader">
                    <h1>Добавление новости</h1>
                </div>
                <div className="addNewsFormInputs">
                    <div className="form-group">
                        <label>Заголовок</label>
                        <input type="text" className="addNewsForm-control" id="addNewsTitle" />
                    </div>
                    <div className="form-group">
                        <label>Текст</label>
                        <textarea type="text" rows="5" className="addNewsForm-control" id="addNewsText" />
                    </div>
                    <div className="form-group">
                        <label title='Не обязательно'>Ссылка</label>
                        <input type="url" className="addNewsForm-control" id="addNewsLink" />
                    </div>
                    <div className="form-group">
                        <label>Тип новости</label>
                        <select className="addNewsForm-control" id="addNewsType">
                            <option>Общее</option>
                            <option>О науке</option>
                            <option>Спортивные</option>
                            <option>Общественная деятельность</option>
                            <option>Информационные</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Картинка</label>
                        <input type="file" className="addNewsForm-control lastInput" id="addNewsImg" />
                    </div>
                    <div className="form-group">
                        <label>С уведомлением</label>
                        <input type="checkbox" className="addNewsCheckBox" onClick={this.checkbox.bind(this)} />
                    </div>
                    {this.checkBoxDiv()}
                </div>
                <div className="addNewsApplyBtnContainer">
                    <button className="btn addNewsApplyBtn" id="addNewsApplyBtn" onClick={this.addNewsApply.bind(this)}>Добавить</button>
                </div>
            </div>
        )
    }
}
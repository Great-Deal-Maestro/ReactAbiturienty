import React, { Component } from 'react';
import '../../../css/changeNewsForm.css';

export default class ChangeNewsForm extends Component {

    typeTransform (id, feed_group_id) {
        if (id === feed_group_id) {
            return true;
        } else {
            return false;
        }
    }

    closeNewsForm () {
        this.props.closeNewsForm();
    }

    changeNewsApply () {
        this.props.changeNewsApply(this.props.index);
    }

    render () {
        return (
            <div className="ChangeNewsForm">
                <div className="closeBtn" onClick={this.closeNewsForm.bind(this)}>X</div>
                <div className="ChangeNewsFormHeader">
                    <h1>Изменение новости</h1>
                </div>
                <div className="ChangeNewsFormInputs">
                    <div className="form-group">
                        <label>Заголовок</label>
                        <input type="text" className="ChangeNewsForm-control" id="ChangeNewsTitle" defaultValue={this.props.title} />
                    </div>
                    <div className="form-group">
                        <label>Текст</label>
                        <textarea type="text" rows="5" className="ChangeNewsForm-control" id="ChangeNewsText" defaultValue={this.props.body} />
                    </div>
                    <div className="form-group">
                        <label title='Не обязательно'>Ссылка</label>
                        <input type="url" className="ChangeNewsForm-control" id="ChangeNewsLink" defaultValue={this.props.link} />
                    </div>
                    <div className="form-group">
                        <label>Тип новости</label>
                        <select className="ChangeNewsForm-control" id="ChangeNewsType">
                            <option selected={this.typeTransform(1, this.props.feed_group_id)}>Общее</option>
                            <option selected={this.typeTransform(2, this.props.feed_group_id)}>О науке</option>
                            <option selected={this.typeTransform(3, this.props.feed_group_id)}>Спортивные</option>
                            <option selected={this.typeTransform(4, this.props.feed_group_id)}>Общественная деятельность</option>
                            <option selected={this.typeTransform(5, this.props.feed_group_id)}>Информационные</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Картинка</label>
                        <img src={this.props.img} alt="Картинка" />
                        <input type="file" className="ChangeNewsForm-control lastInput" id="ChangeNewsImg" />
                    </div>
                </div>
                <div className="ChangeNewsApplyBtnContainer">
                    <button className="btn ChangeNewsApplyBtn" onClick={this.changeNewsApply.bind(this)}>Изменить</button>
                </div>
            </div>
        )
    }
}
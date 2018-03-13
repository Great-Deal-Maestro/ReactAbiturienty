import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class FacultiesStrings extends Component {

    render() {
        let index = this.props.index;
        switch (this.props.name) {
            case 'faculties':
                let faculties = [];
                let facultiesCount = '';
                return (
                    <div>
                        <select className="facult" size="5">
                            {
                                this.props.array.map (function (item, i) {
                                    return (<option key={i} id={index+item.name} onClick={
                                        function () {
                                            if (document.getElementById(index+item.name).innerHTML[0] === '✓') {
                                                faculties.splice(faculties.indexOf(item.name+'; '),1);
                                                document.getElementById(index+item.name).style.backgroundColor = 'white';
                                                document.getElementById(index+item.name).style.color = 'black';
                                                document.getElementById(index+item.name).innerHTML = document.getElementById(index+item.name).innerHTML.slice(2);
                                                facultiesCount = facultiesCount.slice(0,-1);
                                            } else {
                                                faculties.push(item.name+'; ');
                                                document.getElementById(index+item.name).style.backgroundColor = 'rgb(16, 73, 11)';
                                                document.getElementById(index+item.name).style.color = 'white';
                                                document.getElementById(index+item.name).innerHTML = '✓ ' + document.getElementById(index+item.name).innerHTML;
                                                faculties = faculties.sort();
                                                facultiesCount += '1';
                                            }
                                        }
                                    } title={item.name}>{item.name}</option>);
                                })
                            }
                        </select>
                        <div className="icon">
                            <div className="btn RuleBtn gul" onClick={
                                    function () {
                                        document.getElementById(index+'facultFinalChoice').innerHTML = '';
                                        faculties.map((item, i) => {
                                            document.getElementById(index+'facultFinalChoice').innerHTML += item;
                                            document.getElementById(index+item.slice(0,-2)).style.backgroundColor = 'white';
                                            document.getElementById(index+item.slice(0,-2)).style.color = 'black';
                                            document.getElementById(index+item.slice(0,-2)).innerHTML = document.getElementById(index+item.slice(0,-2)).innerHTML.slice(2);
                                            return null;
                                        });
                                        if(faculties.length === 0) {
                                            document.getElementById(index+'facultFinalChoice').innerHTML = 'Все факультеты';
                                        }
                                        faculties = [];
                                        ReactDOM.unmountComponentAtNode(document.getElementById(index+'facultiesList'));
                                        document.getElementById(index+'courseFinalChoice').innerHTML = 'Все курсы';
                                        document.getElementById(index+'groupFinalChoice').innerHTML = 'Все группы';
                                        document.getElementById(index+'facultiesList').style.display = 'none';
                                        sessionStorage.setItem(index+'facultlistShow', 'false');
                                        sessionStorage.setItem(index+'facultCount', facultiesCount);
                                    }
                                }>✓</div>
                            <div className="btn RuleBtn ics" onClick={
                                    function () {
                                        faculties.map((item, i) => {
                                            document.getElementById(index+'facultFinalChoice').innerHTML += item;
                                            document.getElementById(index+item.slice(0,-2)).style.backgroundColor = 'white';
                                            document.getElementById(index+item.slice(0,-2)).style.color = 'black';
                                            document.getElementById(index+item.slice(0,-2)).innerHTML = document.getElementById(index+item.slice(0,-2)).innerHTML.slice(2);
                                            return null;
                                        });
                                        document.getElementById(index+'facultFinalChoice').innerHTML = 'Все факультеты';
                                        faculties = [];
                                        ReactDOM.unmountComponentAtNode(document.getElementById(index+'facultiesList'));
                                        document.getElementById(index+'courseFinalChoice').innerHTML = 'Все курсы';
                                        document.getElementById(index+'groupFinalChoice').innerHTML = 'Все группы';
                                        document.getElementById(index+'facultiesList').style.display = 'none';
                                        sessionStorage.setItem(index+'facultlistShow', 'false');
                                        sessionStorage.setItem(index+'facultCount', '');
                                    }
                                }>X</div>
                        </div>
                    </div>
                )

            case 'courses':
                let courses = [];
                let coursesCount = '';
                return (
                    <div>
                        <select className="course" size="6">
                            {
                                this.props.array.map (function (item, i) {
                                    return (<option key={i} id={String(index)+item} onClick={
                                        function () {
                                            if (document.getElementById(String(index)+item).innerHTML[0] === '✓') {
                                                courses.splice(courses.indexOf(index+item+'; '),1);
                                                document.getElementById(String(index)+item).style.backgroundColor = 'white';
                                                document.getElementById(String(index)+item).style.color = 'black';
                                                document.getElementById(String(index)+item).innerHTML = document.getElementById(String(index)+item).innerHTML.slice(2);
                                                coursesCount = coursesCount.slice(0,-1);
                                            } else {
                                                courses.push(item+'; ');
                                                document.getElementById(String(index)+item).style.backgroundColor = 'rgb(16, 73, 11)';
                                                document.getElementById(String(index)+item).style.color = 'white';
                                                document.getElementById(String(index)+item).innerHTML = '✓ ' + document.getElementById(String(index)+item).innerHTML;
                                                courses = courses.sort();
                                                coursesCount += '1';
                                            }
                                        }
                                    } title={item}>{item}</option>);
                                })
                            }
                        </select>
                        <div className="icon">
                            <div className="btn RuleBtn gul" onClick={
                                    function () {
                                        document.getElementById(index+'courseFinalChoice').innerHTML = '';
                                        courses.map((item, i) => {
                                            document.getElementById(index+'courseFinalChoice').innerHTML += item;
                                            document.getElementById(String(index)+item.slice(0,-2)).style.backgroundColor = 'white';
                                            document.getElementById(String(index)+item.slice(0,-2)).style.color = 'black';
                                            document.getElementById(String(index)+item.slice(0,-2)).innerHTML = document.getElementById(String(index)+item.slice(0,-2)).innerHTML.slice(2);
                                            return null;
                                        });
                                        if(courses.length === 0) {
                                            document.getElementById(index+'courseFinalChoice').innerHTML = 'Все курсы';
                                        }
                                        courses = [];
                                        ReactDOM.unmountComponentAtNode(document.getElementById(index+'coursesList'));
                                        document.getElementById(index+'groupFinalChoice').innerHTML = 'Все группы';
                                        document.getElementById(index+'coursesList').style.display = 'none';
                                        sessionStorage.setItem(index+'courselistShow', 'false');
                                        sessionStorage.setItem(index+'courseCount', coursesCount);
                                    }
                                }>✓</div>
                            <div className="btn RuleBtn ics" onClick={
                                    function () {
                                        courses.map((item, i) => {
                                            document.getElementById(index+'courseFinalChoice').innerHTML += item;
                                            document.getElementById(index+item.slice(0,-2)).style.backgroundColor = 'white';
                                            document.getElementById(index+item.slice(0,-2)).style.color = 'black';
                                            document.getElementById(index+item.slice(0,-2)).innerHTML = document.getElementById(index+item.slice(0,-2)).innerHTML.slice(2);
                                            return null;
                                        });
                                        document.getElementById(index+'courseFinalChoice').innerHTML = 'Все курсы';
                                        courses = [];
                                        ReactDOM.unmountComponentAtNode(document.getElementById(index+'coursesList'));
                                        document.getElementById(index+'groupFinalChoice').innerHTML = 'Все группы';
                                        document.getElementById(index+'coursesList').style.display = 'none';
                                        sessionStorage.setItem(index+'courselistShow', 'false');
                                        sessionStorage.setItem(index+'courseCount', '');
                                    }
                                }>X</div>
                        </div>
                    </div>
                )

                case 'groups':
                    let groups = [];
                    return (
                        <div>
                            <select className="group" size="5">
                                {
                                    this.props.array.map (function (item, i) {
                                        if (String(item.course_number) === document.getElementById(index+'courseFinalChoice').innerHTML.slice(0, -2)) {
                                            return (<option key={i} id={index+item.name} onClick={
                                                function () {
                                                    if (document.getElementById(index+item.name).innerHTML[0] === '✓') {
                                                        groups.splice(faculties.indexOf(item.name+'; '),1);
                                                        document.getElementById(index+item.name).style.backgroundColor = 'white';
                                                        document.getElementById(index+item.name).style.color = 'black';
                                                        document.getElementById(index+item.name).innerHTML = document.getElementById(index+item.name).innerHTML.slice(2);
                                                    } else {
                                                        groups.push(item.name+'; ');
                                                        document.getElementById(index+item.name).style.backgroundColor = 'rgb(16, 73, 11)';
                                                        document.getElementById(index+item.name).style.color = 'white';
                                                        document.getElementById(index+item.name).innerHTML = '✓ ' + document.getElementById(index+item.name).innerHTML;
                                                        groups = groups.sort();
                                                    }
                                                }
                                            } title={item.name}>{item.name}</option>);
                                        }
                                        return 0;
                                    })
                                }
                            </select>
                            <div className="icon">
                                <div className="btn RuleBtn gul" onClick={
                                        function () {
                                            document.getElementById(index+'groupFinalChoice').innerHTML = '';
                                            groups.map((item, i) => {
                                                document.getElementById(index+'groupFinalChoice').innerHTML += item;
                                                document.getElementById(index+item.slice(0,-2)).style.backgroundColor = 'white';
                                                document.getElementById(index+item.slice(0,-2)).style.color = 'black';
                                                document.getElementById(index+item.slice(0,-2)).innerHTML = document.getElementById(index+item.slice(0,-2)).innerHTML.slice(2);
                                                return null;
                                            });
                                            if(groups.length === 0) {
                                                document.getElementById(index+'groupFinalChoice').innerHTML = 'Все группы';
                                            }
                                            groups = [];
                                            ReactDOM.unmountComponentAtNode(document.getElementById(index+'groupsList'));
                                            document.getElementById(index+'groupsList').style.display = 'none';
                                            sessionStorage.setItem(index+'grouplistShow', 'false');
                                        }
                                    }>✓</div>
                                <div className="btn RuleBtn ics" onClick={
                                        function () {
                                            groups.map((item, i) => {
                                                document.getElementById(index+'groupFinalChoice').innerHTML += item;
                                                document.getElementById(index+item.slice(0,-2)).style.backgroundColor = 'white';
                                                document.getElementById(index+item.slice(0,-2)).style.color = 'black';
                                                document.getElementById(index+item.slice(0,-2)).innerHTML = document.getElementById(index+item.slice(0,-2)).innerHTML.slice(2);
                                                return null;
                                            });
                                            document.getElementById(index+'groupFinalChoice').innerHTML = 'Все группы';
                                            groups = [];
                                            ReactDOM.unmountComponentAtNode(document.getElementById(index+'groupsList'));
                                            document.getElementById(index+'groupsList').style.display = 'none';
                                            sessionStorage.setItem(index+'grouplistShow', 'false');
                                        }
                                    }>X</div>
                            </div>
                        </div>
                    )

                    default: return <div />;

        }
    }
}
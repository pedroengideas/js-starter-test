import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

//base de datos
import Courses from "./bd/courses";
import Students from "./bd/students";

//css
import './bootstrap.min.css';
import './App.css';

//component 
import ListCourse from './component/ListCourse';
import ListStudents from './component/ListStudents';

class App extends Component {
    constructor(props){
        super(props)

        /** 
         * almaceno en una variable los datos traidos de una base de datos, 
         * funcion o de algun servidor externo
        */
        this.listCourse = new Courses();
        this.students = new Students();

        /**
         * cargo los datos procesados, de lo contrario cargo los datos traidos por localstorage
         */
        const itemsCourse = JSON.parse(localStorage.getItem('newCurses')) || this.listCourse.items;
        const itemsStudents = JSON.parse(localStorage.getItem('newStudents')) || this.students.items;

        /**
         * 
         * almaceno los datos en un estado
         * verifico los los estudiantes que tienen cursos enlazados
         * envio el listado de los cursos en otro estado
         */
        this.state = {
            listStudents : itemsStudents.map(students => {
                students.courses = this.search(students.courses, itemsCourse)
                return students;
            }),
            listCourse : itemsCourse
        }
 
    }

    /**
     * función que compara un arreglo con otro y devuleve un valor de coincidencia
     * en este caso comparo el id o el nombre de los cursos con el id o nombre del curso del estudiante
     * para asi traerme los nombre de los cursos del estudiantes
     */

    search = (selectedArray, inputArray) => {
        var current = [];
        for (let i=0; i < inputArray.length; i++) {
            let varID = selectedArray.find(l => {
                return (parseInt(inputArray[i].id) === parseInt(l) || inputArray[i].name === l)
            })
            if ((parseInt(inputArray[i].id) === varID || inputArray[i].name === varID)) {
                current.push(inputArray[i].name);
            }
        }
        return current;
    }

    /**
     * es un metodo que guarda los datos del curso y de los estudiantes en localStorage
     * y al mismo tiempo actualiza la lista
     */
    saveLocalStorage = (valueArray, currentListItem = null, type = null, nameStrorage) => {
        const newLocal = localStorage.getItem(nameStrorage);
        if(newLocal !== null && type === 'create'){
            const newCurrentLocal = JSON.parse(localStorage.getItem(nameStrorage));
            localStorage.setItem(nameStrorage, JSON.stringify([...newCurrentLocal, valueArray]))
        } else if(type === 'create') {
            localStorage.setItem(nameStrorage, JSON.stringify([...currentListItem, valueArray]))
        } else {
            localStorage.setItem(nameStrorage, JSON.stringify(valueArray))
        }

        const currentList = JSON.parse(localStorage.getItem(nameStrorage))
        if(nameStrorage === 'newCurses'){
            this.setState(
                {listCourse: currentList}
            );
        } else if(nameStrorage === 'newStudents'){
            this.setState(
                {listStudents: currentList}
            );
        }
    }

    /**
     * función que borra el localStorage 
     * y actualiza las listas pordefacto 
     */
    clearDbLocal = () => {
        localStorage.clear();
        this.setState(
            {
                listCourse: this.listCourse.items,
                listStudents: this.students.items
            }
        )
    }

    render() {
        return (
            <div className="app-container">
                <div className="headers">
                    <h1 className="text-center">Registro - prueba de reactjs</h1>
                </div>
                <Router>
                    <Route exact path="/" render={() => {
                        return (
                            <div clas="container-register center-block">
                                <div className="container text-center">
                                    Prueba de desarrollo
                                    <div className="row-btn">
                                    <Link className="btn btn-primary" to="/courses">Courses</Link> | <Link className="btn btn-primary" to="/students">Students</Link> | <button onClick={this.clearDbLocal} className="btn btn-danger">Clear local Storage</button>
                                    </div>
                                </div>
                                
                            </div>
                        )
                    }} />
                    <Route exact path="/courses" render={() => {
                        return (
                            <div clas="container-register">
                                <div className="container text-center">
                                    <Link className="btn btn-primary" to="/">Home</Link> | <Link className="btn btn-primary" to="/students">Students</Link>
                                </div>
                                <div className="items courses">
                                    <ListCourse 
                                        title="Gestión de Cursos" 
                                        students={this.state.listStudents}
                                        deleteCourse={this.onDeleteCourse}
                                        saveLocalStorage={this.saveLocalStorage}
                                        courses={this.state.listCourse} />
                                </div>
                            </div>
                        )
                    }} />

                    <Route path="/students" render={() => {
                        return (
                            <div clas="container-register">
                                <div className="container text-center">
                                    <Link className="btn btn-primary" to="/">Home</Link> | <Link className="btn btn-primary" to="/courses">Courses</Link>
                                </div>
                                <div className="items courses">
                                    <ListStudents  
                                        courses={this.state.listCourse} 
                                        title="Gestión de Estudiantes" 
                                        saveLocalStorage={this.saveLocalStorage}
                                        deleted={this.onDeleteStudents}
                                        students={this.state.listStudents}/>
                                </div>
                            </div>
                        )
                    }
                    } />
                </Router>
            </div>
        );
    }
}

export default App;

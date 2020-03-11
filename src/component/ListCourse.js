import React, { Component } from 'react';
import Course from './Course';
import CourseForm from './CourseForm';
export default class ListCourse extends Component {

    state = {
        message_course:null,
        editCourse: null
    }

    onSaveCourse = (id, name, days) => {
        const number_random = Math.round(Math.random()*1295867);
        const newCourse = {
            id:id ? id : number_random,
            name:name,
            days:days
        }

        if(id === null) {
            this.props.saveLocalStorage(newCourse, this.props.courses, 'create', 'newCurses');
        } else {
            this.saveEditCourse(id, newCourse);
        }

        return true;
    }

    saveEditCourse = (id, courses) => {
        const newCourseList = this.props.courses.filter(course => {
            if (course.id === id){
                course.name = courses.name;
                course.days = courses.days;
            }
            return course;
        })

        this.props.saveLocalStorage(newCourseList, null,null, 'newCurses');

    }

    onDeleteCourse = (id) => {
        const newCourseList = this.props.courses.filter(course => course.id === id)
        const courseCurrentStudent = this.props.students.filter(student => {
            return student.courses.find(curse => {
                return (curse === newCourseList[0].name)
            })
        })

        this.setState(
            {
                message_course:null
            }
        )

        if(courseCurrentStudent.length > 0) {
            console.log(courseCurrentStudent)
            this.setState(
                {
                    message_course:(<span className="alert alert-danger"> El Curso no se puyede eliminar, pertenece a una persona</span>)
                }
            )
            return false
        } else {
            const newCourseList = this.props.courses.filter(course => course.id !== id)
            this.props.saveLocalStorage(newCourseList, null, null, 'newCurses');
        }

        
    }

    search = (selectedArray, inputArray) => {
        var current = [];
        for (let i=0; i < inputArray.length; i++) {
            let varID = selectedArray.find(l => {
                return (inputArray[i].name === l)
            })
            if (inputArray[i].name === varID) {
                current.push(inputArray[i].name);
            }
        }
        return selectedArray;
    }

    onEditCourse = (id) => {
        const editCourseList = this.props.courses.filter(course => course.id === id)
        this.setState({
            editCourse: editCourseList[0]
        })
    }

    render() {
        return (
        <div id="ListCourse" className="academic">
            <h1 className="text-center">{this.props.title}</h1>
            <div className="row">
                <div className="col-md-6">
                    <CourseForm course={this.state.editCourse} saveCourse={this.onSaveCourse} />
                </div>
                <div className="col-md-6">
                    <p>{this.state.message_course}</p>
                    {this.props.courses.map(course => 
                    <Course 
                        key={course.id}
                        oneCourse={course}
                        editCourse={this.onEditCourse}
                        deleteCourse={this.onDeleteCourse}
                    />)}
                </div>
            </div>
        </div>
        );
    }

}
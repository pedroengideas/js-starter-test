import React, { Component } from 'react';
import Student from './Student';
import StudentForm from './studentForm';

export default class ListStudents extends Component {

    constructor(props) {
        super(props)

        this.state = {
            editStudent:null
        }
    }

    onSaveStudents = (id, name, mail, age, courses) => {
        const number_random = Math.round(Math.random()*1295867);
        const newStudents = {
            id:id ? id : number_random,
            name:name,
            mail:mail,
            age:age,
            courses:this.search(courses, this.props.courses)
        }

        if(id === null){
            this.props.saveLocalStorage(newStudents, this.props.students, 'create', 'newStudents');
        } else {
            this.saveEditStudents(id, newStudents)
        }
    }

    search = (selectedArray, inputArray) => {
        var current = [];
        for (let i=0; i < inputArray.length; i++) {
            let varID = selectedArray.find(l => {
                return (inputArray[i].id === parseInt(l))
            })

            if(varID !== undefined){
                if (inputArray[i].id === varID) {
                    current.push(inputArray[i].name);
                } 
            }
            
        }
        return current;
    }

    saveEditStudents = (id, students) => {
        const newStudentEdit = this.props.students.filter(student => {
            if (student.id === id) {
                student.name = students.name;
                student.mail = students.mail;
                student.age = students.age;
                student.courses = students.courses;
            }
            return student;
        })

        this.props.saveLocalStorage(newStudentEdit, null,null, 'newStudents');

    }

    onEditStudents = (id) => {
        const editStudent = this.props.students.filter(student => student.id === id)
        this.setState({
            editStudent: editStudent[0]
        })
    }

    onDeleteStudents = (id) => {
        const newStudents = this.props.students.filter(students => students.id !== id)
        this.props.saveLocalStorage(newStudents, null, null, 'newStudents');
    }


    render(){
    return  <div className="academic">
                <h1 className="text-center">{this.props.title}</h1>
                <div className="row">
                    <div className="col-md-6">
                        <StudentForm student={this.state.editStudent} saveStudents={this.onSaveStudents} listCourse={this.props.courses}/> 
                    </div>
                    <div className="col-md-6">
                        {this.props.students.map(student => 
                            <Student 
                                key={student.id} 
                                oneStudent={student}
                                editStudent={this.onEditStudents}
                                deleted={this.onDeleteStudents}
                            />
                        )}
                    </div>
                </div>
            </div>
    }

}
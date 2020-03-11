import React, { Component } from 'react';

class Student extends Component {

    /**
     * metodo que le da estilo a los cursos que tiene cada estudiante
     */
    styleCourses = () => {
        return {
            margin:'5px 5px',
            
        }
    }

    /**
     * metodo que le da formar a los estilos de los cursos 
     * del estudiante
     */
    courseStyle = (courses) => {
        return courses.map(course => {
            return (
                    <span key={course} className="badge badge-primary" style={this.styleCourses()}> {course} </span>
            )
        });
    }

    render() {

        const { id, name, mail, age, courses } = this.props.oneStudent
        
        return (
        <div className="course">
            <h3>Name Student: {name}</h3>
            <p>Email: {mail}</p>
            <p>Age: {age}</p>
            <p>List course:
                <br/>
            {this.courseStyle(courses)}</p>
            <button onClick={this.props.editStudent.bind(this, id)} value={id} className="btn btn-primary">Edit</button>
            <button onClick={this.props.deleted.bind(this, id)} style={styleBtnDelete}>Delete</button>
        </div>);
    }

}

/**
 * estilo del boton eliminar
 */
const styleBtnDelete = {
    fontSize:'12px',
    border: 'none',
    background: 'rgb(220, 53, 69)',
    padding:'10px 15px',
    color: '#fff',
    borderRadius: '10%',
    marginLeft: '5px',
    cursor: 'pointer'
}

export default Student;
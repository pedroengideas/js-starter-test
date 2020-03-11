import React, { Component } from 'react';

class Course extends Component {

    /**
     * un metodo de estilo de los dias del curso
     * 
     */
    styleDays = () => {
        return {
            margin:'5px 5px',
            
        }
    }

    /**
     * metodo que realiza el recorrido de los dias de los cursos para darle estilos de maquetación
     */
    dayStyle = (days) => {
        return days.map(day => {
            return (
                    <span key={day} className="badge badge-danger" style={this.styleDays()}> {day} </span>
            )
        });
    }

    render() {

        const { id, name, days } = this.props.oneCourse
        
        return (
        <div className="course">
            <h3>Name course: {name}</h3>
            <p>Courses days:  {this.dayStyle(days)}</p>
            <button onClick={this.props.editCourse.bind(this,id)} className="btn btn-primary">Edit</button>
            <button onClick={this.props.deleteCourse.bind(this,id)} style={styleBtnDelete}>Delete</button>
        </div>);
    }

}

/**
 * variable u objecto que le da estilo al botton
 */
const styleBtnDelete = {
    fontSize:'12px',
    border: 'none',
    background: '#dc3545',
    padding:'10px 15px',
    color: '#fff',
    borderRadius: '10%',
    marginLeft: '5px',
    cursor: 'pointer'
}

export default Course;
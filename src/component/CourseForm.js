import React, { Component } from 'react';

export default class CourseForm extends Component {

    constructor(props){
        super(props)

        /**
         * estados iniciales:
         * 
         */
        this.state = {
            activated: false,
            nameCourse: '',
            daysCourse:[],
            errorValidate:null,
            active_error:false,
            message_action:'',
            id:null
        }

        /**
         * listado de la semana
         */
        this.option = [
            {
                value: 'Monday',
                text: 'Monday'
            },
            {
                value: 'Wednesday',
                text: 'Wednesday'
            },
            {
                value: 'Tuesday',
                text: 'Tuesday'
            },
            {
                value: 'Thursday',
                text: 'Thursday'
            },
            {
                value: 'Friday',
                text: 'Friday'
            },
            {
                value: 'Saturday',
                text: 'Saturday'
            }
        ]

    }

    /**
     * componenet por defecto de react carga antes de todos los metodos
     */
    componentDidMount(){
        console.log('Formulario de cursos')
    }

    /**
     * al momento de actualizar el componente verifico si se esta 
     * pasando la variable del curso actual para modificarlo
     * @param {course} prevProps 
     */
    componentDidUpdate(prevProps) {
        if(this.props.course !== null){
            if(this.props.course !== prevProps.course) {
                this.setState({
                    id:this.props.course.id,
                    nameCourse:this.props.course.name,
                    daysCourse:this.props.course.days
                });
            }
        }
        
    }

    /**
     * estilo de mostrar u ocultar el formulario
     */
    styleDisplay = () => {
        return {
            display: this.state.activated ? 'block' : 'none'
        }
    }

    /**
     * estilo o metodo de estilo del mensaje de error
     */
    styleMessage = () => {
        return {
            padding:'10px 12px',
            background: this.state.active_error ? '#dc3545' : '',
            display: this.state.active_error ? 'block' : 'none'
        }
    }

    /**
     * si se oculta o no el formulario un toogle del botton
     * @param {boolean} valor 
     */
    onClickActivated(valor) {
        if (this.state.activated === valor) {
            this.setState({activated:!valor})
        }
    }

    /**
     * metodo del ubmit del formulario
     * verifica los datos basicos del mismo, que los campos no esten vacios
     * al guardar los datos, esto se blanquean
     */
    onClickSubmit = (event) => {
        event.preventDefault()

        if(!this.state.nameCourse) {
            this.setState({
                active_error: true,
                message_action:'El nombre debe ser obligatorio'
            })
            return false
        }

        if(this.state.daysCourse.length === 0) {
            this.setState({
                active_error: true,
                message_action:'Debes seleccionar al menos un Dia'
            })
            return false
        }

        if(this.state.id === null){
            this.setState({
                active_error: true,
                message_action:'Se ha agregado con exito el curso'
            })
        } else if(this.state.id !== null){
            this.setState({
                active_error: true,
                message_action:'Se ha actualizado el curso'
            })
        }

        if(this.props.saveCourse(this.state.id, this.state.nameCourse, this.state.daysCourse)){
            this.setState({
                id:null,
                nameCourse: '',
                daysCourse:[]
            })
        }
    }

    onChangeValidateName = (event) => {      
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onChangeValidateSelect = (event) => {
        var options = event.target.options;
        var valueSelect = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            valueSelect.push(options[i].value);
          }
        }
        this.setState({
            [event.target.name]: valueSelect
        })

    }

    render() {
        return (
            <div onChange={ this.handleChange }>
                <button className="btn btn-primary" type="button" 
                    onClick={this.onClickActivated.bind(this, this.state.activated)}>
                        Crear Curso
                </button>
                <p style={this.styleMessage()}>{this.state.message_action}</p>
                <form 
                    id="formCourse" 
                    className="forms" 
                    style={this.styleDisplay()}>
                    <legend>Create Course</legend>                    
                    <div className="form-group">
                        <label>Name of Course</label>
                        <input 
                            onChange={this.onChangeValidateName} 
                            name="nameCourse"
                            value={this.state.nameCourse}
                            type="text" className="form-control" 
                            placeholder="" 
                        />
                    </div>
                
                    <div className="form-group">
                        <label>Days</label>
                        <select multiple={true} value={this.state.daysCourse}
                            onChange={this.onChangeValidateSelect} 
                            name="daysCourse">
                            {this.option.map(days => 
                                <option 
                                    key={days.value} 
                                    value={days.value}>{days.text}
                                </option>
                            )}
                        </select>
                    </div>

                    <button onClick={this.onClickSubmit} type="submit" className="btn btn-primary">New Course</button>
                </form>
            </div>
            
        )
    }

}
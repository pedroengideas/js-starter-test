import React, { Component } from 'react';

export default class studentForm extends Component {

    constructor(props){
        super(props)

        this.state = {
            id:null,
            activated: false,
            name: '',
            mail:'',
            age:'',
            select_course:[],
            errorValidate:null,
            active_error:false,
            message_action:'',
            listCourse: this.props.listCourse
        }
    }

    componentDidMount(){
        console.log('Component Students')
    }

    /**
     * al momento de actualizar el componente verifico si se esta 
     * pasando la variable del curso actual para modificarlo
     * @param {student} prevProps 
     */
    componentDidUpdate(prevProps) {
        if(this.props.student !== null){
            if(this.props.student !== prevProps.student) {
                this.setState({
                    id:this.props.student.id,
                    name:this.props.student.name,
                    mail:this.props.student.mail,
                    age:this.props.student.age,
                    select_course:this.search(this.props.student.courses, this.state.listCourse)
                });
            }
        }
        
    }

    /**
     * comparo los key de los cursos generales con los cursos seleccionados del estudiantes
     * y retorno los nopmbre de los mismos.
     * @param {array} selectedArray 
     * @param {array} inputArray 
     */
    search = (selectedArray, inputArray) => {
        var current = [];
        for (let i=0; i < inputArray.length; i++) {
            let varID = selectedArray.find(l => {
                return (parseInt(inputArray[i].id) === parseInt(l) || inputArray[i].name === l)
            })
            if ((parseInt(inputArray[i].id) === varID || inputArray[i].name === varID)) {
                current.push(inputArray[i].id);
            }
        }
        return current;
    }


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
            background: this.state.active_error ? '#ccc' : '',
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

        if(!this.state.name) {
            this.setState({
                active_error: true,
                message_action:'El nombre debe ser obligatorio'
            })
            return false
        }

        if(this.state.mail === '') {
            this.setState({
                active_error: true,
                message_action:'Debes agregar un email'
            })
            return false
        }

        if(this.state.age === 0 || this.state.age === null) {
            this.setState({
                active_error: true,
                message_action:'Debes agregar su edad'
            })
            return false
        }

        if(this.state.select_course.length === 0) {
            this.setState({
                active_error: true,
                message_action:'Debes seleccionar al menos un curso'
            })
            return false
        }


        this.setState({
            active_error: true,
            message_action:'Se ha agregado / actualizado con exito la estudiante y sus cursos'
        })

        if(this.props.saveStudents(this.state.id, this.state.name, this.state.mail, this.state.age, this.state.select_course)){
            this.setState({
                id:null,
                name: '',
                mail:'',
                age:'',
                select_course:[],
            })
        }      
    }

    /**
     * valido los valores escritos en los inputs
     * es un metodo que esta en el atributo onChange de los inputs
     */
    onChangeValidateForm = (event) => {      
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    /**
     * un metodo donde almaceno los valores en forma de arreglo de los cursos seleccionados
     * los guardo en un estado
     */
    onChangeValidateSelect = (event) => {
        var options = event.target.options;
        var valueSelect = [];
        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            valueSelect.push(parseInt(options[i].value));
          }
        }
        this.setState({
            [event.target.name]: valueSelect
        })

    }

    render() {
        return (
            <div>
                <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={this.onClickActivated.bind(this, this.state.activated)}>
                        Create Student
                </button>

                <p 
                    style={this.styleMessage()}>
                    {this.state.message_action}
                </p>

                <form id="formStudents" style={this.styleDisplay()}>
                    <legend>Estudents</legend>
                
                    <div className="form-group">
                        <label>Name of Student</label>
                        <input 
                            onChange={this.onChangeValidateForm} 
                            name="name" 
                            value={this.state.name}
                            type="text" 
                            className="form-control" 
                            placeholder="" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            onChange={this.onChangeValidateForm} 
                            name="mail" 
                            value={this.state.mail}
                            type="text" 
                            className="form-control" 
                            placeholder="" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input 
                            onChange={this.onChangeValidateForm} 
                            name="age"
                            value={this.state.age}
                            type="number" 
                            className="form-control" 
                            placeholder="" 
                        />
                    </div>

                    <div className="form-group">
                        <label>Courses</label>
                        <select 
                            multiple={true} value={this.state.select_course}
                            onChange={this.onChangeValidateSelect} 
                            name="select_course">
                            {this.state.listCourse.map(course => 
                                <option 
                                    key={course.id} 
                                    value={course.id}>
                                        {course.name}
                                </option>
                            )}
                        </select>
                    </div>

                    <button 
                        onClick={this.onClickSubmit} 
                        type="submit" 
                        className="btn btn-primary">
                            New Students
                    </button>
                </form>
            </div>
            
        )
    }

}
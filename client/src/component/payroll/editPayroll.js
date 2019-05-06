import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import NavigationBar from '../utils/navigationBar'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import { withRouter } from "react-router-dom";

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';


// import Authentication from './component/utils/auth'
const mapStateToProps = (state) => ({ user: state, auth : state.authReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

class editPayroll extends Component {
    constructor(){
        super()
        this.state = {
            salary: 0,
            title: 0,
            first_name: '',
            last_name: '',
            email: ''
        }
    }

    componentDidMount(){
        let token = this.props.user.authReducer.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.get('/admin/get/'+this.props.match.params.emp_id)
        .then(res => {
            console.log(res)
            this.setState({
                salary: res.data.personalInfo.salary,
                title: res.data.personalInfo.title,
                first_name: res.data.profile.first_name,
                last_name: res.data.profile.last_name,
                email: res.data.profile.email
            })
        })
        .catch(err => {
            console.log(err)
        })
    }

    changePersonal = (e) =>{
        e.preventDefault()
        this.setState({ [e.target.name]: e.target.value });
    }

    personal = (e) => {
        e.preventDefault()

        let token = this.props.user.authReducer.token
        let emp_no = this.props.match.params.emp_id
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            axios.post(`/admin/update/personal/${emp_no}`, {
            "email": this.state.email, 
            "first_name": this.state.first_name,
            "last_name": this.state.last_name,
          }).then((res) => {
            console.log(res.data.info)
            // if(res.data.info === "Success"){
              
            // }
          }).catch(err => {
            console.log(err)
          })

    }

    title = (e) => {
        e.preventDefault()
        let emp_no = this.props.match.params.emp_id
        let token = this.props.user.authReducer.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.post('/admin/update/title/' + emp_no, {
            "title": this.state.title
          }).then((res) => {
            console.log(res.data.info)
          }).catch(err => {
            console.log(err)
          })
    }

    salary = (e) => {
        e.preventDefault()
        let emp_no = this.props.match.params.emp_id
        let token = this.props.user.authReducer.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.post('/admin/update/salary/' + emp_no, {
            "salary": this.state.salary
          }).then((res) => {
            console.log(res.data.info)
          }).catch(err => {
            console.log(err)
          })
    }

    deleteUser = (e) => {
        e.preventDefault()
        let emp_no = this.props.match.params.emp_id
        let token = this.props.user.authReducer.token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        axios.get('/admin/delete/user/' + emp_no)
        .then((res) => {
            console.log(res.data.info)
            if(res.data.info === "Success"){
                this.props.history.push('/payroll-admin')
            }
        })
        .catch(err => {
        console.log(err)
        })
    }


    render() {
        console.log(this.props.match.params.emp_id)
        return (
            <>
            <NavigationBar/>
            <Container style={{paddingTop: 50}}>
            <Form onSubmit={this.personal}>
                <h2>Personal Info</h2>

                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" onChange={this.changePersonal} placeholder={this.state.first_name}/>
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="last_name" onChange={this.changePersonal} placeholder={this.state.last_name} />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="email" onChange={this.changePersonal} placeholder={this.state.email} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>

            <br/>
            <br/>

            <Form onSubmit={this.title}>
                <h2>Title</h2>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={this.changePersonal} placeholder={this.state.title} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>
            <br/>
            <br/>

            <Form onSubmit={this.salary}>
                <h2>Salary Info</h2>
                <Form.Group controlId="formSalary">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="text" name="salary" onChange={this.changePersonal} placeholder={this.state.salary}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Save
                </Button>
            </Form>

            <br/>
            <br/>

            <Row style={{textAlign: 'center', paddingBottom: 20}}>
                <Container className='col-12'>
                    <Button variant="danger" type="submit" onClick={this.deleteUser}>
                            Delete User
                    </Button>
                </Container>
            </Row>
            </Container>
        </>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(editPayroll));
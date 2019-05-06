import React, { Component } from 'react'
import NavigationBar from '../utils/navigationBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Logo from '../../images/logo.png'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';


// import Authentication from './component/utils/auth'
const mapStateToProps = (state) => ({ user: state, auth : state.authReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)


class profile extends Component {
    constructor(){
        super()
        this.state = {
            name: null,
            email: null,
            emp_id: null,
            gender: null,
            birthdate: null,
            joinDate: null,
            title: null
        }
    }

  componentDidMount(){
    let token = this.props.user.authReducer.token
    axios.defaults.headers.common['Authorization'] = 
                                'Bearer ' + token;
    axios.get('/user/data')
    .then(res => {
        let profile = res.data.profile
        let personalInfo = res.data.personalInfo
        this.setState({
            name: profile.first_name + " " + profile.last_name,
            email: profile.email,
            emp_id: profile.emp_no,
            gender: profile.gender,
            birthdate: profile.birth_date,
            joinDate: profile.hire_date,
            title: personalInfo.title,
            salary: personalInfo.salary
        })
    })
    .catch(err => {
        console.log(err)
    })
  }

  getMonth(value){
      switch(value){
        case 1:
            return "January"
        case 2:
            return "February"
        case 3:
            return "March"
        case 4:
            return "April"
        case 5:
            return "May"
        case 6:
            return "June"
        case 7:
            return "July"
        case 8:
            return "August"
        case 9:
            return "September"
        case 10:
            return "October"
        case 11:
            return "November"
        case 12:
            return "December"
        default:
            return null
      }
  }


  nth(d) {
    if (d > 3 && d < 21) return 'th'; 
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

  render() {
    let joinDate = new Date(this.state.joinDate)
    let birthdate = new Date(this.state.birthdate)  
    return (
    <>
        <NavigationBar/>
        <Container>
            <br/>
            <Row>
                <Col>
                </Col>
                <Col style={{textAlign: 'center'}}>
                    <Image 
                    src={Logo} 
                    style={{ height: 150, 
                        boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'}} 
                        roundedCircle />
                    <br/>
                    <br/>
                    <br/>

                    <h1>{this.state.name}</h1>
                    <h5>{this.state.title}</h5>

                </Col>
                <Col></Col>
            </Row>
            <br/>
            <br/>


            <Row>
                <Col>
                    <div style={styles.card}>
                        <p>Basic Information</p>
                        <Table  bordered hover>
                            <tbody>
                            <tr>
                                <td>Full Name</td>
                                <td>{this.state.name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>
                            <tr>
                                <td>Employee ID</td>
                                <td>{this.state.emp_id}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col>
                    <div style={styles.card}>
                        <p>System Preferences</p>
                        <Table bordered hover>
                            <tbody>
                            <tr>
                                <td>Language</td>
                                <td>English (Preferred)</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
                <Col>
                    <div style={styles.card}>
                        <p>Additional Information</p>
                        <Table bordered hover>
                            <tbody>
                            <tr>
                                <td>Gender</td>
                                <td>{this.state.gender}</td>
                            </tr>
                            <tr>
                                <td>Birthdate</td>
                                <td>{this.getMonth(birthdate.getMonth()) + " " + birthdate.getDate() + this.nth(birthdate.getDate()) + " " + birthdate.getFullYear()}</td>
                            </tr>
                            <tr>
                                <td>Date Joined</td>
                                <td>{this.getMonth(joinDate.getMonth()) + " " + joinDate.getDate() + this.nth(joinDate.getDate()) + " " + joinDate.getFullYear()}</td>
                            </tr>
                            <tr>
                                <td>Salary</td>
                                <td>$ {this.state.salary}</td>
                            </tr>
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>


        </Container>
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(profile)

const styles = {
   card: {
       backgroundColor: 'white', 
       borderRadius: '3%', 
       padding: 30, 
       boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
       margin: "10px"
    }
}
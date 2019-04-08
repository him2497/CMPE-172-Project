import React, { Component } from 'react'
import NavigationBar from '../utils/navigationBar'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import Logo from '../../images/logo.png'
import Table from 'react-bootstrap/Table'


export default class profile extends Component {
  render() {
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

                    <h1>Himanshu</h1>
                    <h5>Software Engineer</h5>

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
                                <td>Himanshu Mehta</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>himanshuxyz@gmail.com</td>
                            </tr>
                            <tr>
                                <td>Employee ID</td>
                                <td>EMPID</td>
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
                                <td>Male</td>
                            </tr>
                            <tr>
                                <td>Birthdate</td>
                                <td>12/02/1982</td>
                            </tr>
                            <tr>
                                <td>Date Joined</td>
                                <td>12/05/1999</td>
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


const styles = {
   card: {
       backgroundColor: 'white', 
       borderRadius: '3%', 
       padding: 30, 
       boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'
    }
}
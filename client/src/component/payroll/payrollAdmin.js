import React from 'react';
import NavigationBar from '../utils/navigationBar'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import ReactPaginate from 'react-paginate';
import '../../styles/style.css'
import axios from 'axios'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';


// import Authentication from './component/utils/auth'
const mapStateToProps = (state) => ({ user: state, auth : state.authReducer })
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)


class PayrollAdmin extends React.Component {
  constructor(){
    super()
    this.state = {
      pageNum : 0,
      finalNum : 0,
      currPage : 0,
      data: []
    }
  }


  componentDidMount(){
    // this.setState({finalNum: 1000})
    let token = this.props.user.authReducer.token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    // console.log(this.state.pageNum, this.state.currPage)

    axios.get('/admin/pageCount')
    .then(res => {
      this.setState({finalNum: Math.round(res.data.data/25)})
    })
    .catch(err => {
      console.log(err)
    })

    axios.get(`/admin/${1}`)
    .then((res) => {
      this.setState({
        data: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handlePageClick = data => {
    this.setState({
      currPage: data.selected
    })

    let token = this.props.user.authReducer.token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    axios.get(`/admin/${data.selected+1}`)
    .then((res) => {
      this.setState({
        data: res.data
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
 
  render() {
    return (
      <>
        <NavigationBar/>
        <Container>
          <br/>
          <h2>Payroll</h2>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Employee No</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>

              {
                this.state.data.map(val => {
                  return(
                    <tr key={val.emp_no}>
                      <td>{val.emp_no}</td>
                      <td>{val.first_name}</td>
                      <td>{val.last_name}</td>
                      <td>{val.email}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          
          <div style={{textAlign: 'center'}}>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={this.state.finalNum}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </div>
        </Container>
      </>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PayrollAdmin);
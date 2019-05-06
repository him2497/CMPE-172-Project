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
      data: [],
      title: [],
      salary: []
    }
  }


  componentDidMount(){
    // this.setState({finalNum: 1000})
    let token = this.props.user.authReducer.token
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    // console.log(this.state.pageNum, this.state.currPage)

    axios.get(process.env.REACT_APP_API_URL+'/admin/pageCount')
    .then(res => {
      this.setState({finalNum: Math.round(res.data.data/25)+1})
    })
    .catch(err => {
      console.log(err)
    })

    axios.get(process.env.REACT_APP_API_URL+`/admin/${1}`)
    .then((res) => {
      console.log(res)
      this.setState({
        data: res.data.user,
        title: res.data.title,
        salary: res.data.salary
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
    axios.get(process.env.REACT_APP_API_URL+`/admin/${data.selected+1}`)
    .then((res) => {
      console.log(res)
      this.setState({
        data: res.data.user,
        title: res.data.title,
        salary: res.data.salary
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
                <th>Name</th>
                <th>Email</th>
                <th>Title</th>
                <th>Gender</th>
                <th>Pay</th>
              </tr>
            </thead>
            <tbody>

              {
                this.state.data.map((val, idx) => {
                  return(
                    <tr key={val.emp_no}>
                      <td>{val.emp_no}</td>
                      <td>{val.first_name + " " + val.last_name}</td>
                      <td>{val.email}</td>
                      <td>{this.state.title[idx].title}</td>
                      <td>{val.gender}</td>
                      <td>{"$ " + this.state.salary[idx].salary}</td>

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
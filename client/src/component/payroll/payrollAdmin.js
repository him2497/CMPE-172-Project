import React from 'react';
import NavigationBar from '../utils/navigationBar'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import ReactPaginate from 'react-paginate';
import '../../styles/style.css'

class PayrollAdmin extends React.Component {
  constructor(){
    super()
    this.state = {
      pageNum : 1,
      finalNum : null,
      currPage : 1
    }
  }


  componentDidMount(){
    this.setState({finalNum: 1000})
  }

  handlePageClick = data => {
    console.log(data.selected)
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
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@twitter</td>
              </tr>
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


export default PayrollAdmin;
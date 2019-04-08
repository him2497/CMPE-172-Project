import React from 'react';
import NavigationBar from '../utils/navigationBar'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


class Dashboard extends React.Component {

  render() {
    return (
      <>
        <NavigationBar/>
        <Container>
          <br/>
          <Row>
              <Card style={{width: '18rem', margin: '20px' }}>
                <Card.Header>Messages</Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">01/21/2019</Card.Subtitle>
                  <Card.Text>
                    Leave Request Update https://www.youtube.com/watch?v=_AQbWpgOxKg
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">03/28/2019</Card.Subtitle>
                  <Card.Text>
                    Leave Request Accepted
                  </Card.Text>
                  <Card.Link href="#">>View More</Card.Link>
                </Card.Body>
              </Card>

              <Card style={{width: '18rem', margin: '20px'}}>
                <Card.Header>Events</Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">01/21/2019</Card.Subtitle>
                  <Card.Text>
                    Leave Request Update
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">03/28/2019</Card.Subtitle>
                  <Card.Text>
                    Leave Request Accepted
                  </Card.Text>
                  <Card.Link href="#">>View More</Card.Link>
                </Card.Body>
              </Card>

              <Card style={{width: '18rem', margin: '20px'}}>
                <Card.Header>Paid Time Off</Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">01/21/2019</Card.Subtitle>
                  <Card.Text>
                    Leave Request Update
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">03/28/2019</Card.Subtitle>
                  <Card.Text>
                    Leave Request Accepted
                  </Card.Text>
                  <Card.Link href="#">>View More</Card.Link>
                </Card.Body>
              </Card>

              <Card style={{width: '18rem', margin: '20px'}}>
                <Card.Header>Benefits</Card.Header>
                <Card.Body>
                  <Card.Subtitle className="mb-2 text-muted">01/21/2019</Card.Subtitle>
                  <Card.Text>
                    Leave Request Update
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">03/28/2019</Card.Subtitle>
                  <Card.Text>
                    Leave Request Accepted
                  </Card.Text>
                  <Card.Link href="#">>View More</Card.Link>
                </Card.Body>
              </Card>
          </Row>
        </Container>
      </>
    );
  }
}


export default Dashboard;
import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Media from 'react-media';


export default class simpleCard extends Component {
  render() {
    return (
      <Media query="(max-width: 720px)" style={{textAlign: "center"}}>
          {matches =>
            matches ? (
              <Card style={{marginTop: '200px', marginLeft: '20px', marginRight: '20px', paddingBottom: "200px" }}>
                <Card.Body style={{textAlign: "center"}}>This is some text within a card body.</Card.Body>
              </Card>
            ) : (
              <Card style={{marginTop: '-50px', marginLeft: '20px', marginRight: '20px', paddingBottom: "200px" }}>
                <Card.Body style={{textAlign: "center"}}>This is some text within a card body.</Card.Body>
              </Card>
            )
          }
        </Media>
    )
  }
}



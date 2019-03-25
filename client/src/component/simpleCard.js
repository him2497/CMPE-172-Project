import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Media from 'react-media';


export default class simpleCard extends Component {
  render() {
    return (
      <Media query="(max-width: 720px)">
          {matches =>
            matches ? (
              <Card style={{marginTop: '100px', marginLeft: '20px', marginRight: '20px', paddingBottom: "200px" }}>
                <Card.Body>This is some text within a card body.</Card.Body>
              </Card>
            ) : (
              <Card style={{marginTop: '-100px', marginLeft: '20px', marginRight: '20px', paddingBottom: "200px" }}>
                <Card.Body>This is some text within a card body.</Card.Body>
              </Card>
            )
          }
        </Media>
    )
  }
}



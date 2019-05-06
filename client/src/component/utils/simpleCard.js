import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Media from 'react-media';


export default class simpleCard extends Component {
  render() {
    return (
      <>
      <Media query="(max-width: 950px)" style={{textAlign: "center"}}>
          {matches =>
            matches ? (
              <Card style={{marginTop: '200px', marginLeft: '20px', marginRight: '20px', paddingBottom: "200px", color: 'black'}}>
                <Card.Body style={{textAlign: "center"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

</Card.Body>
              </Card>
            ) : (
              <Card style={{marginTop: '-50px', marginLeft: '20px', marginRight: '20px', paddingBottom: "100px", color: 'black' }}>
                <Card.Body style={{textAlign: "center"}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                <br/>
                <br/>
                <br/>
                <br/>

                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                </Card.Body>
              </Card>
            )
          }
        </Media>
        
      </>
    )
  }
}



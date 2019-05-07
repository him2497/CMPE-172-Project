import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
export default class myTasks extends Component {
  constructor(){
    super()
    this.state = {
      tasks: [],
      target: ''
    }
  }

  componentDidMount(){
    this.setState({
      tasks: [...this.state.tasks, "Finish CMPE 172 Report", "Look at the sales report"]
    })
  }

  addTasks = (e) => {
    e.preventDefault()
    this.setState({
      tasks: [...this.state.tasks, this.state.term]
    })
    console.log(this.refs.task.value)
    this.refs.task.value = ''
  }

  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div>
        My Tasks  
      <ListGroup>
        {
          this.state.tasks.map((val,idx) => {
            return (
            <ListGroup.Item key={idx}>
              {val}
            </ListGroup.Item>
            )
          })
        }
      </ListGroup>

        <Form onSubmit={this.addTasks} style={{paddingTop: 40}}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control onChange={this.onChange} type="text" ref="task" placeholder="Enter a task" />
          </Form.Group>
          <Button onClick={this.addTasks}>Add</Button>
        </Form>
      </div>
    )
  }
}

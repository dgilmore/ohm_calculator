import React, { Component } from 'react'
import {Container, Form, Dropdown, Segment, Message} from 'semantic-ui-react'
import desktopImage from './electronic.jpeg'

//Does not include gold or silver, since they do not every appear in first two bands.
const ABoptions = [
    {key: 'Black', value: 0, text: 'Black'},
    {key: 'Brown', value: 1, text: 'Brown'},
    {key: 'Red', value: 2, text: 'Red'},
    {key: 'Orange', value: 3, text: 'Orange'},
    {key: 'Yellow', value: 4, text: 'Yellow'},
    {key: 'Green', value: 5, text: 'Green'},
    {key: 'Blue', value: 6, text: 'Blue'},
    {key: 'Violet', value: 7, text: 'Violet'},
    {key: 'Grey', value: 8, text: 'Grey'},
    {key: 'White', value: 9, text: 'White'}
]

//create deep copy of ABOPTIONS, append gold and silver options
const cOptions = JSON.parse(JSON.stringify(ABoptions))
cOptions.push({key: 'Gold', value: -2, text: 'Gold'})
cOptions.push({key: 'Silver', value: -1, text: 'Silver'})

//new array since we are now intersted in the tolerance 
const tolerance = [
    {key: 'None', value: 20, text: 'None'},
    {key: 'Silver', value: 10, text: 'Silver'},
    {key: 'Gold', value: 5, text: 'Gold'},
    {key: 'Brown', value: 1, text: 'Brown'},
    {key: 'Red', value: 2, text: 'Red'},
    {key: 'Green', value: 0.5, text: 'Green'},
    {key: 'Blue', value: 0.25, text: 'Blue'},
    {key: 'Violet', value: 0.1, text: 'Violet'},
    {key: 'Grey', value: 0.05, text: 'Grey'}
]


export default class OhmCalculator extends Component {
    constructor(){
      super()
      this.state = {
        bandA : '',
        bandB : '',
        bandC : '',
        bandD : 20,
        result : ''
      };
    }
 
    handleA = (e, { value }) => {
        this.setState({ bandA: value*10 }, function() {
          var res = (this.state.bandA + this.state.bandB) * (Math.pow(10, this.state.bandC))
          this.setState({result: res})
       })    
    }

    handleB = (e, {value}) => {
        this.setState({ bandB : value}, function() {
          var res = (this.state.bandA + this.state.bandB) * (Math.pow(10, this.state.bandC))
          this.setState({result: res})
        })   
    }

    handleC = (e, {value}) => {
        this.setState({ bandC : value}, function() {
          var res = (this.state.bandA + this.state.bandB) * (Math.pow(10, this.state.bandC))
          this.setState({result: res})
        })    
    }

    handleD = (e, {value}) => {
        this.setState({ bandD : value}, function()  {
          var res = (this.state.bandA + this.state.bandB) * (Math.pow(10, this.state.bandC))
          this.setState({result: res})
         })   
    }

    render(){
        return(
            <div className="App" style={{backgroundImage : `url(${desktopImage})` }}>
                <div className="form">
                <Segment>
                    <h1>Resistor Ohm Calculator</h1>
                <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <Dropdown color='red'
                    placeholder='Select Band A Color'
                    fluid
                    search
                    selection
                    options={ABoptions}
                    onChange={this.handleA}
                 />
                </Form.Field>
                <Form.Field>
                <Dropdown
                    placeholder='Select Band B Color'
                    fluid
                    search
                    selection
                    options={ABoptions}
                    onChange={this.handleB}
                 />
                </Form.Field>
                <Form.Field>
                <Dropdown
                    placeholder='Select a Multiplier'
                    fluid
                    search
                    selection
                    options={cOptions}
                    onChange={this.handleC}
                 />
                </Form.Field>
                <Form.Field>
                <Dropdown
                    placeholder='Select a Tolerance'
                    fluid
                    search
                    selection
                    options={tolerance}ß
                    onChange={this.handleD}
                 />
                </Form.Field>
                </Form>
                <div className="ohmResponse" style={{paddingTop: '10px'}}>
                    { this.state.bandA === '' || this.state.bandB === ''  ? <h1> Invalid Resistor</h1> : <Message info><h1>Your Resistor has a resistance of {this.state.result} Ohms, with a tolerance of +- {this.state.bandD}%.</h1></Message> }
               </div>
                </Segment>
                </div>
            </div>
        )
    }
};
  
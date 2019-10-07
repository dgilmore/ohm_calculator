import React, { Component } from 'react'
import {Container, Form, Dropdown} from 'semantic-ui-react'

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
        bandD : '',
        result : ''
      };
    }
 
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
        console.log(event.target.value)
    }

    handleA = (e, { value }) => {
        this.setState({ bandA: value*10 })
        console.log(e.target.text)
        console.log(value)
    }

    handleB = (e, {value}) => {
        this.setState({ bandB : value})
    }

    handleC = (e, {value}) => {
        this.setState({ bandC : value})
    }

    handleD = (e, {value}) => {
        this.setState({ bandD : value})
    }
    

    handleSubmit = () => {
        console.log("Ran Submit")
        var result = (this.state.bandA + this.state.bandB) * (Math.pow(10, this.state.bandC))
        this.setState({result: "The Resister is: " + result + " Ohms, with a tolerance of %" + this.state.bandD + "+_."})

    }

    render(){
        return(
            <div>
                <Container>
                    <h1>Resistor Ohm Calculator</h1>
                <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                <Dropdown
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
                    options={tolerance}
                    onChange={this.handleD}
                 />
                </Form.Field>
                
                <Form.Button content='Submit'/>
                </Form>
                <div className="dnaResponse">
                    { this.state.result === '' ? <h1> </h1> : <h1>{this.state.result}</h1> }
               </div>
          
                </Container>
            </div>
        )
    }
};
  
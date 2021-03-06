import React, { Component } from 'react'
import {Form, Dropdown, Segment, Message} from 'semantic-ui-react'
import './App.css'



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
        colorA: '',
        colorB: '',
        colorC: '',
        colorD: '',
        result : ''
      };
    }
 
    //There could be one default onChange handler for all 4 dropdown elements, but when I wrote that function, it was long
    //and hard to read. I ultimately felt that four easy to read and understand handlers was the way to go. 
    handleA = (e, {name, value} ) => {

        this.setState({ [name] : value}, function() {
            var color
            var res = (this.state.bandA*10 + this.state.bandB) * (Math.pow(10, this.state.bandC))
            this.setState({result: res})
            ABoptions.forEach(function(key) {
              if(key.value === value){
                  color = key.key.toLowerCase()
              }
            })
            this.setState({colorA: color})
            
          })      

    }

    handleB = (e, {name, value}) => {
        this.setState({ [name] : value}, function() {
          var color
          var res = (this.state.bandA + this.state.bandB) * (Math.pow(10, this.state.bandC))
          this.setState({result: res})
          ABoptions.forEach(function(key) {
            if(key.value === value){
                color = key.key.toLowerCase()
            }
          })
          this.setState({colorB: color})
          
        })   
    }

    handleC = (e, {name, value}) => {
        this.setState({ [name] : value}, function() {
          var color
          var res = (this.state.bandA + this.state.bandB) * (Math.pow(10, this.state.bandC))
          this.setState({result: res})
          cOptions.forEach(function(key) {
            if(key.value === value){
                color = key.key.toLowerCase()
            }
          })
          this.setState({colorC: color})
        })    
    }

    handleD = (e, {name, value}) => {
        this.setState({ [name] : value}, function()  {
          var color
          var res = (this.state.bandA + this.state.bandB) * (Math.pow(10, this.state.bandC))
          this.setState({result: res})
          tolerance.forEach(function(key) {
            if(key.value === value){
                color = key.key.toLowerCase()
            }
          })
          this.setState({colorD: color})
         })   
         
    }

    render(){
        let display
        if(this.state.bandA === '' && this.state.bandB === ''){
            display = <h1> </h1>
        }
        if((this.state.bandA !== '' && this.state.bandB === '') || (this.state.bandA === '' && this.state.bandB !== '')){
            display = <Message><h1>Invalid Resistor</h1></Message>
        }
        else {
            display = <Message><h1>Your Resistor has a resistance of {this.state.result} Ohms, with a tolerance of +- {this.state.bandD}%.</h1></Message>
        }

        return(
            <div className="App" >
                <div className="form">
                <Segment>
                    <h1>Resistor Ohm Calculator</h1>
                <Form >
                <Form.Field>
                <Dropdown 
                    placeholder='Select Band A Color'
                    name="bandA"
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
                    name="bandB"
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
                    name="bandC"
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
                    name="bandD"
                    fluid
                    search
                    selection
                    options={tolerance}
                    onChange={this.handleD}
                 />
                </Form.Field>
                </Form>
                <div className="ohmResponse" style={{paddingTop: '10px'}}>
                    { display }
               </div>
                </Segment>
                </div>
                <div className="displayResistor" >
                  <div className="resistor bands">
                    <div className="box1" style={{backgroundColor: `${this.state.colorA}`}}></div>
                    <div className="box2" style={{backgroundColor: `${this.state.colorB}`}}></div>
                    <div className="box3" style={{backgroundColor: `${this.state.colorC}`}}></div>
                    <div className="box4" style={{backgroundColor: `${this.state.colorD}`}}></div>
                  </div> 
                </div>
            </div>
        )
    }
};
  
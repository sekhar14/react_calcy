import React, { Component } from 'react'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      content : '0',
      waitingforoperand : false,
      operatorPresent : ''
    }
    this.A = 0
    this.B = 0
    this.ans = 0
  }
  handlePlusMinus(n) {
      console.log(n)
      let { content } = this.state;
      if (content.charAt(0) === '-') {
        this.setState({
          content : content.slice(1)
        })
      }else {
        this.setState( {
          content : '-' + content
        })
      }
  }

  handleNumButton(n) {
    console.log(n, 'cicked!')
    if (n === 'AC') {
      this.setState({
        content : '0',
        waitingforoperand: false,
        operatorPresent: ''
      })
    }else {
      var content = this.state.content
      if (content === '0') {
        this.setState( {
          content : n
        })
      }else {
        this.setState({
          content : this.state.content + n
        })
      }
    }
  }

  handleDotButton() {
    let {content} = this.state;
    if (content.indexOf('.') === -1) {
      this.setState({
        'content' : content + '.'
      })
    }
  }
  handleOpButton(op) {
    console.log(op)
    let {content} = this.state
    let {waitingforoperand} = this.state
    //let {operatorPresent} = this.state
    if (!waitingforoperand) {
      this.A = parseFloat(content)
      this.setState({
        content : content + op,
        waitingforoperand : true,
        operatorPresent : op
      })
    }
  }
  handleEqButton() {
    let {operatorPresent, content} = this.state
    if (operatorPresent === '') {
      console.log('nothing to calculate')
    }else {
      let index = content.indexOf(operatorPresent)
      console.log(index)
      this.B = parseFloat(content.slice(index+1))
      switch(operatorPresent) {
        case '+': 
          this.ans = this.A + this.B
          break 
        case '-':
          this.ans = this.A - this.B
          break
        case '*':
          this.ans = this.A * this.B
          break
        case '/':
          if (this.B === 0) {
            this.ans = 0
          }else {
            this.ans = this.A / this.B
          }
          break
      }
      this.setState({
        operatorPresent: '',
        content : String(this.ans),
        waitingforoperand: false
      })
    }
  }
  handleDelButton() {
    console.log('delete button pressed')
    let {content} = this.state
    let lastChar = content[content.length - 1]
    if (lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') {
      this.setState({
        content : content.slice(0, content.length - 1),
        waitingforoperand : false,
        operatorPresent : ''
      })
    }else {
      this.setState({
        content : content.slice(0, content.length - 1)
      })
    }

  }
  render() {
    console.log(this.state)
    return (
      <div className="calculator">
        <div className="displayarea">{this.state.content}</div>
        <div className="numberarea">
          <button className="number" onClick={() => this.handleNumButton('1')}>1</button>
          <button className="number" onClick={() => this.handleNumButton('2')}>2</button>
          <button className="number" onClick={() => this.handleNumButton('3')}>3</button>
          <button className="number" onClick={() => this.handleNumButton('4')}>4</button>
          <button className="number" onClick={() => this.handleNumButton('5')}>5</button>
          <button className="number" onClick={() => this.handleNumButton('6')}>6</button>
          <button className="number" onClick={() => this.handleNumButton('7')}>7</button>
          <button className="number" onClick={() => this.handleNumButton('8')}>8</button>
          <button className="number" onClick={() => this.handleNumButton('9')}>9</button>
          <button className="number" onClick={() => this.handleNumButton('0')}>0</button>
          <button className="number" onClick={() => this.handleNumButton('AC')}>AC</button>
          <button className="operator" onClick={() => this.handlePlusMinus('+/-')}>+/-</button>
          <button className="number" onClick={() => this.handleOpButton('+')}>+</button>
          <button className="number" onClick={() => this.handleOpButton('-')}>-</button>
          <button className="number" onClick={() => this.handleOpButton('*')}>*</button>
          <button className="number" onClick={() => this.handleOpButton('/')}>/</button>
          <button className="number" onClick={() => this.handleDotButton()}>.</button>
          <button className="number" onClick={() => this.handleEqButton()}>=</button>
          <button className="del" onClick={() => this.handleDelButton()}>del</button>
        </div>
      </div>
    );
  }
}

export default App;

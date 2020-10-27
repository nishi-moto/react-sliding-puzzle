import React, { Component } from 'react';
import './App.css';
import Tile from './Tile';
class App extends Component {
  constructor(props) {
    super(props);
    this.puzzle = [];
    this.state = {
      tilesPosition: [],
      score: 0,
      inputSize: 3,
      size: 0,
      empty: 0,
      length: 0,
      message: 'Insert the puzzle size:',
      messageClass: 'Message',
    };
  }

  initPuzzle = () => {
    const size = this.state.inputSize;
    const length = size * size;
    const empty = length - 1;
    this.puzzle = [];

    for (let i = 0; i < length - 1; i++) {
      this.puzzle[i] = i;
    }
    this.puzzle = this.puzzle.sort(() => Math.random() - 0.5);
    this.puzzle[empty] = null;
    this.setState({
      ...{
        tilesPosition: this.puzzle,
        size: size,
        length: length,
        empty: empty,
        message: 'Insert the puzzle size:',
        messageClass: 'Message',
      }
    });
  }

  componentDidMount = () => {
    this.initPuzzle();
  }

  renderPuzzle = () => {
    const percentage = `${Math.floor(100 / this.state.size)}%`;
    return this.state.tilesPosition.map((cell, i) => (
      <div className="Board-cell" style={{ width: percentage, paddingBottom: percentage }} key={i}>
        <Tile correctPosition={i} currentPosition={cell} moveHandler={this.move} />
      </div>
    ))
  }

  win = () => {
    // const arrTestWin =  [0,1,2,3,4,5,6,7,8,null];
    // const arrTestWrong =  [0,2,1,3,4,5,6,7,8,null];
    // const arrTestZero =  [null,1,2,3,4,5,6,7,8,0];
    const winCount = this.state.tilesPosition.filter((value, i) => {
      return value === i  
    });

    if(winCount.length === this.state.length){
      alert('YOU WIN!');
    }
  }

  line = (tile) => {
    return Math.floor(tile / this.state.size);
  }

  swapTiles = (from, to) => {
    const puzzle = this.state.tilesPosition;
    [puzzle[from], puzzle[to]] = [puzzle[to], puzzle[from]];
    this.setState({
      tilesPosition: puzzle,
      empty: from,
      score: (this.state.score + 1),
    });
    this.win();
  }

  canMove = (tile) => {
    const emptyLine = this.line(this.state.empty);
    const tileLine = this.line(tile);

    return Math.abs(
      Math.abs(emptyLine - tileLine) - (Math.floor(Math.abs(tile - this.state.empty) / this.state.size))
    ) === 0;
  }

  move = (tile) => {
    if (!this.canMove(tile)) {
      return;
    }
    this.swapTiles(tile, this.state.empty);
  }

  onClickSizeHandler = event => {
    const value = parseInt(this.state.inputSize);
    console.log(value);
   
    if(value > 1 && typeof value === 'number'){
      this.initPuzzle();
    }
    else if(value <= 1){
      this.setState({
        ...{
          message: 'The number should be at least 2!',
          messageClass: 'Error',
        }
      });
    }
    else{
      this.setState({
        ...{
          message: 'Just numbers are allowed!',
          messageClass: 'Error',
        }
      });
    }
  }

  onChangeSizeHandler = event => {
    this.setState({
      ...{
        inputSize: event.target.value,
      }
    });

  };

  render() {
    return (
      <div className="App">
        <h1>SLIDING PUZZLE</h1>
        <div>   
          <div className={this.state.messageClass}>         
            <p>{this.state.message}</p>
          </div>
          <label>Size: </label>
          <input maxlength="1" size="3" name="inputSize" value={this.state.inputSize} placeholder="" onChange={this.onChangeSizeHandler} required/>
          <button type="button" onClick={this.onClickSizeHandler}> GO! </button>
        </div>
        <h2>MOVES: {this.state.score}</h2>
        <div className="Board">{this.renderPuzzle()}</div>
      </div>
    )
  }
}

export default App;

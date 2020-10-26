import React, { Component } from 'react';
import './App.css';
import Tile from './Tile';

class App extends Component {
  constructor(props) {
    super(props);
    this.size = 3;
    this.length = this.size * this.size;
    this.puzzle = [];
    this.percentage = `${Math.floor(100 / this.size)}%`;
    this.state = {
      tilesPosition: [],
      empty : this.length - 1
    };
  }

  initPuzzle = () => {
    for (let i = 0; i < this.length - 1; i++) {
      this.puzzle[i] = i;
    }    
    this.puzzle = this.puzzle.sort(() => Math.random() - 0.5);
    this.puzzle[this.state.empty] = null;
    this.setState({ ...{tilesPosition: this.puzzle}});
  }

  componentDidMount = () => {
    this.initPuzzle();
  }
  
  renderPuzzle = () => {
    return this.state.tilesPosition.map((cell, i) => (
      <div className="Board-cell" style={{ width: this.percentage, paddingBottom: this.percentage }} key={i}>
        <Tile correctPosition={i} currentPosition={cell} moveHandler={this.move}/>
      </div>
    ))
  }
 
  line = (tile) => {
    return Math.floor(tile / this.size);
  }

  swapTiles = (from, to) => {
    const puzzle = this.state.tilesPosition;
    [puzzle[from], puzzle[to]] = [puzzle[to], puzzle[from]];
    this.setState({
      tilesPosition: puzzle,
      empty : from
    });
  }

  canMove = (tile) => {
    const emptyLine = this.line(this.state.empty, this.size);
    const tileLine = this.line(tile, this.size);

    return Math.abs(
      Math.abs(emptyLine - tileLine) - (Math.floor(Math.abs(tile - this.state.empty) / this.size))
    ) === 0;
  }

  move = (tile) => {
    if (!this.canMove(tile)) {
      return;
    }
    this.swapTiles(tile, this.state.empty);
  }

  render() {
    return (
      <div className="App">
        <h1>Sliding Puzzle</h1>
         <div className="Board">{this.renderPuzzle()}</div> 
      </div>
    )
  }
}

export default App;

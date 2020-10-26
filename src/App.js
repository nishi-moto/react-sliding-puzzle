import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import Tile from './Tile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tilesPosition : [],
    };
    this.size = 3;
    this.length = this.size * this.size;
    this.puzzle = [];
    this.empty = this.length - 1;
    this.percentage = `${Math.floor(100 / this.size)}%`;
  }


  initPuzzle = () => {
    for (let i = 0; i < this.length-1; i++) {
      this.puzzle[i] = i;
    } 
    this.puzzle = this.puzzle.sort(() => Math.random() - 0.5);
    this.puzzle[this.empty] = null;
    return this.populatePuzzle();
  }

  populatePuzzle = () => {
    console.log(this.puzzle);
    return this.puzzle.map((cell, i) => (
      <div className="Board-cell" style={{ width: this.percentage, 'padding-bottom': this.percentage }}>
        <Tile correctPosition={i < this.length - 1 ? i : null} currentPosition={cell}/>
      </div>
    ))
  }


  render() {
    return (
      <div className="App">
        <h1>Sliding Puzzle</h1>
        <div className="Board">{this.initPuzzle()}</div>
      </div>
    )

  }

}

export default App;

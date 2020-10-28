import React, { Component } from 'react';
import Tile from './Tile';
import Settings from './Settings';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tilesPosition: [],
            score: 0,
            width: 0,
            height: 0,
            empty: 0,
            length: 0,
            win: false,
        };
    }

    initPuzzle = (width, height) => {
        const length = width * height;
        const empty = length - 1;
        let puzzle = [];

        for (let i = 0; i < empty; i++) {
            puzzle[i] = i;
        }
        puzzle = puzzle.sort(() => Math.random() - 0.5);
        puzzle[empty] = null;

        this.setState({
            ...{
                tilesPosition: puzzle,
                width: width,
                height: height,
                length: length,
                empty: empty,
                score: 0,
                win: false,
            }
        });
    }

    componentDidMount = () => {
        this.initPuzzle(3, 3);
    }

    renderPuzzle = () => {
        const percentageWidth = `${Math.floor(100 / this.state.width)}%`;
        return this.state.tilesPosition.map((cell, i) => (
            <div className="Board-cell" style={{ width: percentageWidth, paddingBottom: percentageWidth }} key={i}>
                <Tile correctPosition={i} currentPosition={cell} empty={this.state.empty} moveHandler={this.move} />
            </div>
        ))
    }

    win = () => {
        if (this.state.win === true) {
            return;
        }
        const winCount = this.state.tilesPosition.filter((value, i) => value === i);
        if (winCount.length === this.state.tilesPosition.length - 1) {
            setTimeout(() => { alert('YOU WIN!'); }, 500);
            this.setState({ ...{ win: true } });
        }
    }

    row = (tile) => {
        return Math.floor(tile / this.state.width);
    }

    swapTiles = (from, to) => {
        const puzzle = [...this.state.tilesPosition];
        [puzzle[from], puzzle[to]] = [puzzle[to], puzzle[from]];
        this.setState({
            ...{
                tilesPosition: puzzle,
                empty: from,
                score: (this.state.score + 1),
            }
        });
    }

    canMoveOnSameRow = (tile) => {
        const emptyRow = this.row(this.state.empty);
        const tileRow = this.row(tile);
        return Math.abs(tile - this.state.empty) === 1 && emptyRow === tileRow;
    }

    canMoveOnSameColumn = (tile) => {
        return Math.abs(tile - this.state.empty) === this.state.width;
    }

    canMove = (tile) => {
        return (this.canMoveOnSameColumn(tile) || this.canMoveOnSameRow(tile)) && !this.state.win;
    }

    move = (tile) => {
        if (this.canMove(tile)) {
            this.swapTiles(tile, this.state.empty);
        }
    }

    componentDidUpdate = () => {
        this.win();
    }

    render() {
        return (
            <div className="Game">

                <div>
                    <Settings initPuzzle={this.initPuzzle} />
                </div>
                <h2>MOVES: {this.state.score}</h2>
                <div className="Board">{this.renderPuzzle()}</div>
            </div>
        )
    }
}

export default Game;
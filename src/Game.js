import React, { Component } from 'react';
import Tile from './Tile';

class Game extends Component {
    constructor(props) {
        super(props);
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
        let puzzle = [];

        for (let i = 0; i < empty; i++) {
            puzzle[i] = i;
        }
        puzzle = puzzle.sort(() => Math.random() - 0.5);
        puzzle[empty] = null;

        this.setState({
            ...{
                tilesPosition: puzzle,
                size: size,
                length: length,
                empty: empty,
                message: 'Insert the puzzle size:',
                messageClass: 'Message',
                score: 0,
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
                <Tile correctPosition={i} currentPosition={cell} empty={this.state.empty} moveHandler={this.move} />
            </div>
        ))
    }

    win = () => {
        const winCount = this.state.tilesPosition.filter((value, i) => value === i);
        if (winCount.length === this.state.tilesPosition.length - 1) {
            alert('YOU WIN!');
        }
    }

    row = (tile) => {
        return Math.floor(tile / this.state.size);
    }

    swapTiles = (from, to) => {
        const puzzle = [...this.state.tilesPosition];
        [puzzle[from], puzzle[to]] = [puzzle[to], puzzle[from]];
        this.setState({...{
            tilesPosition: puzzle,
            empty: from,
            score: (this.state.score + 1),
        }});
    }

    canMoveOnSameRow = (tile) => {
        const emptyRow = this.row(this.state.empty);
        const tileRow = this.row(tile);
        return Math.abs(tile - this.state.empty) === 1 && emptyRow === tileRow;
    }

    canMoveOnSameColumn = (tile) => {
        return Math.abs(tile - this.state.empty) === this.state.size;
    }

    canMove = (tile) => {
        return  this.canMoveOnSameColumn(tile) || this.canMoveOnSameRow(tile);
    }

    move = (tile) => {
        if (this.canMove(tile)) {
            this.swapTiles(tile, this.state.empty);
        }
    }

    onClickSizeHandler = event => {
        const value = this.state.inputSize;

        if (value > 1 && typeof value === 'number') {
            this.initPuzzle();
        }
        else if (value <= 1) {
            this.setState({
                ...{
                    message: 'The number should be at least 2!',
                    messageClass: 'Error',
                }
            });
        }
        else {
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
                inputSize: parseInt(event.target.value),
            }
        });
    };

    componentDidUpdate = () => {
        this.win();
    }

    render() {
        return (
            <div className="Game">

                <div>
                    <div className={this.state.messageClass}>
                        <p>{this.state.message}</p>
                    </div>
                    <label>Size: </label>
                    <input maxLength="1" size="3" name="inputSize" value={this.state.inputSize} placeholder="" onChange={this.onChangeSizeHandler} required />
                    <button type="button" onClick={this.onClickSizeHandler}> GO! </button>
                </div>
                <h2>MOVES: {this.state.score}</h2>
                <div className="Board">{this.renderPuzzle()}</div>
            </div>
        )
    }
}

export default Game;
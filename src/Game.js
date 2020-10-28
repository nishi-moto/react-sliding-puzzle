import React, { Component } from 'react';
import Tile from './Tile';

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tilesPosition: [],
            score: 0,
            inputSizeX: 3,
            inputSizeY: 3,
            x: 0,
            y: 0,
            empty: 0,
            length: 0,
            message: 'Insert the puzzle size:',
            messageClass: 'Message',
            win: false,
        };
    }

    initPuzzle = () => {
        const x = this.state.inputSizeX;
        const y = this.state.inputSizeY;
        const length = x * y;
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
                x: x,
                y: y,
                length: length,
                empty: empty,
                message: 'Insert the puzzle size:',
                messageClass: 'Message',
                score: 0,
                win: false,
            }
        });
    }

    componentDidMount = () => {
        this.initPuzzle();
    }

    renderPuzzle = () => {
        const percentageX = `${Math.floor(100 / this.state.x)}%`;
        return this.state.tilesPosition.map((cell, i) => (
            <div className="Board-cell" style={{ width: percentageX, paddingBottom: percentageX }} key={i}>
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
        return Math.floor(tile / this.state.x);
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
        return Math.abs(tile - this.state.empty) === this.state.x;
    }

    canMove = (tile) => {
        return (this.canMoveOnSameColumn(tile) || this.canMoveOnSameRow(tile)) && !this.state.win;
    }

    move = (tile) => {
        if (this.canMove(tile)) {
            this.swapTiles(tile, this.state.empty);
        }
    }

    onClickSizeHandler = event => {
        const valueX = this.state.inputSizeX;
        const valueY = this.state.inputSizeY;

        console.log(typeof valueX, typeof valueY);

        if (valueX > 1 && valueY > 1 && typeof valueX === 'number' && typeof valueY === 'number') {
            this.initPuzzle();
        }
        else if (valueX <= 1 || valueY <= 1) {
            this.setState({
                ...{
                    message: 'The number should be at least 3!',
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

    onChangeSizeXHandler = event => {
        this.setState({
            ...{
                inputSizeX: parseInt(event.target.value),
            }
        });
    };

    onChangeSizeYHandler = event => {
        this.setState({
            ...{
                inputSizeY: parseInt(event.target.value),
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
                    <div className="Settings">
                        <label>Width: </label>
                        <input maxLength="1" size="2" name="inputX" value={this.state.inputX} placeholder="" onChange={this.onChangeSizeXHandler} required />
                        <label>  Height: </label>
                        <input maxLength="1" size="2" name="inputY" value={this.state.inputY} placeholder="" onChange={this.onChangeSizeYHandler} required />
                        <button className="ButtonSize" type="button" onClick={this.onClickSizeHandler}> GO! </button>
                    </div>
                </div>
                <h2>MOVES: {this.state.score}</h2>
                <div className="Board">{this.renderPuzzle()}</div>
            </div>
        )
    }
}

export default Game;
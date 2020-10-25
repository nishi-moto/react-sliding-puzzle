import React from 'react';
import Tile from './Tile';


function Board() {
    const size = 3;
    const length = size*size;
    const percentage = `${Math.floor(100/size)}%`;
    let board = [];

    for(let i = 0; i < length; i++){
        board[i] = 
        <div className="Board-cell" style={{width: percentage, 'padding-bottom': percentage}}>
            <Tile correctPostition={ i < length-1 ? i : null}/> 
       </div>;
    }

    return (<div className="Board">{board}</div>);
}

export default Board;

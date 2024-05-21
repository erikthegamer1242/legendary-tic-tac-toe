import React from 'react';
import Board from './Board.jsx';
import generateGridNxN from '../util/GameUtil.jsx';

export default class Game extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            squares: Array(this.props.size * this.props.size).fill(   // Outer squares
                Array(this.props.size * this.props.size).fill(null)), // Inner squares
            localWinners: Array(this.props.size * this.props.size).fill(null),
            lastMoveLocation: {row: null, col: null, outerRow: null, outerCol: null},
            xIsNext: true,
            winner: null,
            nasLocalWinner: Array(this.props.size * this.props.size).fill(null)
        };
        this.renderBoard = this.renderBoard.bind(this);
    }

    isCurrentBoard(idx)
    {
        if (this.state.winner)
            return false;

        const lastRow = this.state.lastMoveLocation.row;
        const lastCol = this.state.lastMoveLocation.col;
        if (lastRow === null || lastCol === null)
        {
            return true;
        }
        else
        {
            const currentBoard = lastRow * this.props.size + lastCol;
            const squares = this.state.squares[currentBoard];
            if (this.state.localWinners[currentBoard])
            {
                var filled = true;
                for (var square=0; square < squares.length; square++) {
                    console.log(squares[square]);
                    if (squares[square] == null) filled = false;
                }

                if (filled) return true;
                else return idx === currentBoard;
                
            }
            else
            {
                return idx === currentBoard;
            }
        }
    }

    handleClick(inner_idx, outer_idx)
    {
        var nasLocalWinner = this.state.nasLocalWinner.slice();
        const size = this.props.size;
        var outerSquares = this.state.squares.slice();
        var squares = this.state.squares[outer_idx].slice();
        var localWinners = this.state.localWinners.slice();
        if (this.state.winner || !this.isCurrentBoard(outer_idx) || squares[inner_idx])
        {
            console.log('Invalid move!')
            return;
        }
        squares[inner_idx] = this.state.xIsNext ? 'X' : 'O';
        outerSquares[outer_idx] = squares;
        const lastMoveLocation = {
            row: Math.floor(inner_idx / size),
            col: inner_idx % size,
            outerRow: Math.floor(outer_idx / size),
            outerCol: outer_idx % size
        };

        const newWinnerLine = this.calculateWinner(squares, lastMoveLocation, outer_idx, localWinners[outer_idx]);
        localWinners[outer_idx] = newWinnerLine && squares[newWinnerLine[0]];
        if (this.state.nasLocalWinner[outer_idx] !== null && localWinners[outer_idx] === null) localWinners[outer_idx] = this.state.nasLocalWinner[outer_idx];
        const globalWinnerLine = this.calculateGlobal(localWinners, {row: lastMoveLocation.outerRow, col: lastMoveLocation.outerCol});
        const winner = globalWinnerLine ? localWinners[globalWinnerLine[0]] : null;
        this.setState((prevState, props) => ({
            squares: outerSquares,
            localWinners: localWinners,
            lastMoveLocation: lastMoveLocation,
            xIsNext: !this.state.xIsNext,
            winner: winner,
            nasLocalWinner: nasLocalWinner
        }));
    }

    calculateGlobal(squares, lastMoveLocation)
    {
        //if (this.state.nasLocalWinner[idx] !== null && localWinners === null) localWinners = this.state.nasLocalWinner[idx];
        if (!lastMoveLocation || lastMoveLocation.row===null || lastMoveLocation.col===null)
          {
            return null;
          }  

        const size = Math.sqrt(squares.length);
        const x = lastMoveLocation.row;
        const y = lastMoveLocation.col;
        const lastPlayer = squares[x*size + y];
        if (lastPlayer === null)
            return null;

        // Generate possible winner lines for last move
        var lines = {row: [], col: [], diag: [], antidiag: []};
        // Row
        for (let i = 0; i < size; i++)
        {
            lines.row.push(x*size + i);
        }
        // Col
        for (let i = 0; i < size; i++)
        {
            lines.col.push(i*size + y);
        }
        // Diagonal
        if (x === y)
        {
            for (let i = 0; i < size; i++)
            {
                lines.diag.push(i*size + i);
            }
        }
        // Anti-diagonal
        if (x + y === size - 1)
        {
            for (let i = 0; i < size; i++)
            {
                lines.antidiag.push(i*size + size-1-i);
            }
        }

        // Chech values on each candidate line
        for (let prop in lines)
        {
            const line = lines[prop];
            if (line.length !== size)
                continue;
            const result = line.reduce((acc, index) => acc && (squares[index] === lastPlayer), true);
            if (result)
            {
                return line;
            }
        }
        return null;
    }

    calculateWinner(squares, lastMoveLocation, idx, localWinners)
    {
        if (!lastMoveLocation || lastMoveLocation.row===null || lastMoveLocation.col===null || localWinners !== null)
          {
            this.state.nasLocalWinner[idx] = localWinners;
            return null;
          }  

        const size = Math.sqrt(squares.length);
        const x = lastMoveLocation.row;
        const y = lastMoveLocation.col;
        const lastPlayer = squares[x*size + y];
        if (lastPlayer === null)
            return null;

        // Generate possible winner lines for last move
        var lines = {row: [], col: [], diag: [], antidiag: []};
        // Row
        for (let i = 0; i < size; i++)
        {
            lines.row.push(x*size + i);
        }
        // Col
        for (let i = 0; i < size; i++)
        {
            lines.col.push(i*size + y);
        }
        // Diagonal
        if (x === y)
        {
            for (let i = 0; i < size; i++)
            {
                lines.diag.push(i*size + i);
            }
        }
        // Anti-diagonal
        if (x + y === size - 1)
        {
            for (let i = 0; i < size; i++)
            {
                lines.antidiag.push(i*size + size-1-i);
            }
        }

        // Chech values on each candidate line
        for (let prop in lines)
        {
            const line = lines[prop];
            if (line.length !== size)
                continue;
            const result = line.reduce((acc, index) => acc && (squares[index] === lastPlayer), true);
            if (result)
            {
                return line;
            }
        }
        return null;
    }

    renderBoard(i)
    {
        return (
            <Board key={i}
                size={this.props.size}
                squares={this.state.squares[i]}
                winner={this.state.localWinners[i]}
                clickable={this.isCurrentBoard(i)}
                onClick={(p) => this.handleClick(p, i)}
            />
        );
    }

    render()
    {
        let status;
        if (this.state.winner)
        {
            status = this.state.winner + ' wins!';
            const lastOuterMove = {row: this.state.lastMoveLocation.outerRow,
                col: this.state.lastMoveLocation.outerCol};
        }
        else
        {
            if (this.state.localWinners.indexOf(null) === -1)
            {
                status = 'Draw! Everybody wins!! :D';
            }
            else
            {
                status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
            }
        }
        const grid = generateGridNxN('game', this.props.size, this.renderBoard);
        return (
            <div className='game-container stretch-to-bottom'>
                <div className="game-grid">
                    {grid}
                </div>
                <br/>
                <br/>
                {this.props.renderInfo &&
                        <div className="game-info">
                            <div id='status'>{status}</div>
                        </div>
                    }
            </div>
        );
    }
}
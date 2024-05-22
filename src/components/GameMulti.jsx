import React, { useEffect, useState } from 'react';
import Board from './Board.jsx';
import generateGridNxN from '../util/GameUtil.jsx';
import { addData, db } from '../util/db.jsx';
import { collection, onSnapshot } from "firebase/firestore";
import { useTranslation } from 'react-i18next';

const GameMulti = ({ match, size, renderInfo }) => {
    
    const [squares, setSquares] = useState(Array(size * size).fill(Array(size * size).fill(null)))
    useEffect(() => {
        setSquares(Array(size * size).fill(Array(size * size).fill(null)))
    }, [match])
    const [localWinners, setLocalWinners] = useState(Array(size * size).fill(null))
    const [lastMoveLocation, setLastMoveLocation] = useState({row: null, col: null, outerRow: null, outerCol: null})
    const [xIsNext, setXIsNext] = useState(true)
    const [winner, setWinner] = useState(null)
    const [nasLocalWinner, setNasLocalWinner] = useState(Array(size * size).fill(null))

    const [inner_idxLoc, setInner_idxLoc] = useState(null);
    const [outer_idxLoc, setOuter_idxLoc] = useState(null);

    const isCurrentBoard = (idx) => {
        if (winner)
            return false;

        const lastRow = lastMoveLocation.row;
        const lastCol = lastMoveLocation.col;
        if (lastRow === null || lastCol === null)
        {
            return true;
        }
        else
        {
            const currentBoard = lastRow * size + lastCol;
            const squaresLoc = squares[currentBoard];
            if (localWinners[currentBoard])
            {
                var filled = true;
                for (var square=0; square < squaresLoc.length; square++) {
                    console.log(squaresLoc[square]);
                    if (squaresLoc[square] == null) filled = false;
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

    const handleClick = (inner_idx, outer_idx) => {
        if (inner_idx != null && outer_idx != null) {
            console.log("inner_idxH", inner_idx);
            console.log("outer_idxH", outer_idx);   
            var outerSquares = squares.slice();
            var squaresLoc = squares[outer_idx].slice();
            var localWinnersLoc = localWinners.slice();
            if (winner || ! isCurrentBoard(outer_idx) || squaresLoc[inner_idx])
            {
                console.log('Invalid move!')
                return;
            }
            squaresLoc[inner_idx] = xIsNext ? 'X' : 'O';
            outerSquares[outer_idx] = squaresLoc;
            const lastMoveLocationLoc = {
                row: Math.floor(inner_idx / size),
                col: inner_idx % size,
                outerRow: Math.floor(outer_idx / size),
                outerCol: outer_idx % size
            };

            const newWinnerLine = calculateWinner(squaresLoc, lastMoveLocationLoc, outer_idx, localWinnersLoc[outer_idx]);
            localWinnersLoc[outer_idx] = newWinnerLine && squaresLoc[newWinnerLine[0]];
            if (nasLocalWinner[outer_idx] !== null && localWinnersLoc[outer_idx] === null) localWinnersLoc[outer_idx] = nasLocalWinner[outer_idx];
            const globalWinnerLine = calculateGlobal(localWinnersLoc, {row: lastMoveLocationLoc.outerRow, col: lastMoveLocationLoc.outerCol});
            const winnerLoc = globalWinnerLine ? localWinnersLoc[globalWinnerLine[0]] : null;
            setSquares(outerSquares)
            setLocalWinners(localWinnersLoc)
            setLastMoveLocation(lastMoveLocationLoc)
            setXIsNext(!xIsNext)
            setWinner(winnerLoc)
            setNasLocalWinner(nasLocalWinner)
            addData(outerSquares, inner_idx, outer_idx, localWinners, lastMoveLocation, xIsNext, winner, nasLocalWinner);
        }
        else {
            console.log("Error");
            return;
        }
    }

    const calculateGlobal = (squaresLoc, lastMoveLocationLoc) => {
        if (!lastMoveLocationLoc || lastMoveLocationLoc.row===null || lastMoveLocationLoc.col===null)
            {
            return null;
            }  

        const size = Math.sqrt(squaresLoc.length);
        const x = lastMoveLocationLoc.row;
        const y = lastMoveLocationLoc.col;
        const lastPlayer = squaresLoc[x*size + y];
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
            const result = line.reduce((acc, index) => acc && (squaresLoc[index] === lastPlayer), true);
            if (result)
            {
                return line;
            }
        }
        return null;
    }

    const calculateWinner = (squaresLoc, lastMoveLocationLoc, idx, localWinnersLoc) => {
        if (!lastMoveLocationLoc || lastMoveLocationLoc.row===null || lastMoveLocationLoc.col===null || localWinnersLoc !== null)
          {
            nasLocalWinner[idx] = localWinnersLoc;
            return null;
          }  

        const size = Math.sqrt(squaresLoc.length);
        const x = lastMoveLocationLoc.row;
        const y = lastMoveLocationLoc.col;
        const lastPlayer = squaresLoc[x*size + y];
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
            const result = line.reduce((acc, index) => acc && (squaresLoc[index] === lastPlayer), true);
            if (result)
            {
                return line;
            }
        }
        return null;
    }

    const renderBoard = (i) => {
        return (
            <Board key={i}
                size={size}
                squares={squares[i]}
                winner={localWinners[i]}
                clickable={isCurrentBoard(i)}
                onClick={(p) => handleClick(p, i)}
            />
        );
    }

    const[t, i18n]= useTranslation("global");

    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        console.log("Promijenio jezik na: " + lang);
    }

    useEffect(() => {
        console.log("recv")
        const unsubscribe = onSnapshot(collection(db, "moves"), (collection) => {
            const squaresFb = [];
            collection.forEach((doc) => {
                let newSquares = doc.data().squares;
                const outer_idx2 = newSquares[82];
                const inner_idx2 = newSquares[81];
                //setLocalWinners(newSquares[83])
                // setLastMoveLocation(newSquares[84])
                // setXIsNext(newSquares[85])
                // setWinner(newSquares[86])
                // setNasLocalWinner(newSquares[87])
                setInner_idxLoc(inner_idx2);
                setOuter_idxLoc(outer_idx2);
                while(newSquares.length-2) squaresFb.push(newSquares.splice(0,9));
                console.log("fetchSquares",squaresFb);
                console.log("fetchInner",inner_idxLoc);
                console.log("fetchOuter",outer_idxLoc);
                if (squaresFb.length > 0) {
                    setSquares(squaresFb);
                    //handleClick(innner_idx, outer_idx);
                }
                else {
                    console.log("Error parsing");
                }
            });
        });
        return () => unsubscribe();
    }, [])

    let status;
        if (winner)
        {
            status = winner + ' wins!';
            const lastOuterMove = {row: lastMoveLocation.outerRow,
                col: lastMoveLocation.outerCol};
        }
        else
        {
            if (localWinners.indexOf(null) === -1)
            {
                status = 'Draw! Everybody wins!! :D';
            }
            else
            {
                status = t("Next_Player") + (xIsNext ? 'X' : 'O');
            }
        }
        const grid = generateGridNxN('game', size, renderBoard);
        return (
            <div className='game-container stretch-to-bottom'>
                <div className="game-grid">
                    {grid}
                </div>
                <br/>
                <br/>
                {renderInfo &&
                        <div className="game-info">
                            <div id='status'>{status}</div>
                        </div>
                    }
            </div>
        );
  };
  
export default GameMulti;
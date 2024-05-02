import React from 'react';
import Square from './Square.jsx';
import generateGridNxN from '../util/GameUtil.jsx';

export default class Board extends React.Component
{
    constructor(props)
    {
        super(props);
        this.renderSquare = this.renderSquare.bind(this);
    }

    renderSquare(i)
    {
        return (
            <Square key={i}
                value={this.props.squares[i]}
                winner={this.props.winner}
                clickable={this.props.clickable}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render()
    {
        return generateGridNxN(
            'board',
            this.props.size,
            this.renderSquare
        );
    }
}
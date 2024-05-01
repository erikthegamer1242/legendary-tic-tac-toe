import { IonGrid, IonRow, IonCol, IonButton  } from '@ionic/react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

import React from 'react';



  interface IProps {
      value?: string;
      onClick?: any;
      squares?: any[];
  }
      
  interface IState {
      history?: any[];
      stepNumber: number;
      xIsNext: Boolean;
  }      
  
  function Square(props: IProps) {
    return (
         <IonButton expand="full" fill="clear" onClick={props.onClick}>{props.value}</IonButton>
    );
  }

  class Board extends React.Component<IProps> {
    renderSquare(i: number) {
      return (
        <Square
          value={this.props.squares![i]}
          onClick={() => this.props.onClick(i)}
        />
      );
    }

    render() {
      return (
       <div>
          <IonGrid>
              <IonRow>
                  <IonCol>{this.renderSquare(0)}</IonCol>
                  <IonCol class="centerCol">{this.renderSquare(1)}</IonCol>
                  <IonCol>{this.renderSquare(2)}</IonCol>
              </IonRow>
              <IonRow class="centerRow">
                  <IonCol>{this.renderSquare(3)}</IonCol>
                  <IonCol class="centerCol">{this.renderSquare(4)}</IonCol>
                  <IonCol>{this.renderSquare(5)}</IonCol>
              </IonRow>
              <IonRow>
                  <IonCol>{this.renderSquare(6)}</IonCol>
                  <IonCol class="centerCol">{this.renderSquare(7)}</IonCol>
                  <IonCol>{this.renderSquare(8)}</IonCol>              
              </IonRow>
          </IonGrid>
        </div>
      );
    }
  }

  class Game extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        history: [
          {
            squares: Array(9).fill(null)
          }
        ],
        stepNumber: 0,
        xIsNext: true
      };
    }

    handleClick(i: number) {
      const history = this.state.history!.slice(0, this.state.stepNumber + 1);
      const current = history![history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares
          }
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
       
    }
    
    computerMove() {
        
      const history = this.state.history!.slice(0, this.state.stepNumber + 1);
      const current = history![history.length - 1];
      const squares = current.squares.slice();
    
      // first let's play defense, does the human "X" have a winning move?
      for (let i = 0; i < 9; i++) {
        if(squares[i] === null) {
          const newsquares = squares.slice();
          newsquares[i] = "X";
          if (calculateWinner(newsquares) === "X") {
            this.handleClick(i);
            return;
          }
        }
      }
        
      // loop here to choose move (remove last param)
      var newscore = -2;
      var score = -2;
      var move = -1;

      for (let i = 0; i < 9; i++) {        
        if(squares[i] === null) {
          const newsquares = squares.slice();
          newsquares[i] = "O";
          newscore = minmax(newsquares, "X");
          if (newscore > score) {
            move = i;
            score = newscore;
          }
        }
      }
      if (move > -1) {
        this.handleClick(move);
      }        
    }

    jumpTo(step: number) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0
      });
    }

    componentDidUpdate() { 
      // OK here we implement computer playing if it is its turn
      if (!this.state.xIsNext) {   
          this.computerMove();
      }
    }

    render() {
       
      const history = this.state.history!;
      const current = history![this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <IonItem key={move} onClick={() => this.jumpTo(move)} detail>
              <IonLabel>{desc}</IonLabel>
           </IonItem>
        );
      });
          
 

      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = "Next player: " + (this.state.xIsNext ? "X" : "O");  
      }
        
      return (
        <div className="game">
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={(i: number) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <IonList>{moves}</IonList>
          </div>
        </div>
      );
    }
  }

  export default Game;
  
  // ========================================
  //ReactDOM.render(<Game />, document.getElementById("root"));

  function calculateWinner(squares: any[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // squares is the board evaluated
  // player "X" human -1  or "O" computer 1
  function minmax(squares: any[], player: string): number {
      
      var winner = null;
      winner = calculateWinner(squares);
      if (winner !== null) {
          return 1;
          /*
          if (winner === player) {
              console.log("winner - player ", winner, player);
            return 1;  
          } else {
              console.log("winner - player ", winner, player);
            return -1;  
          }*/
      }
      
      var move = -1;
      var score = -2;
      
      for (let i = 0; i < 9; i++) {
        if(squares[i] === null) {
            
            const newsquares = squares.slice();
            var newplayer;
            
            newsquares[i] = player;
            if(player === "X") {
                newplayer = "O";
            } else {
                newplayer = "X";
            }
            
            var newscore = -1*minmax(newsquares, newplayer);
            if(newscore > score) {
                
                score = newscore;
                move = i;
            }
        
        }
      }  
      
      if (move === -1) {   
          return 0;
      }
        
      return score;
  }
import React from 'react';
import './Sudoku.css';

class Sudoku extends React.Component {
  render() {
    return (
      <div className="sudoku">
        <h1>Sudoku</h1>
        <div className="board">
          <Board size="3" />
        </div>
      </div>
    );
  }
}

export default Sudoku;

class Board extends React.Component {
  renderSquare(i) {
    return <Square key={i} value={i} />;
  }

  renderRowBlock(row, block) {
    let res = [];
    let firstSquare = this.props.size ** 2 * row + block * this.props.size;

    for (let i=0; i < this.props.size; ++i) {
      res.push(this.renderSquare(firstSquare + i));
    }
    return (
      <div className="board-row-block">
        {res}
      </div>
    );
  }

  renderRow(row) {
    let res = [];

    for (let i=0; i < this.props.size; ++i) {
      res.push(this.renderRowBlock(row, i));
    }
    return (
      <div className="board-row">
        {res}
      </div>
    );
  }

  render() {
    let res = [];

    for (let i=0; i < this.props.size ** 2; ++i) {
      res.push(this.renderRow(i));
    }

    return (
      <div>
        {res}
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <button className="square">
      </button>
    );
  }
}

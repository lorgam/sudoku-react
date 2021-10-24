import React from 'react';
import './Sudoku.css';

class Sudoku extends React.Component {
  render() {
    return (
      <div className="sudoku">
        <h1>Sudoku</h1>
        <Board size="3" />
      </div>
    );
  }
}

export default Sudoku;

class Board extends React.Component {
  constructor(props) {
    super(props);

    let squareSize = this.props.size ** 4;
    let squares = new Array(squareSize);

    for (let i = 0; i < squareSize; ++i) {
      squares[i] = {
        selected: false,
        solution: null
      }
    }

    this.state = {
      squares: squares
    };
    this.selected = -1;

    window.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  // Events
  handleClick(idx) {
    const squares = this.state.squares.slice();

    if (this.selected > -1) {
      squares[this.selected].selected = false;
    }
    this.selected = idx;

    squares[this.selected].selected = true;

    this.setState({squares:squares});
  }

  handleKeyPress(e) {
    let key = parseInt(e.key);
    if (!isNaN(key) && key > 0) {
      if (this.selected == -1) return;

      const squares = this.state.squares.slice();
      squares[this.selected].solution = key;

      this.setState({squares:squares});

      return;
    }
  }

  // Render
  renderSquare(i) {
    return <Square
      key={i}
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  renderRowBlock(row, block) {
    let res = [];
    let firstSquare = this.props.size ** 2 * row + block * this.props.size;

    for (let i=0; i < this.props.size; ++i) {
      res.push(this.renderSquare(firstSquare + i));
    }
    return (
      <div className='board-row-block'>
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
      <div className={ `board-row ${ row % this.props.size == 0 ? 'top-row' : '' }` }>
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
      <div className="board">
        {res}
      </div>
    );
  }
}

class Square extends React.Component {
  render() {
    return (
      <div
        className={`square ${this.props.value.selected ? 'selected' : ''}`}
        onClick={this.props.onClick}>
          {this.props.value.solution}
      </div>
    );
  }
}


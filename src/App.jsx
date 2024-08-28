import Player from "./components/player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log"
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameWinner from "./components/GameWinner"

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]

];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }

  return currentPlayer
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [
    ...initialGameBoard.map((arrayRow) => {
      return [...arrayRow]
  })]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;
  
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[0].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS)
  
  const [gameTurns,setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = deriveGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((prevActivePlayer) => {
    //   return prevActivePlayer === 'X' ? 'O' : 'X'; 
    // })

    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns)
      const updatedTurns = [{ 
        square: {
          row: rowIndex,
          col: colIndex 
        },
        player: currentPlayer,
      },
      ...prevTurns]
      return updatedTurns
    })
  }


  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  function onRestart() {
    setGameTurns([])
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol={'X'} isActive={activePlayer === 'X' } onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol={'O'} isActive={activePlayer === 'O' } onChangeName={handlePlayerNameChange}/>
        </ol>
        {
          (winner || hasDraw) && <GameWinner handleRestart={onRestart} winner={winner}/>
        }
        

        <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare}/>
        {/* <GameBoard activePlayerSymbol={activePlayer} onSelectSquare={handleSelectSquare}/> */}
      </div>
      
      <Log gameTurns={gameTurns}/>

    </main>


  )
}

export default App

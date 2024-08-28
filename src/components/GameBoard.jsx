import React, { useState } from 'react'



const GameBoard = ({onSelectSquare, gameBoard}) => {


    return (
        <ol id='game-board'>
            {
                gameBoard.map((row, rowIndex) => {
                    return <li key={rowIndex}>
                        <ol>
                        {row.map((col, colIndex) => {
                            return <li key={colIndex}>
                                {/* <button onClick={() => handleSelectSquare(rowIndex, colIndex)}> */}
                                <button onClick={() => onSelectSquare(rowIndex, colIndex)}>
                                    {col}
                                </button>
                            </li>

                        })}
                        </ol>
                    </li>
                })
            }
        </ol>
    )
}

export default GameBoard

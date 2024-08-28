import React, {useState} from 'react'

const player = ({ initialName, symbol, isActive, onChangeName}) => {
    
    const [isEditing, setIsEditing] = useState(false)

    const [playerName, setPlayerName] = useState(initialName)
    function handleEdit(){
        setIsEditing((prevIsEditing) => {
           return !prevIsEditing
        })

        if (isEditing) {
            onChangeName(symbol, playerName)
        }

    }

    function handleChange(event) {
        setPlayerName(event.target.value)
    }

  return (
    <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {
                    isEditing ? (
                        <input type="text" value={playerName} onChange={handleChange} />
                    ): (
                        <span className="player-name">{playerName}</span>
                    )
                }
                
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEdit}>
                {
                isEditing ? (
                    'Save'
                ): (
                    'Edit'
                )
            }
            </button>
          </li>
  )
}

export default player

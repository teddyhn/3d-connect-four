import React from 'react'

const Header = ({ roomID, color, currentTurn, gameStart, localGameStart }) => {

  const getOppositeColor = (color) => {
    if (color === "red") return "blue"
    else return "red"
  }

  return (
    <header className='absolute pl-8 pt-6 font-medium flex flex-col'>
      {gameStart
        ? <span>{roomID}</span>
        : null
      }
      {currentTurn && gameStart
        ? <span>It's your turn (<span className={`text-${color}-500 capitalize`}>{color}</span>)</span>
        : null
      }
      {!currentTurn && gameStart
        ? <span>It's your opponent's turn (<span className={`text-${getOppositeColor(color)}-500 capitalize`}>{getOppositeColor(color)}</span>)</span>
        : null
      }
      {localGameStart
        ? <div className="font-semibold text-lg mb-4"><span className={`text-${color}-500 capitalize`}>{color}'s</span> turn</div>
        : null
      }
    </header>
  )
}

export default Header
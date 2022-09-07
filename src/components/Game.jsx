import '../Styles/Game.css';
import { useState, useRef } from 'react';

const Game = ({
    verifyLetter,
    pickedCategory,
    pickedWord,
    letters,
    guessedLetters,
    wrongLetter,
    guesses,
    score,
}) => {

    const [letter, setLetter] = useState("");
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(letter);
        setLetter("")


        letterInputRef.current.focus();
    }
    return (
        <div className="game">
          <p className="points">
            <span>PONTOS: { score }</span>
          </p>
          <h1>Adivinhe a Palavra</h1>
          <h3 className="tip">
            Dica sobre a palavra: <span>{ pickedCategory }</span>
          </h3>
          <p>Voce ainda tem { guesses } tentavia(s)</p>
          <div className="wordContainer">
            {
                letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i}className="letter">{letter}</span>
                    ) : (
                        <span key={i} className="blankSquare"></span>
                    )
                ))
            }
          </div>
          <div className="letterContainer">
            <p>Tente adivinha a letra da palavra: </p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text" 
                    name="letter"
                    maxLength="1"
                    required
                    onChange={(e) => setLetter(e.target.value)}
                    value={letter}
                    ref={letterInputRef}
                />
                <button>Jogar</button>
            </form>
          </div>
          <div className="wrongLettersContainer">
            <p>Letras ja utilizadas:</p>
                {
                    wrongLetter.map((letter, i) => (
                        <span key={i}>{letter}, </span>
                    ))
                }
          </div>
        </div>
    )
}

export default Game;

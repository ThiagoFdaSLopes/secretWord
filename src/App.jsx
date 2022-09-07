// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import End from './components/End';

// Data
import { wordsList } from './data/words';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState( wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetter, setWrongLetter] = useState([]);
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0);



  const pickedCategoryAndWords = useCallback(() => {
    const categorias = Object.keys(words)
    const aleatoryCategories = categorias[Math.floor(Math.random() * Object.keys(categorias).length)];
    const palavra = words[aleatoryCategories][Math.floor(Math.random() * words[aleatoryCategories].length)].toLowerCase()
    palavra.toLowerCase();

    return { aleatoryCategories, palavra }
  }, [words]);

  //start Game
  const startGame = useCallback(() => {
    // Reset 
    clearStates();
    // pegar Palavra e Pegar Categoria
    const { aleatoryCategories, palavra } =  pickedCategoryAndWords();

    let letrasPalvras = palavra.split('')
    setPickedCategory(aleatoryCategories)
    setPickedWord(palavra)
    setLetters(letrasPalvras)

    setGameStage(stages[1].name);
  }, [pickedCategory]);

  const verifyLetter = (letter) => {
    const letterLow = letter.toLowerCase();
    // setGameStage(stages[2].name)

    if(guessedLetters.includes(letterLow) || wrongLetter.includes(letterLow)){
      return;
    }

    if(letters.includes(letterLow)){
      setGuessedLetters((atualGuessedLetters) => [
        ...atualGuessedLetters, letterLow
      ])
    } else {
      setWrongLetter((wrongGuessedLetters) => [
        ...wrongGuessedLetters, letterLow
      ])

      setGuesses((atualGuesses) => atualGuesses - 1 )
    }
  }

  const clearStates = () => {
    setGuessedLetters([]);
    setWrongLetter([]);
  }

  useEffect(() => {
    if(guesses <= 0) {
      clearStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Checando a Win Condition
  useEffect(() => {
    const uniqueLetters = [... new Set(letters)]
    if( guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name ) {
      setScore((actualScore) => actualScore += 100);
      startGame();
    }
  }, [guessedLetters, letters, startGame]);
  
  const retry = () => {
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  }

  return (
    <>
    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={ startGame }/>}
      {gameStage === 'game' &&
        <Game 
          verifyLetter={ verifyLetter }
          pickedCategory={ pickedCategory }
          pickedWord={pickedWord}
          letters={ letters }
          guessedLetters={ guessedLetters }
          wrongLetter={ wrongLetter }
          guesses={ guesses}
          score={ score }
        />
      }
      {gameStage === 'end' && <End retry={ retry } score={ score }/>}
    </div>
    </>
  )
}

export default App;

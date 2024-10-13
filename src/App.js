import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import './App.css';

const quizData = [
  {
    level: 1,
    questions: [
      {
        question: "Quel hook de React est utilisé pour gérer l'état d'un composant?",
        options: ["useEffect", "useState", "useContext", "useReducer"],
        answer: "useState",
      },
      {
        question: "Quelle méthode est utilisée pour créer un effet de bord dans un composant React?",
        options: ["componentDidMount", "useEffect", "componentDidUpdate", "render"],
        answer: "useEffect",
      },
      {
        question: "Quel est le principal avantage de l'utilisation de React?",
        options: ["Performance", "Simplicité", "Modularité", "Réutilisabilité"],
        answer: "Réutilisabilité",
      },
    ],
  },
  {
    level: 2,
    questions: [
      {
        question: "Quelle bibliothèque est souvent utilisée avec React pour la gestion de l'état?",
        options: ["Vuex", "Redux", "MobX", "Angular"],
        answer: "Redux",
      },
      {
        question: "Quel est le rôle de `React Router`?",
        options: ["Gestion de l'état", "Routage d'application", "API REST", "Gestion des formulaires"],
        answer: "Routage d'application",
      },
      {
        question: "Quel est l'objet principal de la scène dans Three.js?",
        options: ["Camera", "Renderer", "Scene", "Mesh"],
        answer: "Scene",
      },
      {
        question: "Quelle méthode est utilisée pour rendre une scène avec Three.js?",
        options: ["scene.render()", "renderer.render()", "camera.render()", "mesh.render()"],
        answer: "renderer.render()",
      },
      {
        question: "Comment crée-t-on un cube dans Three.js?",
        options: ["new THREE.CubeGeometry()", "new THREE.BoxGeometry()", "new THREE.Cube()", "new THREE.Box()"],
        answer: "new THREE.BoxGeometry()",
      },
    ],
  },
];

const randomNumber = Math.floor(Math.random() * 100) + 1; 

function NumberGuessingGame() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const numGuess = parseInt(guess, 10);
    setAttempts(attempts + 1);

    if (numGuess === randomNumber) {
      setMessage(`Bravo ! Vous avez deviné le bon nombre en ${attempts + 1} tentatives !`);
    } else if (numGuess > randomNumber) {
      setMessage("Trop haut ! Réessayez.");
    } else {
      setMessage("Trop bas ! Réessayez.");
    }
  };

  return (
    <div className="number-guessing-game">
      <h1>Jeu de devinette de nombre</h1>
      <p>Devinez un nombre entre 1 et 100 :</p>
      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleGuess}>Valider</button>
      <p>{message}</p>
    </div>
  );
}

function ColleagueGame() {
  const [formData, setFormData] = useState({
    name: '',
    favoriteColor: '',
    hobby: '',
    favoriteFood: '',
    city: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [guess, setGuess] = useState({
    name: '',
    favoriteColor: '',
    hobby: '',
    favoriteFood: '',
    city: ''
  });
  const [guessResults, setGuessResults] = useState(null);
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setGuessResults(null); // Reset results on submit
  };

  const handleGuessChange = (e) => {
    const { name, value } = e.target;
    setGuess(prevGuess => ({ ...prevGuess, [name]: value }));
  };

  const checkGuess = () => {
    const correctGuesses = Object.keys(guess).filter(key => guess[key] === formData[key]).length;
    setGuessResults({
      message: `Vous avez deviné ${correctGuesses} sur ${Object.keys(formData).length} correctement.`,
      correctAnswers: formData
    });
  };

  const resetGame = () => {
    setFormData({ name: '', favoriteColor: '', hobby: '', favoriteFood: '', city: '' });
    setSubmitted(false);
    setGuess({ name: '', favoriteColor: '', hobby: '', favoriteFood: '', city: '' });
    setGuessResults(null);
  };

  return (
    <div className="colleague-game">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form-container">
          <h1>Formulaire de présentation</h1>
          <div className="form-group">
            <label>
              Nom :
              <input type="text" name="name" onChange={handleFormChange} required />
            </label>
            <label>
              Couleur préférée :
              <input type="text" name="favoriteColor" onChange={handleFormChange} required />
            </label>
            <label>
              Hobby :
              <input type="text" name="hobby" onChange={handleFormChange} required />
            </label>
            <label>
              Plat préféré :
              <input type="text" name="favoriteFood" onChange={handleFormChange} required />
            </label>
            <label>
              Ville d'origine :
              <input type="text" name="city" onChange={handleFormChange} required />
            </label>
          </div>
          <button type="submit">Soumettre</button>
        </form>
      ) : (
        <div>
          <h1>Devinez les réponses du collègue</h1>
          <div className="guess-group">
            <label>
              Nom :
              <input type="text" name="name" onChange={handleGuessChange} />
            </label>
            <label>
              Couleur préférée :
              <input type="text" name="favoriteColor" onChange={handleGuessChange} />
            </label>
            <label>
              Hobby :
              <input type="text" name="hobby" onChange={handleGuessChange} />
            </label>
            <label>
              Plat préféré :
              <input type="text" name="favoriteFood" onChange={handleGuessChange} />
            </label>
            <label>
              Ville d'origine :
              <input type="text" name="city" onChange={handleGuessChange} />
            </label>
          </div>
          <button onClick={checkGuess}>Vérifier les réponses</button>
          {guessResults && (
            <div>
              <p>{guessResults.message}</p>
              <p>Réponses correctes :</p>
              <ul>
                {Object.entries(guessResults.correctAnswers).map(([key, value]) => (
                  <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)} : {value}</li>
                ))}
              </ul>
              <button onClick={resetGame}>Réinitialiser le jeu</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


function App() {
  const [selectedGame, setSelectedGame] = useState(null); 
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const currentCanvas = canvasRef.current; 
  
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
  
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x23373f, 1);
  
    currentCanvas.appendChild(renderer.domElement); 
  
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/face_cube.png');
    const material = new THREE.MeshBasicMaterial({ map: texture });
  
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  
    camera.position.z = 5;
  
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
  
    animate();
  
    return () => {
      if (currentCanvas) {
        currentCanvas.removeChild(renderer.domElement); // Utilisation de la variable locale
      }
    };
  }, []);
  

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const correctAnswer = quizData[currentLevel].questions[currentQuestion].answer;

    if (option === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizData[currentLevel].questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
      } else {
        if (currentLevel < quizData.length - 1) {
          setCurrentLevel(prevLevel => prevLevel + 1);
          setCurrentQuestion(0);
        } else {
          setShowResults(true);
        }
      }
      setSelectedOption(null);
    }, 1000);
  };

  return (
    <div className="App">
      <div ref={canvasRef} className="canvas-container" />
      {selectedGame === null ? (
        <div className="game-selection">
          <h1>Choisissez un jeu</h1>
          <button onClick={() => setSelectedGame("quiz")}>Quiz Connaissance</button>
          <button onClick={() => setSelectedGame("colleagueGame")}>Connaitre sont collègues</button>
          <button onClick={() => setSelectedGame("numberGuessing")}>Devine nombre</button>
        </div>
      ) : selectedGame === "quiz" ? (
        <div>
          {showResults ? (
            <div className="results">
              <h1>Partie terminée</h1>
              <p>Votre score est : {score}</p>
            </div>
          ) : (
            <div className="level-indicator">
              <h1>Niveau {currentLevel + 1}</h1>
              <h2>{quizData[currentLevel].questions[currentQuestion].question}</h2>
              <div>
                {quizData[currentLevel].questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    style={{
                      backgroundColor: selectedOption
                        ? option === quizData[currentLevel].questions[currentQuestion].answer
                          ? "green"
                          : option === selectedOption
                          ? "red"
                          : ""
                        : "",
                    }}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                ))}
              </div>
              <p>Score: {score}</p>
            </div>
          )}
        </div>
      ) : selectedGame === "numberGuessing" ?(
        <NumberGuessingGame />
      ) : (
        <ColleagueGame />
      )}
    </div>
  );
}

export default App;
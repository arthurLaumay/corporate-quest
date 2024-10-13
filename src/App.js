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


function App() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const canvasRef = useRef(null);

  const handleAnswer = (selectedOption) => {
    const currentQuestionData = quizData[currentLevel].questions[currentQuestion];
    
    if (selectedOption === currentQuestionData.answer) {
      setScore(prevScore => prevScore + 1); // Augmente le score
    }
    
    // Passe à la question suivante
    if (currentQuestion < quizData[currentLevel].questions.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
    } else {
      // Passe au niveau suivant ou termine le jeu
      if (currentLevel < quizData.length - 1) {
        setCurrentLevel(prevLevel => prevLevel + 1);
        setCurrentQuestion(0); // Réinitialiser les questions
      } else {
        setShowResults(true); // Afficher les résultats
      }
    }
  };

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x23373f), 0);
    canvasRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1); // Taille du cube à 1 unité
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(`${process.env.PUBLIC_URL}/face_cube.png`); // Chemin de l'image
    const material = new THREE.MeshBasicMaterial({ map: texture }); // Appliquer la texture

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

    const cleanupRef = canvasRef.current; // Copier la référence pour le nettoyage

    return () => {
      if (cleanupRef) {
        while (cleanupRef.firstChild) {
          cleanupRef.removeChild(cleanupRef.firstChild);
        }
      }
    };
  }, []);

  return (
    <div className="App">
      <div className="canvas-container" ref={canvasRef} /> {/* Canevas en arrière-plan */}
      {showResults ? (
        <div className="results">
          <h1>Fin du Jeu</h1>
          <p>Votre score est : {score}</p>
        </div>
      ) : (
        <div className="level-indicator">
          <h1>Niveau {currentLevel + 1}</h1>
          <h2>{quizData[currentLevel].questions[currentQuestion].question}</h2>
          <div>
            {quizData[currentLevel].questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <p>Score: {score}</p>
        </div>
      )}
    </div>
  );
}
export default App;

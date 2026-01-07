import React, { useState, useEffect, useCallback, useRef } from 'react';

interface TerminalGameProps {
  onExit: () => void;
}

const GRID_SIZE = 20;
const SPEED = 100;

const TerminalGame: React.FC<TerminalGameProps> = ({ onExit }) => {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<{ x: number; y: number }>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  const generateFood = useCallback(() => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case 'Escape':
        case 'q':
            if(gameOver) onExit(); // Only exit if game over or paused? 
            else onExit();
            break;
        case 'r':
            if (gameOver) resetGame();
            break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, onExit, gameOver, generateFood]);

  useEffect(() => {
    if (gameOver) return;

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Check Wall Collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check Self Collision
        if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);

        // Check Food Collision
        if (head.x === food.x && head.y === food.y) {
          setScore(s => s + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, SPEED);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [direction, food, gameOver, generateFood]);

  return (
    <div className="flex flex-col items-center justify-center p-4 font-mono w-full h-full bg-black/50 rounded-lg border border-green-500/30">
        <div className="mb-2 text-green-400 font-bold">
            TYPE 'q' TO QUIT | SCORE: {score}
        </div>
        
        <div className="relative bg-black border border-green-800" style={{ width: 300, height: 300 }}>
            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 text-center">
                    <p className="text-red-500 font-bold text-xl mb-2">GAME OVER</p>
                    <p className="text-green-500 mb-4">Score: {score}</p>
                    <p className="text-gray-400 text-sm">Press 'r' to restart</p>
                    <p className="text-gray-400 text-sm">Press 'q' to quit</p>
                </div>
            )}
            
            {/* Grid Rendering */}
            {Array.from({ length: GRID_SIZE }).map((_, y) => (
                <div key={y} className="flex h-[15px]">
                    {Array.from({ length: GRID_SIZE }).map((_, x) => {
                        const isSnake = snake.some(s => s.x === x && s.y === y);
                        const isFood = food.x === x && food.y === y;
                        return (
                            <div 
                                key={x} 
                                className={`w-[15px] h-[15px] ${isSnake ? 'bg-green-500' : isFood ? 'bg-red-500 animate-pulse' : 'bg-transparent'}`}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
  );
};

export default TerminalGame;

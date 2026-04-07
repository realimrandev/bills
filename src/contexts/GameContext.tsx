import { createContext, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export type GameStage = 1 | 2;

export interface GameContextValue {
  stage: GameStage;
  players: string[];
  result: string;
  addPlayer: (name: string) => void;
  removePlayer: (index: number) => void;
  next: () => void;
  generateNewLooser: () => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [stage, setStage] = useState<GameStage>(1);
  const [players, setPlayers] = useState<string[]>([]);
  const [result, setResult] = useState<string>("");

  function addPlayerHandler(player: string) {
    setPlayers((prev) => [...prev, player]);
  }

  function removePlayerHandler(index: number) {
    const newArray = [...players];
    newArray.splice(index, 1);
    setPlayers(newArray);
  }

  function generateLooser() {
    const res = players[Math.floor(Math.random() * players.length)];
    setResult(res ?? "");
  }

  function nextHandler() {
    if (players.length < 2) {
      toast.error("You need more than one player", {
        position: "top-left",
        autoClose: 2000,
      });
      return;
    }

    setStage(2);
    setResult("");

    setTimeout(() => {
      generateLooser();
    }, 2000);
  }

  function resetGameHandler() {
    setStage(1);
    setPlayers([]);
    setResult("");
  }

  const value = useMemo<GameContextValue>(
    () => ({
      stage,
      players,
      result,
      addPlayer: addPlayerHandler,
      removePlayer: removePlayerHandler,
      next: nextHandler,
      generateNewLooser: generateLooser,
      resetGame: resetGameHandler,
    }),
    [stage, players, result]
  );

  return (
    <GameContext.Provider value={value}>
      {children}
      <ToastContainer />
    </GameContext.Provider>
  );
}

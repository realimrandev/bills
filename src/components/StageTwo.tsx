import { useContext } from "react";
import { GameContext } from "@/contexts/GameContext";

export default function StageTwo() {
  const ctx = useContext(GameContext)!;

  return (
    <div className="stage_wrapper">
      <h1 className="app_title">Who pays the bill ?</h1>

      <div className="result_wrapper">
        <h3 className="result_title">The looser is:</h3>
        {ctx.result ? <p className="result_name">{ctx.result}</p> : null}
      </div>

      <div className="result_actions">
        <div
          className="action_button btn_2"
          onClick={() => ctx.generateNewLooser()}
          role="button"
        >
          GET NEW LOOSER
        </div>
        <div
          className="action_button start_over"
          onClick={() => ctx.resetGame()}
          role="button"
        >
          START OVER
        </div>
      </div>
    </div>
  );
}

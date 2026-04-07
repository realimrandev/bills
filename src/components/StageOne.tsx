import { useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { GameContext } from "@/contexts/GameContext";

export default function StageOne() {
  const ctx = useContext(GameContext)!;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<[boolean, string]>([false, ""]);

  function validateInput(value: string) {
    if (value === "") {
      setError([true, "Sorry, you need to add something"]);
      return false;
    }

    if (value.length < 3) {
      setError([true, "Sorry, you need three characters at least"]);
      return false;
    }

    return true;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const value = inputRef.current?.value ?? "";
    const valid = validateInput(value);

    if (!valid) return;

    ctx.addPlayer(value);

    if (inputRef.current) inputRef.current.value = "";

    // reset error
    setError([false, ""]);
  }

  return (
    <div className="stage_wrapper">
      <h1 className="app_title">Who pays the bill ?</h1>

      <Form onSubmit={handleSubmit} className="form_wrapper">
        <Form.Control ref={inputRef} type="text" placeholder="Add player name" />
        <Button type="submit" className="add_btn">
          Add player
        </Button>

        {error[0] ? <div className="alert alert-danger mt-3">{error[1]}</div> : null}
      </Form>

      {ctx.players.length > 0 ? (
        <>
          <div className="list_wrapper">
            <ul className="list-group">
              {ctx.players.map((player, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                >
                  {player}
                  <span
                    className="badge bg-danger"
                    onClick={() => ctx.removePlayer(index)}
                    role="button"
                  >
                    X
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="action_button" onClick={() => ctx.next()} role="button">
            NEXT
          </div>
        </>
      ) : null}
    </div>
  );
}

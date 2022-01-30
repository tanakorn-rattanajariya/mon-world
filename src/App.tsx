import React, { useEffect } from "react";
import { useBoard } from "./Board";
import { Button } from "./components/index";
import { Application, Container } from "pixi.js";
import { Menu } from "./scene";
export default function App() {
  const board = useBoard();
  useEffect(() => {
    const container = new Container();
    new Menu().setup(container);
    board.app.stage.addChild(container);
    document.body.appendChild(board.app.view);
  }, []);
  return <div className="App"></div>;
}

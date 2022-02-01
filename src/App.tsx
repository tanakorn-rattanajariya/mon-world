import React, { useEffect } from "react";
import { useBoard, Board } from "./Board";
import { Button } from "./components/index";
import { Application, Container } from "pixi.js";
import { Menu } from "./scene";
import { Engine } from "./utils/engine";
import { SimpleFadeTransition } from "./utils/transition";
import ScenceFight from "./scene/Fight";
export default function App() {
  const board = useBoard();
  useApp(board);
  const engine = new Engine(board.app, [
    {
      index: 0,
      name: "menu",
      gameScene: new Menu(),
      fadeInTransition: new SimpleFadeTransition(0.1),
      fadeOutTransition: new SimpleFadeTransition(),
    },
    {
      index: 1,
      name: "fight",
      gameScene: new ScenceFight(),
      fadeInTransition: new SimpleFadeTransition(0.1),
      fadeOutTransition: new SimpleFadeTransition(),
    },
  ]);
  board.app.ticker.add((delta) => {
    engine.update(delta);
  });
  return <div className="App"></div>;
}

function useApp(board: Board) {
  useEffect(() => {
    // const container = new Container();
    // new Menu().setup(container);
    // board.app.stage.addChild(container);
    document.body.appendChild(board.app.view);
  }, []);
}

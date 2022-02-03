import { Application, Container } from "pixi.js";
import { AbstractGameScene, SceneState } from "./Scene";
import { Button } from "../components/index";
import narutoPic from "../naruto.jpg";
import { Player } from "../characters/player";
export default class ScenceFight extends AbstractGameScene {
  setup(container: Container) {
    this.sceneState = SceneState.LOAD;

    const naruto = new Player("Naruto", narutoPic, 0, 0);

    container.addChild(naruto.build());
  }

  preTransitionUpdate(delta: number) {}
  sceneUpdate(delta: number) {}
}

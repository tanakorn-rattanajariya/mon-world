import { Application, Container } from "pixi.js";
import { AbstractGameScene, SceneState } from "./Scene";
import { Button } from "../components/index";
export default class ScenceFight extends AbstractGameScene {
  setup(sceneContainer: Container) {
    this.sceneState = SceneState.LOAD;
    sceneContainer.addChild(
      Button({
        text: "Fight Scene",
        x: 0,
        y: 0,
      })
    );
  }
  preTransitionUpdate(delta: number) {}
  sceneUpdate(delta: number) {}
}

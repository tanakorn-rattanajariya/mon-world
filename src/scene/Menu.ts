import { Button } from "../components/index";
import { Container } from "pixi.js";
import { AbstractGameScene, SceneState } from "./Scene";
export default class Menu extends AbstractGameScene {
  setup(sceneContainer: Container) {
    this.sceneState = SceneState.LOAD;
    sceneContainer.addChild(
      Button({
        text: "Start Fight",
        x: 10,
        y: 0,
        onClick: () => {
          this.sceneSwitcher("fight");
        },
      })
    );
  }
  preTransitionUpdate(delta: number) {}
  sceneUpdate(delta: number) {}
}

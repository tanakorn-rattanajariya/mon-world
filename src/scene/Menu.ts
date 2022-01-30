import { Button } from "../components/index";
import { Container } from "pixi.js";
import { AbstractGameScene } from "./Scene";
export default class Menu extends AbstractGameScene {
  setup(sceneContainer: Container) {
    sceneContainer.addChild(
      Button({
        text: "Test",
        x: 0,
        y: 0,
      })
    );
    
  }
  preTransitionUpdate(delta: number) {}
  sceneUpdate(delta: number) {}
}

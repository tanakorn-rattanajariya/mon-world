import { Application, Container } from "pixi.js";

enum TransitionType {
  FADE_IN,
  FADE_OUT,
}
export enum SceneState {
  LOAD,
  PROCESS,
  FINALIZE,
  DONE,
}
export interface GameScene {
  sceneUpdate(delta: number): void;
}
export abstract class AbstractGameScene implements GameScene {
  protected sceneState: SceneState;
  protected app: Application;
  protected sceneSwitcher: (sceneName: string) => void;
  protected fadeInSceneTransition: SceneTransition;
  protected fadeOutSceneTransition: SceneTransition;
  protected sceneContainer: Container;
  private onDone: () => void;
  set fadeInTransition(fadeInSceneTransition: SceneTransition) {
    this.fadeInSceneTransition = fadeInSceneTransition;
  }
  set fadeOutTransition(fadeOutSceneTransition: SceneTransition) {
    this.fadeOutSceneTransition = fadeOutSceneTransition;
  }
  init(app: Application, sceneSwitcher: (sceneName: string) => void): void {
    this.app = app;
    this.sceneSwitcher = sceneSwitcher;
  }
  abstract setup(sceneContainer: Container): void;
  abstract preTransitionUpdate(delta: number): void;
  abstract sceneUpdate(delta: number): void;
  update(delta: number): void {
    switch (this.sceneState) {
      case SceneState.LOAD:
        this.fadeInSceneTransition.update(delta, () => {
          this.sceneState = SceneState.PROCESS;
        });
        this.preTransitionUpdate(delta);
        break;
      case SceneState.PROCESS:
        this.sceneUpdate(delta);
        break;
      case SceneState.FINALIZE:
        this.fadeOutSceneTransition.update(delta, () => {
          this.sceneState = SceneState.DONE;
          if (this.onDone) {
            this.onDone();
          }
        });
        break;
    }
  }
  setFinalizing(onDone: () => void) {
    this.onDone = onDone;
    this.sceneState = SceneState.FINALIZE;
  }
}
export interface SceneTransition {
  init(app: Application, type: TransitionType, sceneContainer: Container): void;
  update(delta: number, callback: () => void): void;
}
export interface SceneSettings {
  index: number;
  name?: string;
  gameScene: AbstractGameScene;
  fadeInTransition: SceneTransition;

  fadeOutTransition: SceneTransition;
}

export class Engine {
  private sceneSettings: SceneSettings[];
  private app: Application;
  private currentScene: SceneSettings;
  constructor(app: Application, scenes: SceneSettings[]) {
    this.app = app;
    this.sceneSettings = scenes;
    this.sceneSettings.forEach((sceneSettings: SceneSettings) => {
      sceneSettings.gameScene.init(this.app, this.sceneSwitcher);
    });
    // Finding the scene with the lowest index
    this.currentScene = scenes.reduce((prev: any, curr: any) => {
      if (prev === undefined) {
        return curr;
      } else {
        return prev.index > curr.index ? curr : prev;
      }
    }, undefined);
    this.setupScene(this.currentScene);
  }
  sceneSwitcher = (sceneName: string) => {
    this.currentScene.gameScene.setFinalizing(() => {
      const scene = this.sceneSettings.find((sceneSettings) => {
        return sceneSettings.name === sceneName;
      });
      if (scene) {
        this.setupScene(scene);
        this.currentScene = scene;
      } else {
        console.error("SCENE NOT FOUND: " + sceneName);
      }
    });
  };
  setupScene(sceneSettings: SceneSettings) {
    this.app.stage.removeChildren();
    const sceneContainer = new Container();
    this.app.stage.addChild(sceneContainer);
    const gameScene: AbstractGameScene = sceneSettings.gameScene;
    gameScene.setup(sceneContainer);
    sceneSettings.fadeInTransition.init(
      this.app,
      TransitionType.FADE_IN,
      sceneContainer
    );
    sceneSettings.fadeOutTransition.init(
      this.app,
      TransitionType.FADE_OUT,
      sceneContainer
    );
    gameScene.fadeInTransition = sceneSettings.fadeOutTransition;
    gameScene.fadeOutTransition = sceneSettings.fadeInTransition;
  }
  update(delta: number) {
    this.currentScene.gameScene.update(delta);
  }
}

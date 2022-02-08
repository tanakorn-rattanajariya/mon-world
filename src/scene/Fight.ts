import {
  Application,
  Container,
  Ticker,
  autoDetectRenderer,
  IRenderableObject,
} from "pixi.js";
import { AbstractGameScene, SceneState } from "./Scene";
import { Button } from "../components/index";
import narutoPic from "../naruto.jpg";
import { Player } from "../characters/player";
import { NPC } from "../characters/npc";
import { StateFight } from "../state/fight";
export default class ScenceFight extends AbstractGameScene {
  async setup(container: Container) {
    this.sceneState = SceneState.LOAD;
    const state = new StateFight();
    const naruto = new Player(state, "Naruto", narutoPic, 10, 2);
    const npc = new NPC(state, "NPC", narutoPic, 10, 1);

    container.addChild(naruto.build());
    container.addChild(npc.build());

    state.setFighers([naruto, npc]);

    while (!state.isFinish()) {
      state.run();
      await this.animate(naruto);
      if (state.getCurrentFighterTurn().getId() === naruto.getId()) {
        state.setCurrentTarget(npc.getId());
      } else {
        state.setCurrentTarget(naruto.getId());
      }
      console.log(state.getFighters());
    }
    console.log(state.getTurn());
    console.log(state.getFighters());
  }

  async animate(animation: any) {
    let ticker = Ticker.shared;
    let i = 0;
    ticker.autoStart = false;
    ticker.stop();
    ticker.start();
    ticker.add((time) => {
      if (i === 10) {
        animation.animateAttact();
        ticker.stop();
        Promise.resolve();
      }
      i++;
    });
  }

  preTransitionUpdate(delta: number) {}
  sceneUpdate(delta: number) {}
}

import { Fighter, FighterPosition } from "./fighter";
import { Sprite, SpriteSource } from "pixi.js";
import { StateFight } from "../state/fight";
export class NPC extends Fighter {
  constructor(
    gameState: StateFight,
    name: string,
    source: SpriteSource,
    health: number,
    attack: number
  ) {
    super(gameState, name, source, health, attack, FighterPosition.RIGHT);
  }
  public action() {
    if (this.gameState.getCurrentTarget()) {
      this.gameState.doDamage({
        [this.gameState.getCurrentTarget() as string]: { damage: this.attack },
      });
    } else {
      console.log("No Current Target found");
    }
  }
}

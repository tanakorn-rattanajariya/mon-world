import { Fighter, FighterPosition } from "./fighter";
import { Sprite, SpriteSource } from "pixi.js";
export class Player extends Fighter {
  constructor(
    name: string,
    source: SpriteSource,
    health: number,
    attack: number
  ) {
    super(name, source, health, attack, FighterPosition.LEFT);
  }
}

import { Sprite, SpriteSource } from "pixi.js";
import { Board } from "../Board";

export enum FighterPosition {
  LEFT,
  RIGHT,
}
export abstract class Fighter {
  private name: string;
  private health: number;
  private attack: number;
  private source: SpriteSource;
  private position: FighterPosition;
  constructor(
    name: string,
    source: SpriteSource,
    health: number,
    attack: number,
    position: FighterPosition
  ) {
    this.name = name;
    this.source = source;
    this.health = health;
    this.attack = attack;
    this.position = position;
  }

  public build(): Sprite {
    const character = Sprite.from(this.source);
    /** Set Character Position on Screen */
    if (this.position === FighterPosition.LEFT) {
      character.x = 0;
      character.y = Board.getInstance().app.screen.height / 2;
    }
    character.width = 100;
    character.height = 100;

    return character;
  }

  public move() {}
}

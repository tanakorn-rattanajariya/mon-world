import { Sprite, SpriteSource } from "pixi.js";
import { Board } from "../Board";
import { v4 as uuidv4 } from "uuid";
import { StateFight } from "../state/fight";
export enum FighterPosition {
  LEFT,
  RIGHT,
}

export enum FIGHTER_STATUS {
  POISION,
  BURN
}

const CHARACTER_WIDTH = 100;
const CHARACTER_HEIGHT = 100;

class FigherStatus {
  private status: FIGHTER_STATUS;
  private turn: number=0;
  private duration: number;
  constructor(status: FIGHTER_STATUS,duration: number){
    this.status = status;
    this.duration = duration;
  }

  public getStatus(): FIGHTER_STATUS{
    return this.status;
  }
}
export abstract class Fighter {
  protected id: string;
  protected name: string;
  protected health: number;
  protected attack: number;
  protected source: SpriteSource;
  protected position: FighterPosition;
  protected status: Array<FigherStatus>;
  protected sprite: Sprite;

  protected gameState: StateFight;

  constructor(
    gameState: StateFight,
    name: string,
    source: SpriteSource,
    health: number,
    attack: number,
    position: FighterPosition
  ) {
    this.id = uuidv4();
    this.gameState = gameState;
    this.name = name;
    this.source = source;
    this.health = health;
    this.attack = attack;
    this.position = position;
  }

  /** GET SET */
  public getId() {
    return this.id;
  }
  public getHealth() {
    return this.health;
  }
  public getName(): string {
    return this.name;
  }
  public setHealth(health: number) {
    return (this.health = health);
  }
  public isDead() {
    return this.health <= 0;
  }
  public getSprite(): Sprite {
    return this.sprite;
  }
  public applyStatus(status: FIGHTER_STATUS){
    this.status.filter(eachStatus=> eachStatus.getStatus() != status);
    this.status.push(new FigherStatus(status,10));
  }

  public build(): Sprite {
    const character = Sprite.from(this.source);
    /** Set Character Position on Screen */
    character.width = CHARACTER_WIDTH;
    character.height = CHARACTER_HEIGHT;
    if (this.position === FighterPosition.LEFT) {
      character.x = 0;
      character.y =
        (Board.getInstance().app.screen.height - CHARACTER_HEIGHT) / 2;
    } else {
      character.x = Board.getInstance().app.screen.width - CHARACTER_WIDTH;
      character.y =
        (Board.getInstance().app.screen.height - CHARACTER_HEIGHT) / 2;
      character.anchor.x = 0.5;
    }
    this.sprite = character;
    return character;
  }

  public animateAttact() {
    this.sprite.x += 10;
  }

  public abstract action(): void;

  /** Status effect */
}

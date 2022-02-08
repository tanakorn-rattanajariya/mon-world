import { Fighter } from "characters/fighter";

const LIMIT_TIME = 150;

export interface Damage {
  /** Key of character */
  [key: string]: { damage: number };
}

export class StateFight {
  private count: number;
  private limitTime: number;
  private fighters: Array<Fighter>;
  private current: number;
  /** Current target of current fighter */
  private currentTarget?: string;

  constructor() {
    this.count = 0;
    this.limitTime = LIMIT_TIME;
    this.current = 0;
  }

  public run() {
    if (!this.isFinish()) {
      this.fighters[this.current].action();
      this.next();
    } else {
      console.log("The game is finished, cannot have characters lower than 2");
    }
  }

  /** What happen in next ture */
  private next() {
    if (!this.isFinish()) {
      this.current = this.findCurrentCharacter();
      this.currentTarget = undefined;
      /** Couting Turn */
      this.count += 1;
    } else {
      console.log("End State");
    }
  }

  /**
   *
   * @returns current id of active character, return -1 if invalid
   */
  private findCurrentCharacter(): number {
    let current;
    current = this.fighters.findIndex(
      (fighter, index) => !fighter.isDead() && index > this.current
    );
    if (current === -1) {
      current = this.fighters.findIndex(
        (fighter, index) => !fighter.isDead() && index <= this.current
      );
    }
    return current;
  }

  /** Game State*/
  public setFighers(fighters: Array<Fighter>) {
    this.fighters = fighters;
  }
  public setCurrentTarget(currentTarget: string) {
    this.currentTarget = currentTarget;
  }
  public getCurrentFighterTurn(): Fighter {
    return this.fighters[this.current];
  }

  public getCurrentTarget(): string | undefined {
    return this.currentTarget;
  }
  public getFighters(): Array<Fighter> {
    return this.fighters;
  }
  public isFinish() {
    return (this.fighters || []).filter((f) => !f.isDead()).length < 2;
  }
  public getTurn(): number {
    return this.count;
  }

  public requestTarget():void{

  }

  /** Action */
  public doDamage(damage: Damage) {
    for (let fighter of this.fighters || []) {
      if (damage[fighter.getId()]) {
        fighter.setHealth(fighter.getHealth() - damage[fighter.getId()].damage);
      }
    }
  }
}

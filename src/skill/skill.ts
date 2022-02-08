import { FIGHTER_STATUS } from "characters/fighter";
import { Damage } from "src/state/fight";
import { Event, RandomEvents } from "src/utils/random";
import { StateFight } from "../state/fight";

interface Skill{
    cast() : Damage;
}
interface TiggeringSkill{
    tigger(): Damage;
}
abstract class FireSkill implements Skill{
    abstract name: string;
    abstract percentDamage:number;

    protected gameState: StateFight;
    private burnEvents: RandomEvents;
    constructor(
        gameState: StateFight
    ) {
        this.gameState = gameState;
        this.burnEvents = new RandomEvents().addEvent(new Event('burn',20));
    }

    cast():Damage{
        let target = this.getTarget();
        this.additionEffects();
        return {[target as string]:{damage: this.gameState.getCurrentFighterTurn().getAttack() * this.percentDamage/100 }};
    }
    abstract getTarget(): string | undefined ;
    abstract additionEffects(): void ;

    protected applyFireStatus(target : string):void{
        let applyFighters = this.gameState.getFighters().filter(eachFighter=> 
            eachFighter.getId()==target
        ).filter(eachTarget=>{
            return this.burnEvents.randomEvent() == 'burn';
        });
        applyFighters.forEach(eachApply=>{
            eachApply.applyStatus(FIGHTER_STATUS.BURN,10);
        })
    }
}

export class Firebolt extends FireSkill{
    name = "Firebolt";
    percentDamage: number= 130;

    getTarget(): string | undefined {
        return this.gameState.getCurrentTarget();
    }

    additionEffects(): void {
        this.applyFireStatus(this.getTarget()||'');
    }
}

export class FireShield extends FireSkill implements TiggeringSkill{
    name = "Fire Shield";
    percentDamage: number = 0;

    getTarget(): string | undefined {
        return this.gameState.getCurrentFighterTurn().getId();
    }

    additionEffects(): void {
        this.gameState.getCurrentFighterTurn().applyStatus(FIGHTER_STATUS.FIRE_SHIELD,10);
    }

    tigger(): Damage {
        this.applyFireStatus(this.getTarget()||'');
        return {};
    }
}

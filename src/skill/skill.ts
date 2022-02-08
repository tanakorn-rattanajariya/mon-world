import { FIGHTER_STATUS } from "characters/fighter";
import { Damage } from "src/state/fight";
import { Event, RandomEvents } from "src/utils/random";
import { StateFight } from "../state/fight";

interface Skill{
    cast(atk:number) : Damage;
}
interface TiggeringSkill{
    tigger(): Damage;
}
abstract class FireSkill implements Skill{
    abstract name: string;
    protected gameState: StateFight;
    private burnEvents: RandomEvents;
    constructor(
        gameState: StateFight
    ) {
        this.gameState = gameState;
        this.burnEvents = new RandomEvents().addEvent(new Event('burn',20));
    }
    private percentDamage:number;

    cast(atk:number):Damage{
        let target = this.getTarget();
        this.additionEffects();
        return {[target as string]:{damage: atk* this.percentDamage/100 }};
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
            eachApply.applyStatus(FIGHTER_STATUS.BURN);
        })
    }
}

export class Firebolt extends FireSkill{
    name = "Firebolt";

    getTarget(): string | undefined {
        return this.gameState.getCurrentTarget();
    }

    additionEffects(): void {
        this.applyFireStatus(this.getTarget()||'');
    }
}

export class FireShield extends FireSkill{
    name = "Fire Shield";

    getTarget(): string | undefined {
        return this.gameState.getCurrentTarget();
    }

    additionEffects(): void {
        
    }
}

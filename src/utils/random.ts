export class RandomEvents {
    private eventList: Array<Event>;

    public randomEvent(): string | undefined{
        let randomNumber = Math.random()*100;
        let event = this.eventList.find(eachEvent=>{
            if(eachEvent.getPercentToOccurs()>randomNumber){
                return eachEvent;
            }
            randomNumber -= eachEvent.getPercentToOccurs();
        });
        return event?.getName();
    }

    public addEvent(event:Event):RandomEvents{
        this.eventList.push(event);
        return this;
    }

    sort():void{

    }
}
export class Event {
    private name:string;
    private percentToOccurs:number;

    constructor(name:string,percentToOccurs:number){
        this.name = name;
        this.percentToOccurs = percentToOccurs;
    }

    getPercentToOccurs():number{
        return this.percentToOccurs;
    }

    getName():string{
        return this.name;
    }
}
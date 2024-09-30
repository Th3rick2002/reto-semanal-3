import {Visit} from "./Visit";

export class Pet{
    public visits:Visit[] = [];
    constructor(
        public name: string,
        public type: string,
        public age: number
    ){
        this.visits = [];
    }
}
import {Pet} from "./Pet";

export class Client {
    public pets: Pet[] = [];
    constructor(
        public name: string,
        public address: string,
        public cellPhone: number,
    ) {
    }
}
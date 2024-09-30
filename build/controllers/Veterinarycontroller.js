"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Veterinary = void 0;
// @ts-ignore
const Client_1 = require("../models/Client");
const Pet_1 = require("../models/Pet");
const Visit_1 = require("../models/Visit");
const readline = __importStar(require("readline"));
class Veterinary {
    constructor() {
        this.clients = [];
        this.pets = [];
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    registerClient() {
        console.log('Registro de cliente');
        this.rl.question('Ingrese el nombre del cliente: ', (name) => {
            this.rl.question('Ingrese la dirección del cliente: ', (address) => {
                this.rl.question('Ingrese el número de celular del cliente: ', (cellPhone) => {
                    let existClient = this.clients.find(c => c.name === name);
                    if (existClient == undefined) {
                        const newClient = new Client_1.Client(name, address, parseInt(cellPhone, 10));
                        this.clients.push(newClient);
                    }
                    else {
                        console.log(`El cliente ${name} ya existe existe`);
                    }
                    this.showMenu();
                });
            });
        });
    }
    addPetToOwner() {
        this.rl.question('Ingrese el nombre del cliente: ', (nameClient) => {
            let existClient = this.clients.find(c => c.name === nameClient);
            if (existClient == undefined) {
                console.log(`El cliente ${nameClient} no existe`);
                console.log('Por favor registrar cliente');
                this.registerClient();
            }
            else {
                this.rl.question('Ingrese el nombre de la mascota: ', (name) => {
                    this.rl.question('Ingrese el tipo de mascota: ', (type) => {
                        this.rl.question('Ingrese la edad de la mascota: ', (age) => {
                            const newPet = new Pet_1.Pet(name, type, parseInt(age, 10));
                            this.pets.push(newPet);
                            existClient === null || existClient === void 0 ? void 0 : existClient.pets.push(newPet);
                            console.log(existClient);
                            console.log(`La mascota ${newPet.name} ha sido agregada con éxito al cliente ${existClient.name}`);
                            this.showMenu();
                        });
                    });
                });
            }
        });
    }
    registerPetVisit() {
        this.rl.question('Ingrese el nombre de la mascota a la que quiere registrar la visita: ', (namePet) => {
            let existPet = this.pets.find(p => p.name === namePet);
            if (existPet == undefined) {
                console.log(`La mascota ${namePet} no existe`);
                this.showMenu();
            }
            else {
                const date = new Date();
                this.rl.question('Ingrese el motivo de la visita: ', (reason) => {
                    this.rl.question('Ingrese el tratamiento aplicado: ', (treatment) => {
                        const newVisit = new Visit_1.Visit(date, treatment, reason);
                        existPet === null || existPet === void 0 ? void 0 : existPet.visits.push(newVisit);
                        console.log(`La visita se ha registrado con éxito para la mascota ${existPet.name}`);
                        this.showMenu();
                    });
                });
            }
        });
    }
    listClientAndPet() {
        if (this.clients.length === 0) {
            console.log('No hay clientes registrados');
            this.showMenu();
        }
        else {
            this.clients.forEach((client) => {
                console.log(`
                    Nombre: ${client.name}\n
                    Dirección: ${client.address}\n
                    Telefono: ${client.cellPhone}
                    Mascotas: 
                `);
                client.pets.forEach((pet) => {
                    console.log(`
                        Nombre: ${pet.name}\n
                        Tipo: ${pet.type}\n
                        Edad: ${pet.age}\n
                        Consultas: 
                    `);
                    pet.visits.forEach((visit) => {
                        console.log(`
                            Fecha de visita: ${visit.date}\n
                            Motivo de visita: ${visit.reason}\n
                            Tratamiento aplicado: ${visit.treatment}\n
                        `);
                    });
                });
            });
        }
        this.showMenu();
    }
    showMenu() {
        this.rl.question("Menu Veterinaria\n" +
            "1. Registrar nuevo cliente\n" +
            "2. Agregar mascota a cliente\n" +
            "3. Registrar visita de mascota\n" +
            "4. Listar clientes y mascotas\n" +
            "5. Salir del programa\n", (option) => {
            this.showMethods(parseInt(option, 10));
        });
    }
    showMethods(option) {
        switch (option) {
            case 1:
                this.registerClient();
                break;
            case 2:
                this.addPetToOwner();
                break;
            case 3:
                this.registerPetVisit();
                break;
            case 4:
                this.listClientAndPet();
                break;
            case 5:
                this.rl.close();
                break;
            default:
                console.log("Opción inválida, por favor ingrese una opción válida.");
                this.showMenu();
                break;
        }
    }
}
exports.Veterinary = Veterinary;

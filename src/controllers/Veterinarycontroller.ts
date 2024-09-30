// @ts-ignore
import { Client } from "../models/Client";
import { Pet } from "../models/Pet";
import { Visit } from "../models/Visit";
import * as readline from "readline";

export class Veterinary {
    private clients: Client[] = [];
    private pets: Pet[] = [];


    private rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    registerClient() {
        console.log('Registro de cliente')
        this.rl.question('Ingrese el nombre del cliente: ', (name: string) => {
            this.rl.question('Ingrese la dirección del cliente: ', (address: string) => {
                this.rl.question('Ingrese el número de celular del cliente: ', (cellPhone: string) => {
                    let existClient = this.clients.find(c => c.name === name);
                    if (existClient == undefined) {
                        const newClient = new Client( name, address, parseInt(cellPhone, 10));
                        this.clients.push(newClient);
                    }else{
                        console.log(`El cliente ${name} ya existe existe`);
                    }
                    this.showMenu();
                });
            });
        });
    }

    addPetToOwner() {
        this.rl.question('Ingrese el nombre del cliente: ', (nameClient: string) => {
            let existClient = this.clients.find(c => c.name === nameClient);
            if (existClient == undefined) {
                console.log(`El cliente ${nameClient} no existe`);
                console.log('Por favor registrar cliente')
                this.registerClient()
            }else{
                this.rl.question('Ingrese el nombre de la mascota: ', (name: string) => {
                    this.rl.question('Ingrese el tipo de mascota: ', (type: string) => {
                        this.rl.question('Ingrese la edad de la mascota: ', (age: string) => {
                            const newPet = new Pet(name, type, parseInt(age, 10));
                            this.pets.push(newPet);
                            existClient?.pets.push(newPet);
                            console.log(existClient);
                            console.log(`La mascota ${newPet.name} ha sido agregada con éxito al cliente ${existClient.name}`);
                            this.showMenu();
                        });
                    });
                });
            }
        })
    }

    registerPetVisit() {
        this.rl.question('Ingrese el nombre de la mascota a la que quiere registrar la visita: ', (namePet)=>{
            let existPet = this.pets.find(p => p.name === namePet);
            if (existPet == undefined) {
                console.log(`La mascota ${namePet} no existe`);
                this.showMenu()
            }else{
                const date = new Date();
                this.rl.question('Ingrese el motivo de la visita: ', (reason: string) => {
                    this.rl.question('Ingrese el tratamiento aplicado: ', (treatment: string) => {
                        const newVisit = new Visit(date, reason, treatment);
                        existPet?.visits.push(newVisit)
                        console.log(`La visita se ha registrado con éxito para la mascota ${existPet.name}`);
                        this.showMenu();
                    });
                });
            }
        })
    }

    listClientAndPet() {
        if (this.clients.length ===0){
            console.log('No hay clientes registrados')
            this.showMenu()
        }else{
            this.clients.forEach((client: Client) => {
                console.log(`
                    Nombre: ${client.name}\n
                    Dirección: ${client.address}\n
                    Telefono: ${client.cellPhone}
                    Mascotas: 
                `);

                client.pets.forEach((pet: Pet)=>{
                    console.log(`
                        Nombre: ${pet.name}\n
                        Tipo: ${pet.type}\n
                        Edad: ${pet.age}\n
                        Consultas: 
                    `)

                    pet.visits.forEach((visit: Visit)=>{
                        console.log(`
                            Fecha de visita: ${visit.date}\n
                            Motivo de visita: ${visit.reason}\n
                            Tratamiento aplicado: ${visit.treatment}\n
                        `)
                    })
                })
            })
        }

        this.showMenu()
    }

    showMenu() {
        this.rl.question("Menu Veterinaria\n" +
            "1. Registrar nuevo cliente\n" +
            "2. Agregar mascota a cliente\n" +
            "3. Registrar visita de mascota\n" +
            "4. Listar clientes y mascotas\n" +
            "5. Salir del programa\n", (option: string) => {
            this.showMethods(parseInt(option, 10));
        });
    }

    showMethods(option: number) {
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

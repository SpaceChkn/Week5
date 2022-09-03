class Hero {
    constructor(name, power) {
        this.name = name;
        this.power = power;
    }

    describe() {
        return `${this.name} is level ${this.power}.`;
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.heros = [];
    }

    addHero(hero) {
        if (hero instanceof Hero) {
            this.heros.push(hero);
        } else {
            throw new Error (`You can only add an instance of Hero.  Argument is not a Hero: ${heros}`);
        }
    }

    describe() {
        return `${this.name} has ${this.heros.length} hero.`;
    }
}

class Menu {
    constructor() {
        this.teams = [];
        this.selectedTeam = null;
    }


    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeam();
                    break;
                default:
                        selection = 0;                
            }
            selection = this.showMainMenuOptions();
        }    
        alert('You are not worthy');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create Team
        2) view Team
        3) delete Team
        4) display all Teams
        `);
    }


    showTeamMenuOptions(teamInfo) {
        return prompt(`
            0) back
            1) create Hero
            2) delete Hero
            -------------------
            ${teamInfo}
        `);
    }

    displayTeam() {
        let teamString = '';
        for (let i = 0; i < this.teams.length; i++) {
            teamString += i + ') ' + this.teams[i].name + '\n';
        }
        alert(teamString);
    }

    createTeam() {
        let name = prompt('Team name? ');
        this.teams.push(new Team(name));
    }

    viewTeam() {
        let index = prompt('Enter the index of the Team you want to view: ');
        if (index > -1 && index < this.teams.length) {
            this.selectedTeam = this.teams[index];
            let description = 'Team Name: ' + this.selectedTeam.name + '\n';

            for (let i = 0; i < this.selectedTeam.heros.length; i++) {
                description += i + ') ' + this.selectedTeam.heros[i].name 
                    + ' - ' + this.selectedTeam.heros[i].power + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch(selection) {
                case '1':
                    this.createHero();
                    break;
                case '2':
                    this.deleteHero();    
            }
        }
    }

    createHero() {
        let name = prompt('Enter name for your Hero: ');
        let power = prompt('Power Level (1-10)');
        this.selectedTeam.heros.push(new Hero(name, power));
    }

    deleteHero() {
        let index = prompt('Enter the index of the Hero you want to delete: ');
        if (index > -1 && index < this.selectedTeam.heros.length) {
            this.selectedTeam.heros.splice(index, 1);
        }
    }

    deleteTeam() {
        let index = prompt('Enter the index of the Team you want to delete: ');
        this.selectedTeam = this.teams[parseInt(index)];
        if (index > -1 && index < this.teams.length) {
            this.teams.splice(this.selectedTeam, 1);
        }
    }
}

let menu = new Menu();
menu.start();

export class Game {
    constructor(teams) {
      this.teams = teams;
      this.allClients = [];
      this.round = 0;
      this.words = [];
    }
  }
  
  export class Team {
    constructor(name) {
      this.name = name;
      this.players = [];
      this.points = 0;
      this.playersVisible = false;
    }
  }
  
  export class Player {
    constructor(name) {
      this.playerName = name;
      this.socketId;
    }
  }
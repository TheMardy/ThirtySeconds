import { writable, get } from 'svelte/store';

export const socketIo = writable(null);
export const playerName = writable("");

export const roomId = writable("");
export const roomPlayers = writable([]);
export const roomTeams = writable([]);
export const roomRound = writable(0);
export const roomPointsToWin = writable(30);

export const currentFiveWords = writable(null);



export function getOrderedTeams() {
    console.log(get(roomTeams))
    return JSON.parse(JSON.stringify(get(roomTeams))).sort(compareTeamPoints);
} 

export function getCurrentPlayer() {
    return getCurrentTeam().players[0];
}
export function getCurrentTeam() {
    const currentTeam = get(roomRound) % get(roomTeams).length;
    console.log(get(roomTeams));
    console.log(currentTeam);
    return get(roomTeams)[currentTeam];
}
export function endGame() {

}

function compareTeamPoints(a, b) {
    if (a.points > b.points) return -1;
    if (b.points > a.points) return 1;
  
    return 0;
  }
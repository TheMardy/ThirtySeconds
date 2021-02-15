<script>
    import { onMount } from 'svelte';
	import InterimScore from './InterimScore.svelte'
	import Settings from './Settings.svelte'
	import Toast from './Toast.svelte'
	import Help from './Help.svelte'
	import {currentGameScreen, game, localStorage, settings, prevGameScreen } from '../stores/stores.js'
    import {wordsDatabase} from '../stores/wordsDatabase.js';
    import { fly } from 'svelte/transition';
    import { _ } from 'svelte-i18n'
    
    class Game {
      constructor(teams) {
        this.teams = teams;
        this.round = 0;
        this.started;
        this.words = [];
      }
    }
    
    class Team {
      constructor(name) {
        this.name = name;
        this.players = [];
        this.points = 0;
        this.playersVisible = false;
      }
    }
    
    class Player {
      constructor(name) {
        this.name = name;
      }
	}


    let teams = [];
    
    onMount(async () => {
        init();
    });
        
    function init() {
        //Recover from Local Storage
        let teamsFromStorage = $localStorage.getItem('teams');
        if(teamsFromStorage != null) {
            teams = JSON.parse(teamsFromStorage);
        }
        let gameFromStorage = $localStorage.getItem('game');
        if(gameFromStorage != null) {
            game.set(JSON.parse(gameFromStorage));
        }
        let settingsFromStorage = $localStorage.getItem('settings');
        if(settingsFromStorage != null) {
            settings.set(JSON.parse(settingsFromStorage));
        }
    }
    
    function saveToLocalStorage() {
        $localStorage.setItem('teams', JSON.stringify(teams));
    }
    
    function addTeam() {
        let team = new Team(newTeamName);
        teams.push(team);
        //Reactivity
        teams = teams;
        newTeamName = "";
        saveToLocalStorage();
    }
    function addPlayer(teamIndex) {
        let player = new Player(newTeamMemberName);
        teams[teamIndex].players.push(player);
        //Reactivity
        teams[teamIndex].players = teams[teamIndex].players;
        newTeamMemberName = "";
        saveToLocalStorage();
    }
    function removePlayer(teamIndex, playerIndex) {
        teams[teamIndex].players.splice(playerIndex, 1);
        //Reactivity
        teams[teamIndex].players = teams[teamIndex].players;
        saveToLocalStorage();
    }
    function removeTeam(teamIndex) {
        teams.splice(teamIndex, 1);
        //Reactivity
        teams = teams;
        saveToLocalStorage();
    }
    function resetTeams() {
        teams = [];
        $localStorage.removeItem('teams');
    }
    function startGame() {

        let canStart = true;
        if(teams.length < 2){
            canStart = false;
            window.pushToast($_('at_least_2_teams_required'));
            return;
        }

        teams.forEach(team => {
            if(team.players.length < 2) {
                canStart = false;
                window.pushToast($_('team') + " " + team.name + " " + $_('has_less_than_2_players'));
                return;
            }
        })

        if(canStart) {
            game.set(new Game(teams));
            $game.started = new Date();
            $game.words = wordsDatabase;
            $localStorage.setItem('game', JSON.stringify($game));
            prevGameScreen.set(InterimScore);
            currentGameScreen.set(InterimScore);
        }
    }
    function resumeGame() {
        prevGameScreen.set(InterimScore);
        currentGameScreen.set(InterimScore);
    }
    function getResumeGameDateString(dt){
        let m = new Date(dt);
        let h = (m.getUTCHours() + 1)
        if(h.toString().length == 1) h = "0"+h;
        let min = m.getUTCMinutes();
        if(min.toString().length == 1) min = "0"+min;
        let sec =  m.getUTCSeconds();
        if(sec.toString().length==1) sec = "0"+sec;

        return  m.getUTCDate()+"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCFullYear() + " " + h + ":" + min + ":" + sec;
    }
    
    let newTeamName = "";
    let newTeamMemberName = "";
    
    </script>
    
<div in:fly>
    <div class="container-fluid pt-2">
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-start" on:click="{() => currentGameScreen.set(Help)}">
                    <i class="c-white fas fa-question-circle"></i>
                </div>
                <div class="float-end" on:click="{() => currentGameScreen.set(Settings)}">
                    <i class="c-white fas fa-cog"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="c-white">Thirty Seconds</h1>
            </div>
        </div>
    </div>
    <div class="vertical-center">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row mb-2">
                                <div class="col-12"><h5 class="text-center">{$_('add_team')}</h5></div>
                                <div class="col-12">
                                    <input class="form-control" type="text" bind:value="{newTeamName}" placeholder="{$_('team_name')}">
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 col-sm-6 col-md-4 mb-2">
                                    <button class="btn bg-blue w-100 c-white"
                                        on:click="{() => addTeam()}"><i class="fas fa-plus-square"></i></button>
                                </div>
                                <div class="col-12 col-sm-6 col-md-4 mb-2">
                                    <button class="btn bg-red w-100 c-white" 
                                        on:click="{() => resetTeams()}"><i class="fas fa-trash-alt"></i> {$_('teams')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            {#each teams as team, i}
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            {#if team.playersVisible}
                            <h3 class="d-inline mb-0 float-start"><div class="d-inline" on:click="{() => {removeTeam(i)}}"><i class="fas fa-trash-alt c-red"></i></div> {team.name}</h3>
                            <h3 class="d-inline mb-0 float-end" on:click="{() => {team.playersVisible = !team.playersVisible; saveToLocalStorage()}}">{team.players.length || 0} {$_('players')} <i class="fas fa-chevron-down"></i></h3>
                            {:else}
                            <h3 class="d-inline mb-0 float-start">{team.name}</h3>
                            <h3 class="d-inline mb-0 float-end" on:click="{() => {team.playersVisible = !team.playersVisible; saveToLocalStorage() }}">{team.players.length || 0} {$_('players')} <i class="fas fa-chevron-right"></i></h3>
                            {/if}
    
                            {#if team.playersVisible}
                            <div class="clearfix"></div>
                            <hr>
                            <div class="row mb-3">
                                <div class="col-8 col-md-10">
                                    <input class="form-control" type="text" bind:value="{newTeamMemberName}" placeholder="{$_('player_name')}">
                                </div>
                                <div class="col-4 col-md-2">
                                    <button class="btn bg-blue w-100"
                                        on:click="{() => addPlayer(i)}"><i class="fas fa-plus-square c-white"></i></button>
                                </div>
                            </div>
                            <hr>
                            {#each team.players as player, j}
                            <h5 class="mb-0">{player.name} <div class="d-inline float-end" on:click="{() => {removePlayer(i, j)}}"><i class="fas fa-trash-alt float-end c-red"></i></div></h5>
                            {#if j != team.players.length-1}
                            <hr>
                            {/if}
                            {/each}
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
            {/each}
    
            {#if $game != null}
            <div class="row justify-content-center mt-3">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card bg-blue" on:click="{() => resumeGame()}">
                        <div class="card-body text-center">
                            <h2 class="c-white">{$_('resume_game')}</h2>
                            <span class="c-white">{getResumeGameDateString($game.started)}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/if}

            <div class="row justify-content-center mt-3 mb-3">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card bg-blue" on:click="{() => startGame()}">
                        <div class="card-body text-center">
                            <h2 class="c-white">{$_('new_game')}</h2>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>

<Toast />
    <style>
      
     
    </style>
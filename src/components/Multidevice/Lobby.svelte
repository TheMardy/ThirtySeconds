<script>
    import { onMount } from 'svelte';
	import InterimScore from './InterimScore.svelte'
	import Settings from '../Settings.svelte'
	import Toast from '../Toast.svelte'
	import Help from '../Help.svelte'
	import {currentGameScreen, game, localStorage, settings, prevGameScreen } from '../../stores/stores.js'
    import {wordsDatabase} from '../../stores/wordsDatabase.js';
    import { fly } from 'svelte/transition';
    import {socketIo, roomPlayers, roomId, playerName, roomTeams} from '../../stores/multiDeviceStores.js'
    import MultiDeviceHome from './MultiDeviceHome.svelte';
    import {Game, Player, Team} from '../../stores/classes';

    onMount(async () => {
        init();
    });
    let newTeamName = "";
    let local_playerIsInCurrentTeam;

    function init() {
       
    }
    function addTeam() {
        let team = new Team(newTeamName);
        $roomTeams.push(team);
        $socketIo.emit('setTeams', $roomTeams);

        newTeamName = "";
    }
    function removeTeam(teamIndex) {
        $roomTeams.splice(teamIndex, 1);
        $socketIo.emit('setTeams', $roomTeams);

    }

    function teamHasPlayer(team) {
        let player = team.players.filter(function(player) {
            return player.socketId == $socketIo.id
            }
        );
        if(player[0] == null) {
            console.log('Het m nie')
            return false;
        }
            console.log('Het m wel')
        return true;
    }

    function joinTeam(teamIndex) {
        $socketIo.emit('joinTeam', teamIndex);
        console.log('Sent JoinTeam');
    }

    function startGame() {
        let canStart = true;
        // if($roomTeams.length < 2){
        //     canStart = false;
        //     window.pushToast("Er zijn minimaal 2 teams nodig om te starten");
        //     return;
        // }

        // $roomTeams.forEach(team => {
        //     if(team.players.length < 2) {
        //         canStart = false;
        //         window.pushToast("Team "+team.name+" heeft minder dan 2 spelers");
        //         return;
        //     }
        // })

        if(canStart) {
            $socketIo.emit('startGame', wordsDatabase);
            console.log('Sent Start Game');
        }

    }
    </script>
    
<div in:fly>
    <div class="container-fluid pt-2">
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-start" on:click="{() => {currentGameScreen.set(MultiDeviceHome); $socketIo.emit('leave'); console.log('Sent Leave')}}">
                    <i class="c-white fas fa-arrow-left"></i>
                </div>
                <div class="float-end" on:click="{() => currentGameScreen.set(Settings)}">
                    <i class="c-white fas fa-cog"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="c-white">{$playerName}</h1>
                <h3 class="c-white">{$roomId}</h3>
            </div>
        </div>
    </div>
    <div class="vertical-center">
        <div class="container">
            {#if $playerName == $roomPlayers[0].playerName}
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row mb-2">
                                <div class="col-12"><h5 class="text-center">Team Toevoegen</h5></div>
                                <div class="col-12">
                                    <input class="form-control" type="text" bind:value="{newTeamName}" placeholder="Team Naam">
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 col-sm-6 col-md-4 mb-2">
                                    <button class="btn bg-blue w-100 c-white"
                                        on:click="{() => addTeam()}"><i class="fas fa-plus-square"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
            {#each $roomTeams as team, i}
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card">
                        <div class="card-body">
                            {#if team.playersVisible}
                            <h3 class="d-inline mb-0 float-start">{#if $playerName == $roomPlayers[0].playerName}<div class="d-inline" on:click="{() => {removeTeam(i)}}"><i class="fas fa-trash-alt c-red"></i></div>{/if} {team.name}</h3>
                            <h3 class="d-inline mb-0 float-end" on:click="{() => {team.playersVisible = !team.playersVisible;}}">{team.players.length || 0} spelers <i class="fas fa-chevron-down"></i></h3>
                            {:else}
                            <h3 class="d-inline mb-0 float-start">{#if !teamHasPlayer(team) }<div class="d-inline" on:click="{() => joinTeam(i)}"><i class="fas fa-sign-in-alt"></i></div>{/if} {team.name}</h3>
                            <h3 class="d-inline mb-0 float-end" on:click="{() => {team.playersVisible = !team.playersVisible; }}">{team.players.length || 0} spelers <i class="fas fa-chevron-right"></i></h3>
                            {/if}
    
                            {#if team.playersVisible}
                            <div class="clearfix"></div>
                            <hr>
                            {#each team.players as player, j}
                            <h5 class="mb-0">{player.playerName}</h5>
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
            <div class="row justify-content-center mt-2">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row mb-4 justify-content-center">
                                {#each $roomPlayers as player, i}
                                <div class="col-6 text-center">
                                    {#if i == 0}
                                    <h5 class="c-purple">{player.playerName} <i class="fas fa-crown"></i></h5>
                                    {:else}
                                    <h5 class="c-purple">{player.playerName}</h5>
                                    {/if}
                                </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {#if $playerName == $roomPlayers[0].playerName}
            <div class="row justify-content-center mt-3 mb-3">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card bg-blue" on:click="{() => startGame()}">
                        <div class="card-body text-center">
                            <h2 class="c-white">Start</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
        </div>
    </div>
</div>

<Toast />
    <style>
      .fa-crown {
          color: #FFD700;
      }
     
    </style>
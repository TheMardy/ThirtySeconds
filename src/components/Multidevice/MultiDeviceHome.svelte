<script>
    import { onMount } from 'svelte';
	import InterimScore from './InterimScore.svelte'
	import Settings from './Settings.svelte'
	import Toast from '../Toast.svelte'
	import Help from '../Help.svelte'
	import {currentGameScreen, localStorage, prevGameScreen } from '../../stores/stores.js'
    import {wordsDatabase} from '../../stores/wordsDatabase.js';
    import { fly } from 'svelte/transition';
    import {socketIo, roomPlayers, playerName, roomId, roomTeams, roomRound} from '../../stores/multiDeviceStores.js'
import Lobby from './Lobby.svelte';
import ModesOverview from '../ModesOverview.svelte';
import { io } from 'socket.io-client';

    
    onMount(async () => {
        //Recover from Local Storage
        let playerNameFromStorage = $localStorage.getItem('playerName');
        if(playerNameFromStorage != null) {
            playerName.set(JSON.parse(playerNameFromStorage));
        }

        init();
    });

    function saveNameToLocalStorage() {
        $localStorage.setItem('playerName', JSON.stringify($playerName));
    }
        
    function init() {
        if($socketIo == null) {
            const socket = io.connect('http://localhost:9736');
            socketIo.set(socket);

            socket.on('connect', () => {
                console.log('Connected to the WSS server')
            });

            socket.on('joinRoom', async (clients) => {
                console.log('Join Accepted');
                roomPlayers.set(clients);
                currentGameScreen.set(Lobby);
            });

            socket.on('setTeamsClient', async (newTeams) => {
                console.log('Set Teams Received');
                roomTeams.set(newTeams);
            });

            socket.on('createAck', async (clients, rId) => {
                console.log('Create Accepted');
                roomPlayers.set(clients);
                roomId.set(rId);
                console.log(clients);
                currentGameScreen.set(Lobby);
            });

            socket.on('setPlayers', (clients) => {
                console.log('Recieved setPlayers')
                console.log(clients);
                roomPlayers.set(clients);
            });

            socket.on('setScreen', async (screenName) => {
                console.log('Received setScreen: ' + screenName);
                switch (screenName) {
                    case 'InterimScore':
                        currentGameScreen.set(InterimScore);
                        break;
                
                    default:
                        break;
                }
            });

            socket.on('setRound', async (round) => {
                console.log('Received setRound: ' + round);
                roomRound.set(round);
            });


            socket.on('error', (msg) => {
                window.pushToast(msg);
            });
        }
    }

    function joinGame() {
        saveNameToLocalStorage();
        console.log('Send Join');
        $socketIo.emit('join', $roomId, $playerName);
    }
    function createGame() {
        saveNameToLocalStorage();
        console.log('Send Create');
        $socketIo.emit('create', $playerName);

    }
    
    </script>
    
<div in:fly>
    <div class="container-fluid pt-2">
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-start" on:click="{() => currentGameScreen.set(ModesOverview)}">
                    <i class="c-white fas fa-arrow-left"></i>
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
                            <div class="row mb-4 justify-content-center">
                                <div class="col-12">
                                    <input class="form-control text-center" type="text" bind:value="{$playerName}" placeholder="Name">
                                </div>
                            </div>
                            <div class="row mb-2 justify-content-center">
                                <div class="col-12 mb-2">
                                    <input class="form-control text-center" type="text" bind:value="{$roomId}" placeholder="Room Code">
                                </div>
                                <div class="col-12">
                                    <button class="btn bg-blue w-100 c-white"
                                        on:click="{() => joinGame()}">Join Game</button>
                                </div>
                            </div>
                            <div class="row mb-2 justify-content-center">
                                <div class="col-12">
                                    <button class="btn bg-blue w-100 c-white"
                                        on:click="{() => createGame()}">Create Game</button>
                                </div>
                            </div>
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
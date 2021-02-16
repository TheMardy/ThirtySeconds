<script>
	import {currentGameScreen, game,  settings, saveSettings, endGame, prevGameScreen, goToHome } from '../stores/stores.js'
    import Home from './Singledevice/Home.svelte'
	import { fly } from 'svelte/transition';
  
    let safari = false;
    let chrome = false;
    let samsungInternet = false;

    let makeTeams = false;
    let startGame = false;

    </script>
    
    <div class="container-fluid pt-2 vh-100" in:fly>
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-end" on:click="{() => currentGameScreen.set(Home)}">
                    <i class="c-white fas fa-times"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="c-white">Help</h1>
            </div>
        </div>
    
        <div class="container">

            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row mb-2 justify-content-center">
                                <div class="col-12">
                                    <h3 class="text-center">Installeren & Updaten</h3>
                                    <p class="mb-0">Deze app is te installeren als Progressive Web App, zodat hij zonder 
                                        internetverbinding is te gebruiken en automatische updates krijgt.
                                    </p>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 text-left">
                                    <hr>
                                    {#if !safari}
                                    <h5 on:click="{() => {safari = !safari}}"><i class="fab fa-apple"></i> Safari <i class="fas float-end d-inline fa-chevron-right"></i></h5>
                                    <hr>
                                    {:else}
                                    <h5 on:click="{() => {safari = !safari}}"><i class="fab fa-apple"></i> Safari <i class="fas float-end d-inline fa-chevron-down"></i></h5>
                                    <hr>
                                    <ol type="1">
                                        <li>Klik op het "delen" icoontje</li>
                                        <li>Klik op "Zet op beginscherm"</li>
                                        <li>Klik op "Voeg toe"</li>
                                    </ol>
                                    {/if}
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 text-left">
                                    {#if !chrome}
                                    <h5 on:click="{() => {chrome = !chrome}}"><i class="fab fa-android"></i> Chrome <i class="fas float-end d-inline fa-chevron-right"></i></h5>
                                    <hr>
                                    {:else}
                                    <h5 on:click="{() => {chrome = !chrome}}"><i class="fab fa-android"></i> Chrome <i class="fas float-end d-inline fa-chevron-down"></i></h5>
                                    <hr>
                                    <ol type="1">
                                        <li>Klik op het <i class="fas fa-ellipsis-v"></i> icoontje</li>
                                        <li>Klik op "App installeren"</li>
                                        <li>Klik op "Installeren"</li>
                                    </ol>
                                    {/if}
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 text-left">
                                    {#if !samsungInternet}
                                    <h5 on:click="{() => {samsungInternet = !samsungInternet}}"><i class="fab fa-android"></i> Samsung Internet <i class="fas float-end d-inline fa-chevron-right"></i></h5>
                                    <hr>
                                    {:else}
                                    <h5 on:click="{() => {samsungInternet = !samsungInternet}}"><i class="fab fa-android"></i> Samsung Internet <i class="fas float-end d-inline fa-chevron-down"></i></h5>
                                    <hr>
                                    <ol type="1">
                                        <li>Klik op het <i class="fas fa-ellipsis-v"></i> icoontje</li>
                                        <li>Klik op "Toevoegen aan startscherm"</li>
                                    </ol>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row mb-2 justify-content-center">
                                <div class="col-12">
                                    <h3 class="text-center">Spelen</h3>
                                    <p class="mb-0">Uitleg over hoe Thirty Seconds te spelen is
                                    </p>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 text-left">
                                    <hr>
                                    {#if !makeTeams}
                                    <h5 on:click="{() => {makeTeams = !makeTeams}}">1. Teams maken <i class="fas float-end d-inline fa-chevron-right"></i></h5>
                                    <hr>
                                    {:else}
                                    <h5 on:click="{() => {makeTeams = !makeTeams}}">1. Teams maken <i class="fas float-end d-inline fa-chevron-down"></i></h5>
                                    <hr>
                                    <p class="">
                                        Voeg een team toe door de teamnaam in te vullen en op de <i class="fas fa-plus-square"></i> knop te klikken. <br>
                                        Voeg vervolgens spelers toe door op het team te klikken, de speler naam in te vullen en op de <i class="fas fa-plus-square"></i> knop
                                        te klikken <br> <br>
                                        Note: Een team bestaat uit minimaal 2 spelers
                                    </p>
                                    {/if}
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 text-left">
                                    {#if !startGame}
                                    <h5 on:click="{() => {startGame = !startGame}}">2. Spel starten <i class="fas float-end d-inline fa-chevron-right"></i></h5>
                                    <hr>
                                    {:else}
                                    <h5 on:click="{() => {startGame = !startGame}}">2. Spel starten <i class="fas float-end d-inline fa-chevron-down"></i></h5>
                                    <hr>
                                    <p class="">
                                        Wanneer er minimaal 2 teams van 2 personen zijn, kan het spel gestart worden door op de knop "Start Spel" te klikken. <br>
                                    </p>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
    </div>
</div>
    
    
    <style>
    
     
    </style>
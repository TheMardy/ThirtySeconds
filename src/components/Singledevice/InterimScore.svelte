<script>
    import {currentGameScreen, game, getCurrentPlayer, setNextFiveWords, settings, getOrderedTeams, endGame } from '../../stores/stores.js'
    import GuessScreen from './GuessScreen.svelte';
    import Settings from './Settings.svelte';
    import { fly } from 'svelte/transition';

    function nextRound() {
        setNextFiveWords();
        currentGameScreen.set(GuessScreen);
    }
    
</script>

<div class="" in:fly>
    <div class="container-fluid pt-2">
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-end" on:click="{() => currentGameScreen.set(Settings)}">
                    <i class="c-white fas fa-cog"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="vertical-center">
        <div class="container-fluid">
            {#if getOrderedTeams()[0].points >= $settings.pointsToWin}
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-md-8 col-lg-6 mb-5 text-center">
                    <h1 class="c-white mb-0">Team</h1>
                    <h1 class="c-white mb-0">{getOrderedTeams()[0].name}</h1>
                    <h1 class="c-white mb-0">Heeft Gewonnen!</h1>
                </div>
            </div>
                <div class="row justify-content-center pt-3">
                    <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-blue" on:click="{() => endGame()}">
                        <div class="card-body text-center">
                            <h2 class="c-white">Einde</h2>
                        </div>
                    </div>
                </div>
            </div>
            {:else}
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-md-8 col-lg-6 mb-5 text-center">
                    <h1 class="c-white mb-0">Geef mij</h1>
                    <h1 class="c-white mb-0">door aan</h1>
                    <h1 class="c-white mb-0">{getCurrentPlayer().name}</h1>
                </div>
            </div>
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-blue" on:click="{() => nextRound()}">
                        <div class="card-body text-center">
                            <h2 class="c-white">Start de tijd</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card">
                        <div class="card-body text-center c-purple">
                            <h5 class="d-inline">Ronde {$game.round + 1} </h5>
                            <h6 class="separator mb-4">de stand</h6>
                            {#each getOrderedTeams() as team, i}
                            <h5 class="float-start d-inline">{i+1} {team.name} </h5>
                            <h5 class="float-end d-inline">{team.points}</h5>
                            <div class="clearfix"></div>
                            <hr class="mt-0 mb-4">
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .separator {
        display: flex;
        align-items: center;
        text-align: center;
    }
    .separator::before, .separator::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid #321067;
    }
    .separator::before {
        margin-right: .25em;
    }
    .separator::after {
        margin-left: .25em;
    }
</style>
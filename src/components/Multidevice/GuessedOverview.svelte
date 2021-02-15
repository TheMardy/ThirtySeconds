<script>
    import {currentGameScreen, changeCurrentTeamPoints, getCurrentPlayer, currentFiveWords, goToNextRound } from '../../stores/stores.js'
	import InterimScore from './InterimScore.svelte'
	import { fly } from 'svelte/transition';

function changePoints(inputEvent) {
    if(inputEvent.target.checked) {
        changeCurrentTeamPoints(1);
    } else {
        changeCurrentTeamPoints(-1);
    }
}
</script>

<div class="vertical-center" in:fly>
    <div class="container-fluid">
        <div class="row justify-content-center pt-3">
            <div class="col-12 mb-5 text-center">
                <h5 class="c-white">{getCurrentPlayer().name}</h5>
            </div>
        </div>
        <div class="row justify-content-center pt-3">
            <div class="col-12 mb-5 text-center">
                <h5 class="c-white">Selecteer de</h5>
                <h5 class="c-white">geraden woorden</h5>
            </div>
        </div>
        <div class="row justify-content-center pt-3">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="card">
                    <div class="card-body text-center c-purple border border-secondary m-3">
                        {#each $currentFiveWords as word, i}
                        {#if i == 4}
                        <h4 class="">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" on:click="{(inputBox) => {changePoints(inputBox)}}">
                                <label class="form-check-label" for="flexCheckDefault">
                                    {word}
                                </label>
                            </div>
                        </h4>
                        {:else}
                        <h4 class="mb-3">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" on:click="{(inputBox) => {changePoints(inputBox)}}">
                                <label class="form-check-label" for="flexCheckDefault">
                                    {word}
                                </label>
                            </div>
                        </h4>
                        {/if}
                        {/each}
                        
                    </div>
                </div>
            </div>
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-md-8 col-lg-6 mt-3">
                    <div class="card bg-blue" on:click="{() => {currentGameScreen.set(InterimScore); goToNextRound()}}">
                        <div class="card-body text-center">
                            <h2 class="c-white">Verder <i class="fas fa-chevron-right"></i></h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> 
<style>

</style>


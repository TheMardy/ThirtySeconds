<script>
	import {currentGameScreen, game,  settings, saveSettings, endGame, prevGameScreen, goToHome, setDefaultSettings } from '../stores/stores.js'
    import Credits from './Credits.svelte'
    import Changelog from './Changelog.svelte'
    import { fly } from 'svelte/transition';
    import { _, locale, locales } from 'svelte-i18n'
    
   function changeGoal(){
       saveSettings();
   }

   locale.subscribe((loc) => {
        settings.locale = loc;
        saveSettings();
   });

   async function forceSWupdate () {
        if ('serviceWorker' in navigator) {
            await navigator.serviceWorker.getRegistrations().then(async function (registrations) {
                for (let registration of registrations) {
                    await registration.update();
                }
            })
        }
        window.location.reload(true);
    }
    </script>
    
    <div class="container-fluid pt-2 vh-100 bg-purple" in:fly >
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-end" on:click="{() => currentGameScreen.set($prevGameScreen)}">
                    <i class="c-white fas fa-times"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="c-white">{$_('settings')}</h1>
            </div>
        </div>
    
        <div class="container">
            
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row mb-2 justify-content-center">
                                <div class="col-12">
                                    <label for="pointsGoal" class="form-label">{$_('points_goal')}:</label>
                                    <input inputmode="numeric" pattern="[0-9]*" type="number" class="form-control" id="pointsGoal" bind:value="{$settings.pointsToWin}"
                                    on:change="{() => changeGoal()}">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-blue" on:click="{() => goToHome()}">
                        <div class="card-body text-center">
                            <h3 class="mb-0 c-white">{$_('home')}</h3>
                        </div>
                    </div>
                </div>
            </div>
            {#if $game != null}
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-red" on:click="{() => endGame()}">
                        <div class="card-body text-center">
                            <h3 class="mb-0 c-white">{$_('end_game')}</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/if}
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <select class="form-select" bind:value={$locale}>
                        {#each $locales as locale}
                        <option value={locale}>{locale}</option>
                        {/each}
                    </select>
              </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-red" on:click="{() => setDefaultSettings()}">
                        <div class="card-body text-center">
                            <h3 class="mb-0 c-white">{$_('default_settings')}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row mb-4 mt-5">
                <div class="col-12 c-white text-center">
                    <button on:click="{() => {currentGameScreen.set(Credits)}}" class="btn btn-small bg-blue c-white d-block mx-auto mb-2"><i class="fas fa-crown"></i> Wall of Fame <i class="fas fa-crown"></i></button>
                    <span class="text-decoration-underline" on:click="{() => {currentGameScreen.set(Changelog)}}">Version: 1.1.0</span>
                    <div on:click="{() => forceSWupdate()}" class="d-inline">
                        <i class="fas fa-sync-alt"></i>
                    </div><br>
                    
                    <h6>Made with <i class="fas fa-heart mt-4"></i> by <a href="https://github.com/TheMardy" target="_blank">Mardy</a></h6>
                </div>
            </div>
    </div>
</div>
    
    
    <style>
      .fa-heart {
          color:#d60000;
      }
     
    </style>
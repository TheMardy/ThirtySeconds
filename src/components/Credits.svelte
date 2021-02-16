<script>
	import {currentGameScreen, game,  settings, saveSettings, endGame, prevGameScreen, goToHome } from '../stores/stores.js'
    import Settings from './Singledevice/Settings.svelte'
	import { fly } from 'svelte/transition';
  
    </script>
    
<div in:fly>
    <div class="container-fluid pt-2 vh-100 bg-purple">
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-end" on:click="{() => currentGameScreen.set(Settings)}">
                    <i class="c-white fas fa-times"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="c-white"><i class="fas fa-crown"></i> Wall of Fame <i class="fas fa-crown"></i></h1>
            </div>
        </div>
    
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body text-center">
                            <div class="row mb-2 justify-content-center">
                                <div class="col-12">
                                    <h5>Woorden</h5>
                                </div>
                            </div>
                            <div class="row mb-2 justify-content-center">
                                <div class="col-12">
                                    <span class="d-block">Danya van Marsbergen <small>(81)</small></span>
                                    <span class="d-block">Noreen van den Heuvel <small>(27)</small></span>
                                    <span class="d-block">Mayke Goossens <small>(21)</small></span>
                                </div>
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
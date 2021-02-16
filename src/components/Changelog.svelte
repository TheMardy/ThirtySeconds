<script>
	import {currentGameScreen} from '../stores/stores.js'
    import Settings from './Singledevice/Settings.svelte'
	import { fly } from 'svelte/transition';
  
    let v110 = true;
    let v100 = false;

    </script>
    
    <div class="container-fluid pt-2 vh-100 bg-purple" in:fly>
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-end" on:click="{() => currentGameScreen.set(Settings)}">
                    <i class="c-white fas fa-times"></i>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 text-center">
                <h1 class="c-white">Changelog</h1>
            </div>
        </div>
    
        <div class="container">

            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row justify-content-center">
                                <div class="col-12 text-left">
                                    <hr>
                                    {#if !v110}
                                    <h5 on:click="{() => {v110 = !v110}}"> Version 1.1.0 - 2020-02-08 <i class="fas float-end d-inline fa-chevron-right"></i></h5>
                                    <hr>
                                    {:else}
                                    <h5 on:click="{() => {v110 = !v110}}"> Version 1.1.0 - 2020-02-08 <i class="fas float-end d-inline fa-chevron-down"></i></h5>
                                    <hr>
                                    <h5>Added</h5>
                                    <ul>
                                        <li>Changelog Screen</li>
                                        <li>Possibility to end turn (Thanks for the idea Jip v H)</li>
                                        <li>Help Screen</li>
                                        <li>Wall of Fame</li>
                                        <li>Many words</li>
                                        <li>Possibility to delete Teams</li>
                                        <li>Possibility to delete Players</li>
                                        <li>Useful messages when trying to start game without enough Teams / Players</li>
                                        <li>Reset to default settings button</li>
                                        <li>Transitions between pages</li>
                                    </ul>
                                    <h5>Fixed</h5>
                                    <ul>
                                        <li>Fixed Footer in settings</li>
                                    </ul>
                                    <h5>Changed</h5>
                                    <ul>
                                        <li>Merged App version & Words version into one</li>
                                        <li>Force Update button to smaller sync icon</li>
                                    </ul>
                                    {/if}
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-12 text-left">
                                    {#if !v100}
                                    <h5 on:click="{() => {v100 = !v100}}"> Version 1.0.0 - 2021-02-05 <i class="fas float-end d-inline fa-chevron-right"></i></h5>
                                    <hr>
                                    {:else}
                                    <h5 on:click="{() => {v100 = !v100}}"> Version 1.0.0 - 2021-02-05 <i class="fas float-end d-inline fa-chevron-down"></i></h5>
                                    <hr>
                                    <h5>Added</h5>
                                    <ul>
                                        <li>First Version</li>
                                    </ul>
                                    <h5>Fixed</h5>
                                    <ul>
                                        <li>Nothing</li>
                                    </ul>
                                    <h5>Changed</h5>
                                    <ul>
                                        <li>Nothing</li>
                                    </ul>
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
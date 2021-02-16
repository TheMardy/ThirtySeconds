<script>
   	import {currentGameScreen } from '../stores/stores.js'
    import { fly } from 'svelte/transition';
    import Home from './Singledevice/Home.svelte'
    import MultiDeviceHome from './Multidevice/MultiDeviceHome.svelte'
	import Toast from './Toast.svelte'
	import Help from './Help.svelte'
</script>

<div in:fly>
    <div class="container-fluid pt-2">
        <div class="row mb-3">
            <div class="col-12">
                <div class="float-start" on:click="{() => currentGameScreen.set(Help)}">
                    <i class="c-white fas fa-question-circle"></i>
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
        <div class="container-fluid">
            <div class="row justify-content-center pt-3">
                <div class="col-12 mb-5 text-center">
                    <h5 class="c-white">Kies Modus</h5>
                </div>
            </div>
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-blue" on:click="{() => currentGameScreen.set(MultiDeviceHome)}">
                        <div class="card-body text-center">
                            <h2 class="c-white">Multi Device</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-center pt-3">
                <div class="col-12 col-md-8 col-lg-6 mb-3">
                    <div class="card bg-blue" on:click="{() => currentGameScreen.set(Home)}">
                        <div class="card-body text-center">
                            <h2 class="c-white">Single Device</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>

</style>
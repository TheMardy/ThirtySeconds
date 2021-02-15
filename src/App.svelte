<script>
	import ModesOverview from './components/ModesOverview.svelte'
    import { onMount } from 'svelte'
	import {currentGameScreen, localStorage, prevGameScreen } from './stores/stores.js'

	onMount(() => {
		currentGameScreen.set(ModesOverview);
		prevGameScreen.set(ModesOverview);
        localStorage.set(window.localStorage);
	});

</script>

<main class="">
	<svelte:component this={$currentGameScreen}/>
</main>

<style>
main {
	width: 100%;
	height: 100%;
}
</style>

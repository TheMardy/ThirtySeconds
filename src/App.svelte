<script>
	import Home from './components/Home.svelte'
  import { onMount } from 'svelte'
	import {currentGameScreen, localStorage, prevGameScreen } from './stores/stores.js'

	onMount(() => {
		currentGameScreen.set(Home);
		prevGameScreen.set(Home);
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

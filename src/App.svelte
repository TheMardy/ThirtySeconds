<script>
	import Home from './components/Home.svelte'
    import { onMount } from 'svelte'
	import {currentGameScreen, localStorage, prevGameScreen } from './stores/stores.js'
	import { isLoading } from 'svelte-i18n'

	onMount(() => {
		currentGameScreen.set(Home);
		prevGameScreen.set(Home);
        localStorage.set(window.localStorage);
	});

</script>

<main class="">
	{#if $isLoading}
  Please wait...
{:else}
	<svelte:component this={$currentGameScreen}/>
	{/if}
</main>

<style>
main {
	width: 100%;
	height: 100%;
}
</style>

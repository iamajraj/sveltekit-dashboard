<script>
	import '../app.css';
	import TopBar from '$lib/components/Topbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	import { onMount, setContext } from 'svelte';
	import { sidebarOpen } from '$lib/stores/sidebar';

	import { navigating } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data;

	export const meta = {
		title: 'hello'
	};

	const isMobileScreen = () => window?.innerWidth < 640;

	onMount(() => {
		window.addEventListener('resize', () => {
			sidebarOpen.set(!isMobileScreen());
		});
		sidebarOpen.set(!isMobileScreen());
	});

	setContext('sidebarOpen', sidebarOpen);
</script>

<svelte:head>
	<title>Dashboard | iamajraj</title>
</svelte:head>

<div class="flex w-full h-full">
	<Sidebar />
	<div class="ml-[65px] sm:ml-0 flex flex-col w-full">
		<TopBar users={data.users} />
		<div class="p-5 w-full h-full flex mt-[80px]">
			<div style="width: {$sidebarOpen ? '250px' : '65px'};" class="hidden sm:block shrink-0"></div>
			<div class="w-full h-full">
				{#if $navigating}
					<div class="h-full w-full flex items-center justify-center">
						<Spinner width={40} height={40} />
					</div>
				{:else}
					<slot />
				{/if}
			</div>
		</div>
	</div>
</div>

<SvelteToast />

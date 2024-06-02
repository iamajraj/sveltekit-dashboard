<script lang="ts">
	import { debounce, onClickOutside } from '../utils';
	import { sidebarOpen } from '$lib/stores/sidebar';
	import type { User } from '../api/datatable';

	export let users: User[];

	let showProfileDropdown = false;
	let query = '';
	let showUserDropdown = false;
	let searchInput: HTMLInputElement;

	function showUserList() {
		if (query) {
			showUserDropdown = true;
		} else {
			showUserDropdown = false;
		}
	}

	const debouncedFetchUsers = debounce(showUserList, 300);

	function handleInput() {
		debouncedFetchUsers();
	}

	function toggleProfileDropdown() {
		showProfileDropdown = !showProfileDropdown;
	}

	function toggleSidebar() {
		sidebarOpen.update((value) => !value);
	}

	function closeDropdowns() {
		showProfileDropdown = false;
		showUserDropdown = false;
	}
</script>

<div
	class="topbar fixed top-0 flex items-center justify-between bg-white shadow-md text-gray-800 py-3 px-2 sm:py-4 sm:px-4 w-full sm:w-auto"
	style="width: calc(100% -{$sidebarOpen ? ' 250px' : ' 65px'});left:{$sidebarOpen
		? '250px'
		: '65px'}"
>
	<div class="flex items-center shrink-0">
		<button class="p-1 sm:p-2" on:click={toggleSidebar}>
			<svg
				class="w-6 h-6"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				></path>
			</svg>
		</button>
	</div>

	<div class="relative mx-2 sm:mx-4 w-full max-w-4xl">
		<input
			type="text"
			placeholder="Search..."
			bind:value={query}
			on:input={handleInput}
			class="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
			bind:this={searchInput}
		/>
		{#if showUserDropdown}
			<div class="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg">
				{#each users as user}
					<div class="block px-4 py-2 hover:bg-gray-100 cursor-pointer">
						{user.username}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="relative shrink-0" use:onClickOutside={closeDropdowns}>
		<button class="p-1 sm:p-2" on:click={toggleProfileDropdown}>
			<img
				src="https://cdn-icons-png.flaticon.com/512/5987/5987424.png"
				alt="Profile"
				class="profile-img rounded-full"
			/>
		</button>

		{#if showProfileDropdown}
			<div class="absolute right-0 mt-2 dropdown bg-white border border-gray-300 rounded shadow-lg">
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
				<a href="/signup" class="block px-4 py-2 hover:bg-gray-100">Signup</a>
				<!-- svelte-ignore a11y-invalid-attribute -->
				<a href="#" class="block px-4 py-2 hover:bg-gray-100">Login</a>
			</div>
		{/if}
	</div>
</div>

<style>
	.profile-img {
		width: 32px;
		height: 32px;
	}
	.dropdown {
		min-width: 150px;
	}
</style>

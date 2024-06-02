<script lang="ts">
	import { sidebarOpen } from '$lib/stores/sidebar';
	import dashboardIcon from '../assets/dashboard.svg?raw';
	import formIcon from '../assets/form.svg?raw';
	import settingsIcon from '../assets/settings.svg?raw';

	let menus = [
		{
			id: 'dashboard',
			title: 'Dashboard',
			link: '#',
			icon: dashboardIcon,
			open: false,
			subMenus: [
				{
					title: 'Datatable',
					link: '/datatable'
				},
				{
					title: 'Product Cards',
					link: '/cards'
				},
				{
					title: 'Super Feature',
					link: '#'
				},
				{
					title: 'Extra Feature',
					link: '#'
				}
			]
		},
		{
			id: 'forms',
			title: 'Forms',
			link: '#',
			icon: formIcon,
			open: false,
			subMenus: [
				{
					title: 'Sign up',
					link: '/signup'
				},
				{
					title: 'Log in',
					link: '#'
				},
				{
					title: 'Contact',
					link: '#'
				},

				{
					title: 'Support',
					link: '#'
				}
			]
		},
		{
			id: 'settings',
			title: 'Settings',
			link: '#',
			icon: settingsIcon,
			open: false,
			subMenus: [
				{
					title: 'Profile',
					link: '#'
				},
				{
					title: 'Billings',
					link: '#'
				},
				{
					title: 'Subscriptions',
					link: '#'
				},
				{
					title: 'Action',
					link: '#'
				}
			]
		}
	];

	const openDropDown = (key: string) => {
		menus = menus.map((menu) => {
			if (menu.id === key) {
				return {
					...menu,
					open: !menu.open
				};
			} else {
				return menu;
			}
		});
	};

	const closeSidebar = () => {
		sidebarOpen.update((value) => !value);
	};
</script>

<div
	class="fixed top-0 left-0 bg-primary h-full {$sidebarOpen
		? 'w-[250px] pl-4 sm:pl-10 pr-2 sm:pr-5'
		: 'w-auto px-5'} pt-5 text-white z-[20]"
>
	{#if $sidebarOpen}
		<a href="/">
			<h1 class="text-3xl font-medium">UnGalexy</h1>
		</a>
	{:else}
		<a href="/">
			<h1 class="text-3xl font-medium">U</h1>
		</a>
	{/if}

	<button
		on:click={closeSidebar}
		class="{$sidebarOpen ? 'block' : 'hidden'} sm:hidden absolute top-6 right-4"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="size-6"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
		</svg>
	</button>

	<nav class="mt-10">
		<ul class="flex flex-col gap-4">
			{#each menus as menu}
				<li class="flex flex-col gap-2 relative {!$sidebarOpen ? 'items-center' : ''}">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						on:click={() => openDropDown(menu.id)}
						class="flex gap-2 relative {menu.open
							? 'bg-white/10'
							: 'hover:bg-white/10'} cursor-pointer transition-all {$sidebarOpen
							? 'items-start py-2 px-2'
							: ''}"
					>
						{@html menu.icon}
						{#if $sidebarOpen}
							<p class="select-none">{menu.title}</p>
						{/if}
						{#if menu.subMenus.length > 0}
							{#if $sidebarOpen}
								<svg
									class="absolute right-4 top-1/2 -translate-y-1/2 fill-white {menu.open
										? '-rotate-180'
										: ''}"
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
										fill=""
									/>
								</svg>
							{/if}
						{/if}
					</div>
					<!-- svelte-ignore a11y-invalid-attribute -->
					{#if menu.open && $sidebarOpen}
						<ul class="mt-3 ml-6 flex flex-col gap-2">
							{#each menu.subMenus as subMenu}
								<li>
									<a href={subMenu.link} class="select-none w-full block">{subMenu.title}</a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
</div>

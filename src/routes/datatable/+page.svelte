<script lang="ts">
	export let data;
</script>

<svelte:head>
	<title>Datatable</title>
</svelte:head>

<div class="container mx-auto mt-5">
	<h1 class="text-2xl font-bold mb-4">User Data Table</h1>
	<div class="overflow-x-auto">
		<table class="w-full divide-y divide-gray-200">
			<thead>
				<tr>
					<th
						class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>ID</th
					>
					<th
						class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>Username</th
					>
					<th
						class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>Email</th
					>
					<th
						class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>Phone</th
					>
					<th
						class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>Address</th
					>
				</tr>
			</thead>
			<tbody>
				{#each data.users as user}
					<tr class="bg-white divide-y divide-gray-200">
						<td class="px-6 py-4 whitespace-nowrap">{user.id}</td>
						<td class="px-6 py-4 whitespace-nowrap">{user.username}</td>
						<td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
						<td class="px-6 py-4 whitespace-nowrap">{user.phone}</td>
						<td class="px-6 py-4 whitespace-nowrap"
							>{user.address.city}, {user.address.street}, {user.address.zipcode}</td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

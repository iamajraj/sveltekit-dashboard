<script lang="ts">
	import type { Product } from '$lib/api/products';

	export let data: {
		products: Product[];
		categories: string[];
	};
</script>

<svelte:head>
	<title>Product Cards</title>
</svelte:head>

<div class="container mx-auto mt-5">
	<h1 class="text-2xl font-bold mb-4">Product Dashboard</h1>
	<div class="overflow-y-auto">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-4 pb-20">
			{#each data.products as product}
				<div class="bg-white rounded-lg shadow-md p-4">
					<img
						class="w-full h-48 object-cover mb-4 rounded-lg"
						src={product.image}
						alt={product.title}
					/>
					<div class="flex justify-between items-center mb-2">
						<h2 class="text-lg font-semibold">{product.title}</h2>
						<span class="px-2 py-1 text-xs bg-gray-200 rounded"
							>{data.categories[Math.floor(Math.random() * data.categories.length - 1)]}</span
						>
					</div>
					<p class="text-gray-600 mb-2">${product.price.toFixed(2)}</p>
					<button
						class="bg-[#1C2434] text-white px-4 py-2 rounded-md hover:bg-[#1C243490] active:scale-110 transition-all duration-300 ease-in-out"
						>Add to Cart</button
					>
				</div>
			{/each}
		</div>
	</div>
</div>

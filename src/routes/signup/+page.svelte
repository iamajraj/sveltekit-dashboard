<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { z } from 'zod';
	import Spinner from '$lib/components/Spinner.svelte';
	import { signUpFormSchema as schema } from '$lib/validator';

	let formData = {
		email: '',
		username: '',
		password: '',
		firstName: '',
		lastName: '',
		city: '',
		street: '',
		number: '',
		zipcode: '',
		lat: '',
		lon: '',
		phone: ''
	};

	let errors: z.typeToFlattenedError<typeof formData> | null = null;
	let formLoading = false;

	async function handleSubmit() {
		const validationResult = schema.safeParse(formData);
		console.log(validationResult);
		if (validationResult.success) {
			formLoading = true;
			try {
				const res = await fetch('https://fakestoreapi.com/users', {
					method: 'POST',
					body: JSON.stringify({
						email: formData.email,
						username: formData.username,
						password: formData.password,
						name: {
							firstname: formData.firstName,
							lastname: formData.lastName
						},
						address: {
							city: formData.city,
							street: formData.street,
							number: formData.number,
							zipcode: formData.zipcode,
							geolocation: {
								lat: formData.lat,
								long: formData.lon
							}
						},
						phone: formData.phone
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				});
				const data = await res.json();
				console.log(data);
				formData = {
					email: '',
					username: '',
					password: '',
					firstName: '',
					lastName: '',
					city: '',
					street: '',
					number: '',
					zipcode: '',
					lat: '',
					lon: '',
					phone: ''
				};
				toast.push('Signup successfully!', {
					theme: {
						'--toastColor': 'mintcream',
						'--toastBackground': 'rgba(72,187,120,0.9)',
						'--toastBarBackground': '#2F855A'
					}
				});
			} catch (_) {
				alert('Signup failed!');

				toast.push('Signup failed, please try again.', {
					theme: {
						'--toastColor': 'white',
						'--toastBackground': '#c91a06',
						'--toastBarBackground': '#851205'
					}
				});
			} finally {
				formLoading = false;
			}
		} else {
			errors = validationResult.error.flatten();
		}
	}

	const fillDummyGeolocation = () => {
		formData.lat = '-37.3159';
		formData.lon = '81.1496';
	};

	const fillFormWithDummyData = () => {
		formData = {
			email: 'John@gmail.com',
			username: 'johnd',
			password: 'm38rmF$',
			firstName: 'John',
			lastName: 'Doe',
			city: 'kilcoole',
			street: '7835 new road',
			number: '3',
			zipcode: '12926-3874',
			lat: '-37.3159',
			lon: '81.1496',
			phone: '1-570-236-7033'
		};
	};
</script>

<svelte:head>
	<title>Signup</title>
</svelte:head>

<div class="container mx-auto mt-5 pb-10 max-w-5xl bg-white p-5 sm:p-10 rounded-lg">
	<h1 class="text-2xl font-bold mb-4">Signup</h1>
	<form on:submit|preventDefault={handleSubmit} class="">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- First Name -->
			<div>
				<label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					bind:value={formData.firstName}
					class="input-field"
				/>
				{#if errors?.fieldErrors.firstName}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.firstName}
					</p>{/if}
			</div>
			<!-- Last Name -->
			<div>
				<label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					bind:value={formData.lastName}
					class="input-field"
				/>
				{#if errors?.fieldErrors.lastName}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.lastName}
					</p>{/if}
			</div>
			<!-- City -->
			<div>
				<label for="city" class="block text-sm font-medium text-gray-700">City</label>
				<input type="text" id="city" name="city" bind:value={formData.city} class="input-field" />
				{#if errors?.fieldErrors.city}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.city}
					</p>{/if}
			</div>
			<!-- Street -->
			<div>
				<label for="street" class="block text-sm font-medium text-gray-700">Street</label>
				<input
					type="text"
					id="street"
					name="street"
					bind:value={formData.street}
					class="input-field"
				/>
				{#if errors?.fieldErrors.street}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.street}
					</p>{/if}
			</div>
			<!-- Number -->
			<div>
				<label for="number" class="block text-sm font-medium text-gray-700">Number</label>
				<input
					type="number"
					id="number"
					name="number"
					bind:value={formData.number}
					class="input-field"
				/>
				{#if errors?.fieldErrors.number}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.number}
					</p>{/if}
			</div>
			<!-- ZipCode -->
			<div>
				<label for="zipcode" class="block text-sm font-medium text-gray-700">ZipCode</label>
				<input
					type="text"
					id="zipcode"
					name="zipcode"
					bind:value={formData.zipcode}
					class="input-field"
				/>
				{#if errors?.fieldErrors.zipcode}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.zipcode}
					</p>{/if}
			</div>
			<!-- Latitude -->
			<div>
				<div class="flex items-center gap-1">
					<label for="latitude" class="block text-sm font-medium text-gray-700"
						>Geolocation (Latitude)</label
					>
					<button
						on:click={fillDummyGeolocation}
						type="button"
						class="text-sm bg-primary text-white px-2 py-1 rounded-lg cursor-pointer border border-transparent hover:border hover:border-primary hover:bg-transparent hover:text-black transition-all active:scale-110"
						>Dummy</button
					>
				</div>
				<input
					type="text"
					id="latitude"
					name="latitude"
					bind:value={formData.lat}
					class="input-field"
				/>
				{#if errors?.fieldErrors.lat}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.lat}
					</p>{/if}
			</div>
			<!-- Longitude -->
			<div>
				<div class="flex items-center gap-1">
					<label for="longitude" class="block text-sm font-medium text-gray-700"
						>Geolocation (Longitude)</label
					>
					<button
						on:click={fillDummyGeolocation}
						type="button"
						class="text-sm bg-primary text-white px-2 py-1 rounded-lg cursor-pointer border border-transparent hover:border hover:border-primary hover:bg-transparent hover:text-black transition-all active:scale-110"
						>Dummy</button
					>
				</div>
				<input
					type="text"
					id="longitude"
					name="longitude"
					bind:value={formData.lon}
					class="input-field"
				/>
				{#if errors?.fieldErrors.lon}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.lon}
					</p>{/if}
			</div>
			<!-- Phone -->
			<div>
				<label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
				<input type="tel" id="phone" name="phone" bind:value={formData.phone} class="input-field" />
				{#if errors?.fieldErrors.phone}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.phone}
					</p>{/if}
			</div>
			<!-- Email -->
			<div>
				<label for="email" class="block text-sm font-medium text-gray-700">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					bind:value={formData.email}
					class="input-field"
				/>
				{#if errors?.fieldErrors.email}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.email}
					</p>{/if}
			</div>
			<!-- Username -->
			<div>
				<label for="username" class="block text-sm font-medium text-gray-700">Username</label>
				<input
					type="text"
					id="username"
					name="username"
					bind:value={formData.username}
					class="input-field"
				/>
				{#if errors?.fieldErrors.username}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.username}
					</p>{/if}
			</div>
			<!-- Password -->
			<div>
				<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					bind:value={formData.password}
					class="input-field"
				/>
				{#if errors?.fieldErrors.password}<p class="text-red-500 text-sm">
						{errors?.fieldErrors.password}
					</p>{/if}
			</div>
		</div>
		<div class="mt-6 space-y-4">
			<button
				disabled={formLoading}
				type="submit"
				class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
			>
				{#if formLoading}
					<Spinner />
				{:else}
					Sign Up
				{/if}
			</button>
			<button
				on:click={fillFormWithDummyData}
				type="button"
				class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
			>
				Use dummy data
			</button>
		</div>
	</form>
</div>

<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import '../app.css';
	import type { PageData } from './$types';
	import { quintOut } from 'svelte/easing';

	export let data: PageData;
	const sendUrl = async (url: string, slots: string) => {
		const endpoint: string = `${data.url}/${slots}`;

		let res = await fetch(endpoint, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ url: url })
		});
		resUrl = res.url;
	};
	let url: string = '';
	let slots: string = '';
	let resUrl: string = '';
	let copied: boolean = false;
</script>

<a href="https://github.com/MosheRivkin/linker">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		class="absolute top-0 right-0 m-6 cursor-pointer fill-neutral-content"
		><path
			d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
		/></svg
	></a
>
<div class="hero min-h-screen bg-base-200">
	<form
		class="hero-content flex-col lg:flex-row-reverse gap-10"
		on:submit|preventDefault={() => sendUrl(url, slots)}
	>
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold">Simple Linker.</h1>
			<p class="py-6 w-full">
				Shorten your long URL to a short one.🔗 No need to send long links anymore. 🤩
			</p>
		</div>
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<div class="form-control">
					<label class="label">
						<span class="label-text"> URL </span>
					</label>
					<input
						required
						type="url"
						bind:value={url}
						placeholder="Enter original URL"
						class="input input-bordered"
					/>
				</div>
				<div class="form-control">
					<label class="label">
						<span class="label-text"> Short </span>
					</label>
					<input
						required
						type="text"
						bind:value={slots}
						placeholder="Enter short"
						class="input input-bordered"
					/>
				</div>
				<div class="form-control mt-6">
					<button type="submit" class="btn btn-primary">Submit</button>
				</div>
			</div>
		</div>
	</form>
</div>

<dialog id="modal" class="modal {resUrl && 'modal-open'} transition-all duration-500">
	<form method="dialog" class="modal-box flex flex-col p-10 items-center">
		<h3 class="font-bold text-2xl my-10">Your URL created successfully 🥳</h3>
		<a class="text-lg link-hover cursor-pointer mt-10 mb-4" href={resUrl}
			>{resUrl.replace(/^https:\/\/|\/$/g, '')}</a
		>
		<div id="placeholder" class="h-1 my-0">
			{#if copied}
				<span in:fade={{ duration: 500 }} out:fade={{ duration: 2000 }}>
					<p
						in:fly={{ x: 100, duration: 1000, easing: quintOut }}
						out:fly={{ x: -100, duration: 1000, easing: quintOut }}
						class="text-md text-white cursor-pointer"
					>
						Copied!
					</p>
				</span>
			{/if}
		</div>

		<button
			class="btn btn-secondary btn-wide my-10"
			on:click={() => {
				navigator.clipboard.writeText(resUrl);
				copied = true;
				setTimeout(() => {
					copied = false;
				}, 500);
			}}
		>
			Copy URL
		</button>
	</form>
	<form
		method="dialog"
		class="modal-backdrop bg-black opacity-90"
		on:click={() => (resUrl = '')}
	/>
</dialog>

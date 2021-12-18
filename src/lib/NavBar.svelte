<script>
	import { page, session } from '$app/stores';
	import SideBar from '$lib/SideBar.svelte';

	let showDrawer = true;

	function toggleDrawer() {
		showDrawer = !showDrawer;
	}
</script>

<!-- <nav class="navbar navbar-light">
	<div class="container">
		<a rel="prefetch" class="navbar-brand" href="/">conduit</a>
		<ul class="nav navbar-nav pull-xs-right">
			<li class="nav-item">
				<a rel="prefetch" class="nav-link" class:active={$page.path === '/'} href="/">Home</a>
			</li>

			{#if $session.user}
				<li class="nav-item">
					<a rel="prefetch" href="/editor" class="nav-link" class:active={$page.path === '/editor'}>
						<i class="ion-compose" />&nbsp;New Post
					</a>
				</li>

				<li class="nav-item">
					<a
						rel="prefetch"
						href="/settings"
						class="nav-link"
						class:active={$page.path === '/settings'}>
						<i class="ion-gear-a" />&nbsp;Settings
					</a>
				</li>

				<li class="nav-item">
					<a rel="prefetch" href="{$session.user.avatarUrl}" class="nav-link">
						{$session.user.username}
					</a>
				</li>
			{:else}
				<li class="nav-item">
					<a rel="prefetch" href="/login" class="nav-link" class:active={$page.path === '/login'}>
						Sign in
					</a>
				</li>

				<li class="nav-item">
					<a
						rel="prefetch"
						href="/register"
						class="nav-link"
						class:active={$page.path === '/register'}>
						Sign up
					</a>
				</li>
			{/if}
		</ul>
	</div>
</nav> -->

<nav class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
	<div class="flex-none flex">
		<button class="btn btn-square btn-ghost" on:click={toggleDrawer}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	</div>
	<!-- <div class="flex-none">
		<div class="avatar">
			<div class="rounded-full w-10 h-10 m-1">
				<img src="/logo-256.png" />
			</div>
		</div>
	</div> -->
	<div class="hidden px-2 mx-2 navbar-center flex-1 lg:flex">
		<div class="flex items-stretch">
		  <a class="btn btn-ghost btn-sm rounded-btn" href="/">Dashboard</a> 
		  <a class="btn btn-ghost btn-sm rounded-btn" href="/publishers">Publishers</a> 
		  <a class="btn btn-ghost btn-sm rounded-btn" href="/franchises">Franchises</a> 
          <a class="btn btn-ghost btn-sm rounded-btn" href="/creator">Creators</a>				
		  <a class="btn btn-ghost btn-sm rounded-btn" href="/series">Series</a>
		</div>
	</div>
	
	<div class="flex-1 lg:flex-none">
		<div class="form-control">
			<input type="text" placeholder="Search" class="input input-ghost" />
		</div>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>
		</button>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-ghost">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block w-6 h-6 stroke-current"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
				/>
			</svg>
		</button>
	</div>
	<div class="flex-none">
		<div class="avatar">
			<div class="rounded-full w-10 h-10 m-1">
				<img src="https://i.pravatar.cc/500?img=32" />
			</div>
		</div>
	</div>
</nav>



  

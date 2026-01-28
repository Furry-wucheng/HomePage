<script lang="ts">
  import ThemeToggle from './ThemeToggle.svelte';
  import { siteConfig } from '../config';
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  
  let isOpen = false;
  export let currentPath = '';

  const links = [
    { name: '首页', path: '/' },
    { name: '博客', path: siteConfig.blogUrl || '/blog', external: !!siteConfig.blogUrl },
    { name: '友链', path: '/friends' },
    { name: '日志', path: '/log' },
    { name: '关于我', path: '/about' }
  ];

  onMount(() => {
    currentPath = window.location.pathname;
    
    // Astro View Transitions event
    const handleNavigation = () => {
        currentPath = window.location.pathname;
    };
    
    document.addEventListener('astro:page-load', handleNavigation);
    return () => {
        document.removeEventListener('astro:page-load', handleNavigation);
    };
  });

  function isLinkActive(path: string, current: string) {
    if (path === '/') return current === '/';
    if (path.startsWith('http')) return false; 
    return current.startsWith(path);
  }
</script>

<nav class="fixed top-0 left-0 w-full z-50 transition-all duration-300 pointer-events-none">
  <div class="max-w-340 mx-auto px-4 sm:px-6 lg:px-8 mt-4">
    <div class="flex items-center justify-between h-16">
      
      <!-- Desktop & Mobile Header Container -->
      <div class="flex items-center justify-between w-full md:w-auto">
      
        <!-- Logo / Home Link (Floating Bubble) -->
        <div class="shrink-0 pointer-events-auto mr-4">
            <a href="/" 
               class="group flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm dark:bg-white/5 border border-white/20 shadow-sm hover:shadow-lg hover:bg-white/15 dark:hover:bg-white/15 transition-all duration-300 w-10 h-10 p-0 {isLinkActive('/', currentPath) ? 'ring-2 ring-blue-500/50' : ''}"
               aria-label="Home"
            >
                {#if currentPath !== '/'}
                    <!-- Navbar Avatar (Visible on non-home pages) -->
                    <img 
                        src={siteConfig.avatar} 
                        alt="Logo" 
                        class="w-full h-full rounded-full border border-white/30 object-cover"
                        style="view-transition-name: avatar;" 
                    />
                {/if}
                {#if currentPath === '/'}
                     <!-- Home Icon (Visible on home page) -->
                     <Icon icon="lucide:home" width="20" height="20" class="text-gray-800 dark:text-gray-200" />
                 {/if}
            </a>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden pointer-events-auto flex items-center gap-4">
            <ThemeToggle />
            <button 
                onclick={() => isOpen = !isOpen}
                type="button" 
                class="bg-white/50 dark:bg-white/5 border border-white/20 backdrop-blur-sm shadow-sm hover:shadow-lg hover:bg-white/80 dark:hover:bg-white/15 hover:-translate-y-1 inline-flex items-center justify-center p-2 rounded-full text-gray-800 dark:text-gray-200 transition-all duration-300 focus:outline-none" 
            >
                <span class="sr-only">Open main menu</span>
                {#if !isOpen}
                <Icon icon="lucide:menu" class="block h-6 w-6" />
                {:else}
                <Icon icon="lucide:x" class="block h-6 w-6" />
                {/if}
            </button>
        </div>
      </div>

      <!-- Desktop Menu (Floating Bubble) -->
      <div class="hidden md:block pointer-events-auto">
        <div class="relative flex items-center bg-white/5 dark:bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/5 shadow-sm">
            {#each links as link}
                <a 
                    href={link.path} 
                    target={link.external ? "_blank" : "_self"}
                    class="relative z-10 px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300
                    {isLinkActive(link.path, currentPath) ? 'text-white' : 'text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white'}"
                >
                    {link.name}
                    {#if isLinkActive(link.path, currentPath)}
                        <span class="absolute inset-0 bg-linear-to-r from-blue-600/50 to-blue-500/50 rounded-full -z-10 shadow-md" style="view-transition-name: nav-active;"></span>
                    {/if}
                </a>
            {/each}
        </div>
      </div>

      <!-- Theme Toggle (Desktop) -->
      <div class="hidden md:flex items-center gap-4 pointer-events-auto">
        <ThemeToggle />
      </div>
    </div>
  </div>

  <!-- Mobile Menu -->
  {#if isOpen}
    <div class="md:hidden absolute top-20 left-4 right-4 pointer-events-auto bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg z-50 overflow-hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {#each links as link}
            <a 
                href={link.path}
                target={link.external ? "_blank" : "_self"}
                class="block px-3 py-2 rounded-md text-base font-medium transition-colors
                {isLinkActive(link.path, currentPath) ? 'bg-blue-50 text-blue-600 dark:bg-white/10 dark:text-blue-300' : 'text-gray-800 dark:text-gray-200'}"
            >
                {link.name}
            </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>

<style>
    /* Ensure view transitions work smoothly */
    ::view-transition-group(avatar) {
        animation-duration: 0.5s;
    }
</style>

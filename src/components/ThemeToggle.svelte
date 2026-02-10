<script lang="ts">
  import Icon from '@iconify/svelte';

  type Theme = 'light' | 'dark' | 'system';
  
  // Read initial theme from document (set by Layout.astro before component mounts)
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  let theme = $state<Theme>(savedTheme || 'system');

  // Apply theme whenever it changes
  $effect(() => {
    if (theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  function setTheme(newTheme: Theme) {
    theme = newTheme;
    document.documentElement.dataset.theme = newTheme;
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.theme = newTheme;
    }
  }

  // Calculate position for sliding background
  const position = $derived(theme === 'light' ? 0 : theme === 'system' ? 1 : 2);
</script>

<div class="relative flex items-center gap-2 p-1 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-full border border-white/20 shadow-sm">
    <!-- Sliding background -->
    <span 
        class="absolute w-[34px] h-[34px] rounded-full shadow-sm transition-all duration-300 ease-in-out {theme === 'dark' ? 'bg-white/20' : 'bg-white/80'}"
        style="transform: translateX(calc({position} * (34px + 8px)));"
    ></span>

    <button
        onclick={() => setTheme('light')}
        class="relative z-10 p-2 rounded-full transition-colors duration-300 {theme === 'light' ? 'text-orange-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}"
        aria-label="Light Mode"
    >
        <Icon icon="lucide:sun" width="18" height="18" />
    </button>
    <button
        onclick={() => setTheme('system')}
        class="relative z-10 p-2 rounded-full transition-colors duration-300 {theme === 'system' ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}"
        aria-label="System Mode"
    >
       <Icon icon="lucide:monitor" width="18" height="18" />
    </button>
    <button
        onclick={() => setTheme('dark')}
        class="relative z-10 p-2 rounded-full transition-colors duration-300 {theme === 'dark' ? 'text-yellow-300' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}"
        aria-label="Dark Mode"
    >
        <Icon icon="lucide:moon" width="18" height="18" />
    </button>
</div>

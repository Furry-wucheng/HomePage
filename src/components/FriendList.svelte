<script lang="ts">
  import type { FriendLink } from '../config';

  export let groups: FriendLink[] = [];
</script>

<div class="space-y-12">
  {#each groups as group}
    <section>
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white border-l-4 border-purple-500 pl-4">
            {group.title}
        </h2>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each group.items as friend}
                <a 
                    href={friend.disable ? null : friend.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="group relative block p-6 bg-white/40 backdrop-blur-sm dark:bg-white/5 border border-white/20 rounded-2xl transition-all duration-300 w-full text-left
                    {friend.disable ? 'opacity-60 cursor-not-allowed grayscale filter' : 'hover:-translate-y-1 hover:shadow-xl hover:bg-white/60 dark:hover:bg-white/10'}"
                >
                    <div class="flex items-center space-x-4">
                        <img 
                            src={friend.avatar} 
                            alt={friend.name} 
                            class="w-16 h-16 rounded-full border-2 border-white/30 object-cover shadow-sm group-hover:scale-110 transition-transform duration-300"
                        />
                        <div>
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                {friend.name}
                            </h3>
                            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                {friend.description}
                            </p>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </section>
  {/each}
</div>

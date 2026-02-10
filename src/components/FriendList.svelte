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
                    class="group relative isolate block p-6 bg-white/30 dark:bg-white/10 rounded-2xl shadow-lg transition-all duration-300 w-full text-left overflow-hidden
                    {friend.disable ? 'opacity-60 cursor-not-allowed grayscale filter' : 'hover:-translate-y-1 hover:shadow-2xl'}"
                    style="backdrop-filter: blur(8px);"
                >
                    <!-- 内边框高光层 -->
                    <div class="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-white/20 shadow-[inset_0_0_15px_rgba(255,255,255,0.05)]"></div>
                    
                    <!-- 渐变光泽层 -->
                    <div class="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-50" style="background: linear-gradient(120deg, rgba(255,255,255,0.15) 0%, transparent 40%);"></div>
                    
                    <!-- 内容层 -->
                    <div class="relative z-20 flex items-center space-x-4">
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

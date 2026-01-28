<div class="fixed top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full blur-[100px] -z-1 pointer-events-none opacity-60 mix-blend-multiply dark:mix-blend-screen animate-pulse-slow bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 dark:from-purple-900 dark:via-pink-900 dark:to-blue-900">
</div>

<style>
    @keyframes pulse-slow {
        0%, 100% {
            opacity: 0.6;
            transform: scale(1);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.1);
        }
    }
    .animate-pulse-slow {
        animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
</style>

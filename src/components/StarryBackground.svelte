<div class="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-linear-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-black transition-colors duration-500">
    <div class="stars absolute inset-0"></div>
    <div class="stars2 absolute inset-0"></div>
    <div class="stars3 absolute inset-0"></div>
</div>

<style>
    /* 
       Star generation using box-shadow is a classic and performant technique 
       for static or simple parallax stars without heavy JS.
    */
    .stars {
        width: 1px;
        height: 1px;
        background: transparent;
        box-shadow: 10vw 10vh #a0aec0, 20vw 50vh #cbd5e0, 80vw 10vh #a0aec0,
            90vw 80vh #cbd5e0, 50vw 50vh #a0aec0, 30vw 30vh #cbd5e0,
            60vw 90vh #a0aec0, 10vw 90vh #cbd5e0;
        animation: animStar 100s linear infinite;
    }
    .stars2 {
        width: 2px;
        height: 2px;
        background: transparent;
        box-shadow: 15vw 15vh #718096, 25vw 55vh #a0aec0, 85vw 15vh #718096,
            95vw 85vh #a0aec0, 55vw 55vh #718096, 35vw 35vh #a0aec0,
            65vw 95vh #718096, 15vw 95vh #a0aec0;
        animation: animStar 150s linear infinite;
    }
    .stars3 {
        width: 3px;
        height: 3px;
        background: transparent;
        box-shadow: 20vw 20vh #4a5568, 30vw 60vh #718096, 90vw 20vh #4a5568,
            99vw 90vh #718096, 60vw 60vh #4a5568, 40vw 40vh #718096,
            70vw 99vh #4a5568, 20vw 99vh #718096;
        animation: animStar 200s linear infinite;
    }

    :global(.dark) .stars {
        box-shadow: 10vw 10vh #fff, 20vw 50vh #cbd5e0, 80vw 10vh #fff,
            90vw 80vh #cbd5e0, 50vw 50vh #fff, 30vw 30vh #cbd5e0,
            60vw 90vh #fff, 10vw 90vh #cbd5e0;
    }
    :global(.dark) .stars2 {
         box-shadow: 15vw 15vh #e2e8f0, 25vw 55vh #ebf8ff, 85vw 15vh #e2e8f0,
            95vw 85vh #ebf8ff, 55vw 55vh #e2e8f0, 35vw 35vh #ebf8ff,
            65vw 95vh #e2e8f0, 15vw 95vh #ebf8ff;
    }

     /* Add twinkling effect */
    @keyframes animStar {
        from {
            transform: translateY(0px);
        }
        to {
            transform: translateY(-2000px);
        }
    }
</style>

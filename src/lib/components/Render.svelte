<script>

    let { balls } = $props();
    const n = balls.length;
    const binds = [];  // le state c'est juste pour éviter le message dans la console : `bind:this={binds[index]}` (src/lib/components/Render.svelte:32:25) is binding to a non-reactive property

    for (let i=0; i<n; i++) {
        let bind;
        binds.push(bind);
    };

    $effect(() => {
        for (let i = 0; i<n; i++) {
            binds[i].style.width = balls[i].radius * 2 + 'px';
            binds[i].style.height = balls[i].radius * 2 + 'px';
        };
        const rendering_interval = setInterval(() => 
        {
            for (let i = 0; i<n; i++) {
                binds[i].style.left = balls[i].coords.x - balls[i].radius + 'px';
                binds[i].style.top = balls[i].coords.y - balls[i].radius + 'px';
            }
        }
        , 10);

        return () => {clearInterval(rendering_interval)};
        
    });
</script>
<section>
    {#each balls as ball, index}
        <div role="none" bind:this={binds[index]}
            onmousedown={() => {ball.drag = true;}} 
            onmousemove={(event)=>
            {  
                if (ball.drag) {
                    ball.coords.x = event.clientX;
                    ball.coords.y = event.clientY;
                }
            }}
            onmouseup={() => {
                ball.drag = false;
                ball.last_coords.x = ball.coords.x;
                ball.last_coords.y = ball.coords.y;
            }}>
        </div>
    {/each}
</section>

<style>
    section {
        background-color: rgba(234, 137, 245, 0.146);
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
    }
    div {
        background-color: rgb(188, 96, 238);
        position: absolute;
        border-radius: 50%;
    }
</style>
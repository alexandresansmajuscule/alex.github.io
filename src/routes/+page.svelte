<script>
    import Render from '$lib/components/Render.svelte';
    import { Ball } from '$lib/physics_engine.js'
    
    const balls = [];
    const n = 1000;  // 5184 pour un rayon = 10
    
    for (let i = 0; i<n-2; i++) {
        balls.push(new Ball(((i*20)%1920)+10, 1080 - Math.floor((i*20)/1920)*20, 10));
        //balls.push(new Ball(Math.random()*1920, Math.random()*1080, 10));
    }
    balls.push(new Ball(Math.random()*1920, Math.random()*1080, 50))
    balls.push(new Ball(Math.random()*1920, Math.random()*1080, 100))
    $effect(() => {
        const physics_interval = setInterval(() => 
        {  

            for (let i = 0; i<n-1; i++) {
                for (let j = i+1; j<n; j++) {
                    if (Ball.checks_collision (balls[i], balls[j])) {
                        Ball.responds_collision (balls[i], balls[j]);
                    }
                }
            }

            for (let ball of balls) {
                ball.update_coords(0.001);
                ball.apply_constraints(window.innerWidth, window.innerHeight);
            }
        }
        , 1);

        return () => {clearInterval(physics_interval)};
    });

    

</script>

<Render { balls } />

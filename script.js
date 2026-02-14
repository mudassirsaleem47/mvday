/* Game Logic & Confetti */

document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const scenes = {
        1: document.getElementById('scene1'),
        2: document.getElementById('scene2'),
        '2-1': document.getElementById('scene2-1'),
        '2-2': document.getElementById('scene2-2'),
        '2.5': document.getElementById('scene2-5'),
        3: document.getElementById('scene3'),
        4: document.getElementById('scene4')
    };
    
    // --- Scene 2.5 Elements ---
    const suspenseText = document.getElementById('suspense-text');
    const suspenseBtn = document.getElementById('suspense-btn');

    // New Scene Buttons
    const btn2_1 = document.getElementById('btn-2-1');
    const btn2_2 = document.getElementById('btn-2-2');

    const introText = document.getElementById('intro-text');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const music = document.getElementById('bg-music');
    
    // Setup initial state
    let currentScene = 1;
    let suspenseIndex = 0;

    // --- Suspense Journey (Question + Button Text) ---
    const suspenseJourney = [
        { q: "Are you ready, my love? 🌹", b: "Yes, I am!" },
        { q: "Are you really, really ready? 😲", b: "Totally Ready!" },
        { q: "This is specifically for you, Meri Jaan...", b: "Okay, tell me!" },
        { q: "Do you trust your Mudassir?", b: "With all my heart ❤️" },
        { q: "Pakka? Soch lo ek baar aur! 😉", b: "100% Pakka!" },
        { q: "Promise you won't laugh, Cutie?", b: "I Promise 🤞" },
        { q: "Close your lovely eyes... (no cheating!)", b: "Eyes Closed 🙈" },
        { q: "Okay, open them in 3... 2... 1...", b: "Show me! 😍" }
    ];

    // ... (rest of helper functions remain the same) ...

    startBtn.addEventListener('click', () => {
        music.play().catch(e => console.log("Music play failed:", e));
        switchScene(2);
        runScene2();
    });

    // --- Scene 2: Buildup ---
    function runScene2() {
        const msg = document.getElementById('message-text');
        // Reset text just in case
        msg.innerText = "Listen closely...";

        setTimeout(() => {
            msg.innerText = "I have something to tell you...";
            setTimeout(() => {
                msg.innerText = "Something special...";
                setTimeout(() => {
                    nextBtn.classList.remove('hidden');
                }, 1500);
            }, 2000);
        }, 1500);
    }

    nextBtn.addEventListener('click', () => {
        switchScene('2-1');
    });

    // --- Scene 2.1 & 2.2 Logic ---
    btn2_1.addEventListener('click', () => {
        switchScene('2-2');
    });

    btn2_2.addEventListener('click', () => {
    // Initialize Suspense Journey
        suspenseText.innerText = suspenseJourney[0].q;
        suspenseBtn.innerText = suspenseJourney[0].b;
        suspenseIndex = 1; 
        switchScene('2.5');
    });

    // --- Scene 2.5: The Suspense Loop ---
    // --- Scene 2.5: The Suspense Loop ---
    suspenseBtn.addEventListener('click', () => {
        if (suspenseIndex < suspenseJourney.length) {
            // Fade out
            suspenseText.style.opacity = 0;
            suspenseBtn.style.opacity = 0;

            setTimeout(() => {
                // Update Content
                suspenseText.innerText = suspenseJourney[suspenseIndex].q;
                suspenseBtn.innerText = suspenseJourney[suspenseIndex].b;

                // Fade in
                suspenseText.style.opacity = 1;
                suspenseBtn.style.opacity = 1;

                suspenseIndex++;
            }, 300);
        } else {
            switchScene(3);
        }
    });

    // --- Scene 3: The Question (with Rose) ---
    function typeWriter(text, element, speed = 100, callback) {
        let i = 0;
        element.innerHTML = '';
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }
    
    // Helper: Switch Scene
    function switchScene(sceneNumber) {
        // Hide all scenes
        Object.values(scenes).forEach(scene => {
            if (!scene) return;
            scene.classList.remove('active'); // Fade out
            setTimeout(() => {
                // Only hide display if it's really inactive (race condition check)
                if(!scene.classList.contains('active')) {
                    scene.classList.remove('visible');
                    scene.classList.add('hidden');
                }
            }, 1000); // Wait for transition (1s)
        });
        
        // Show new scene
        const newScene = scenes[sceneNumber];
        newScene.classList.remove('hidden');
        newScene.classList.add('visible'); // display: block, opacity: 0
        
        // Small delay to allow browser to render block before fading in
        requestAnimationFrame(() => {
            setTimeout(() => {
                newScene.classList.add('active'); // opacity: 1
            }, 50);
        });
        
        currentScene = sceneNumber;
    }

    // --- Scene 1: Suspense ---
    // Make sure Scene 1 is visible initially
    if (scenes[1]) {
        scenes[1].classList.remove('hidden');
        scenes[1].classList.add('visible');
        setTimeout(() => scenes[1].classList.add('active'), 100);
    }

    // Start typing after a short delay
    setTimeout(() => {
        typeWriter("Hello Maria...", introText, 150, () => {
             // Wait, then clear and type next line
             setTimeout(() => {
                 introText.innerHTML = "";
                 typeWriter("Is that you?", introText, 150, () => {
                     startBtn.classList.remove('hidden');
                     startBtn.style.opacity = 0;
                     fadeIn(startBtn);
                 });
             }, 1000);
        });
    }, 1000);
    
    function fadeIn(element) {
        let op = 0.1;
        let timer = setInterval(function () {
            if (op >= 1){
                clearInterval(timer);
            }
            element.style.opacity = op;
            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
            op += op * 0.1;
        }, 50);
    }

    // --- Start Button Click ---
    // Note: We already attached a listener above, but let's make sure it's clean.
    // The previous listener block (lines 100-106 in original) was removed/replaced by the previous tool call.
    // We need to ensure we don't have duplicate logic.
    // The previous tool call ADDED the listener. So here we just focus on the other scenes.

    // --- Scene 2.5 Logic ---
    suspenseBtn.addEventListener('click', () => {
        if (suspenseIndex < suspenseQuestions.length) {
            // Fade text out slightly for effect? Or just swap.
            suspenseText.style.opacity = 0;
            setTimeout(() => {
                suspenseText.innerText = suspenseQuestions[suspenseIndex];
                suspenseText.style.opacity = 1;
                suspenseIndex++;
            }, 300);
        } else {
            switchScene(3);
        }
    });
    
    const noTexts = [
        "No 😢", 
        "Are you sure?", 
        "Really sure?", 
        "Think again!", 
        "Last chance!", 
        "Unbelievable 🥺", 
        "You're breaking my heart!", 
        "I'm gonna cry...", 
        "Pls don't do this", 
        "Look at the other button!", 
        "Choose YES! ❤️",
        "Ek baar or soch lo!",
        "Maan jao na!"
    ];
    let noClickCount = 0;

    // "No" button runs away and talks back
    noBtn.addEventListener('mouseover', evadeNo);
    noBtn.addEventListener('click', evadeNo);
    
    function evadeNo() {
        // 1. Move the button randomly
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        
        noBtn.style.position = 'fixed'; // Make sure it breaks out of flow
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
        
        // 2. Change Text (Funny/Emotional)
        noClickCount++;
        const textIndex = Math.min(noClickCount, noTexts.length - 1);
        noBtn.innerText = noTexts[textIndex];
        
        // 3. Make YES button BIGGER (The "Imposing" Yes)
        const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize);
        const currentPadding = parseFloat(window.getComputedStyle(yesBtn).paddingLeft);
        
        yesBtn.style.fontSize = `${currentSize * 1.2}px`;
        yesBtn.style.padding = `${currentPadding * 1.1}px ${currentPadding * 1.5}px`; // Grow padding too
        
        // Add a random floating heart when she tries to click no (to soften the blow)
        createFloatingEmoji('💔');
    }
    
    // Helper: Floating Emojis
    function createFloatingEmoji(emoji) {
        const el = document.createElement('div');
        el.innerText = emoji;
        el.style.position = 'fixed';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.bottom = '-50px';
        el.style.fontSize = Math.random() * 20 + 20 + 'px';
        el.style.transition = 'bottom 3s ease-in, opacity 3s ease-in';
        el.style.zIndex = 1000;
        el.style.pointerEvents = 'none';
        document.body.appendChild(el);
        
        setTimeout(() => {
            el.style.bottom = '100vh';
            el.style.opacity = '0';
        }, 100);
        
        setTimeout(() => el.remove(), 3000);
    }
    
    yesBtn.addEventListener('click', () => {
        switchScene(4);
        startConfetti();
        // Launch a barrage of hearts
        setInterval(() => createFloatingEmoji('❤️'), 200);
    });

    // Audio Playback (Optional Mock)
    function playMusic() {
        const audio = document.getElementById('bg-music');
        if(audio) {
            audio.play().catch(e => console.log("Audio play failed (needs interaction):", e));
        }
    }

    // --- Confetti Effect (Simple Implementation) ---
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    
    function startConfetti() {
        for(let i=0; i<100; i++) {
            particles.push(createParticle());
        }
        animateConfetti();
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            rotation: Math.random() * 360
        };
    }
    
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            p.y += p.speed;
            p.rotation += 2;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
            
            if(p.y > canvas.height) {
                p.y = -20;
                p.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animateConfetti);
    }
    
    // Resize canvas
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

});

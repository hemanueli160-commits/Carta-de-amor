const mobile_mq = window.matchMedia("(max-width:400px)");
const tablet_mq = window.matchMedia("(min-width:401px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");

function resize_notes() {
    notes.forEach(note => {
        note.classList.remove("active");
        gsap.set(note, { height: "30%", clearProps: "all" });
    });
}

function notes_ready() {
    gsap.to(".js-envelop-contnt", { height: "110%", duration: 1 });
}

function set_up_paper() {
    const arr = [0, 0, 100, 0, 50, 61];
    gsap.set(".js-up-paper", {
        bottom: "97%",
        rotation: 180,
        zIndex: 200,
        clipPath: `polygon(${arr[0]}% ${arr[1]}%, ${arr[2]}% ${arr[3]}%, ${arr[4]}% ${arr[5]}%)`,
        onComplete: notes_ready
    });
}

function envelop_transition() {
    gsap.to(".js-up-paper", {
        bottom: "1%",
        duration: 0.25,
        onComplete: set_up_paper
    });
    document.querySelector(".js-up-paper").removeEventListener("click", envelop_transition);
    document.querySelector(".js-up-paper").classList.remove("cursor");
}

function sticker_click() {
    gsap.to(".js-sticker", { width: "20px", left: "-80px", opacity: 0, duration: 0.5 });
    document.body.classList.remove("scissors");
    document.querySelector(".js-sticker").removeEventListener("click", sticker_click);
    
    const upPaper = document.querySelector(".js-up-paper");
    upPaper.addEventListener("click", envelop_transition);
    upPaper.classList.add("cursor");
}

// Clique nas Notas
notes.forEach((note, i) => {
    note.addEventListener("click", function() {
        if (this.classList.contains("active")) {
            this.classList.remove("active");
            gsap.set(this, { height: "30%", clearProps: "all" });
        } else {
            resize_notes(); // Fecha as outras
            this.classList.add("active");
            
            let h = "70%";
            if (mobile_mq.matches) h = (125 + 40 * i) + "%";
            else if (tablet_mq.matches) h = (80 + 21 * i) + "%";
            else h = (70 + 20 * i) + "%";
            
            gsap.set(this, { height: h, zIndex: 600 });
        }
    });
});

document.querySelector(".js-sticker").addEventListener("click", sticker_click);
window.onresize = resize_notes;
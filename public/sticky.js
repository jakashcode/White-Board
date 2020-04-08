
let parent;
let stickyvar;
function createSticky() {
    const body = document.querySelector("body");
//created sticky
    const StickyPad = document.createElement("div");
    const navbar = document.createElement("div");
    const writingPad = document.createElement("div");
    const close = document.createElement("div");
    const minmize = document.createElement("div");
    const textArea = document.createElement("textarea");
//added styling
    StickyPad.setAttribute("class", "sticky-pad")
    navbar.setAttribute("class", "navbar")
    writingPad.setAttribute("class", "writingPad")
    close.setAttribute("class", "colors")
    minmize.setAttribute("class", "colors");
    textArea.setAttribute("class", "text-area");
    minmize.classList.add("minmize");
    close.classList.add("close");
//added to canvas/application
    StickyPad.appendChild(navbar);
    StickyPad.appendChild(writingPad);
    navbar.appendChild(close);
    navbar.appendChild(minmize);
    writingPad.appendChild(textArea);
    body.appendChild(StickyPad);
    parent = navbar;
    stickyvar=StickyPad;

    let flag = true;
    //to make the stcky movable
    minmize.addEventListener("click", function () {

        if (flag) {

            writingPad.classList.add("hidden")
        } else {
            writingPad.classList.remove("hidden");
        }
        flag = !flag

    })
    close.addEventListener("click", function () {
        StickyPad.remove();
    })
    addListeners()
}
function addListeners() {

    let isDown = false;
    let intialX;
    let intialY;
    parent.addEventListener("mousedown", function (e) {
        isDown = true;
        intialX = e.clientX;
        intialY = e.clientY;
    });
    parent.addEventListener("mousemove", function (e) {
        if (!isDown)
            return;
        let finalX = e.clientX;
        let finalY = e.clientY;
        let diffX = finalX - intialX;
        let diffY = finalY - intialY;
        const { top, left } = stickyvar.getBoundingClientRect();
        stickyvar.style.top = top + diffY + "px";
        stickyvar.style.left = left + diffX + "px";

        intialY = finalY;
        intialX = finalX;



    });
    parent.addEventListener("mouseleave", function (e) {
        isDown = false;

    })
}
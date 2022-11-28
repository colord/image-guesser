function draw() {
    const canvas = document.querySelector('#image-display');
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            /*
            TODO - Scale image to the size of the canvas dimensions
            TODO - Convert image to array
            TODO - Get the average pixel color value based on a 2x2 dimension
            TODO - Display modified image based on updated pixel array
            */
            ctx.drawImage(img, 0, 0);
        };
        img.src = "/static/img/a.jpg";
    }
}

window.onload = ev => {
    draw();
};

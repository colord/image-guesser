function draw() {
    const canvas = document.querySelector('#image-display');
    const canvas_w = 800;
    const canvas_h = 800;
    const numOfImages = 5;

    canvas.setAttribute('width', canvas_w);
    canvas.setAttribute('height', canvas_h);
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const img = new Image();
        img.onload = () => {
            /*
            TODO - Get the average pixel's rgba based on each1 2x2 subsection of the canvas
            TODO - Display modified image based on updated pixel array
            */

            // Get average pixel of image by shrinking it down to a 1x1 pixel
            ctx.drawImage(img, 0, 0, 1, 1);
            const averagePixel = ctx.getImageData(0, 0, 1, 1).data;
            const averageColor = `rgba(
                ${averagePixel[0]}, 
                ${averagePixel[1]}, 
                ${averagePixel[2]}, 
                ${averagePixel[3]}
            )`;
            document.body.style.backgroundColor = averageColor;

            // Scale image to the size of the canvas

            /* TODO - Max dimensions of the canvas are 800x800
                    - if the image's height is larger than the width (for example),
                    - scale the height down to match the canvas height
                    - then scale the img width to the img height 

                QUESTIONS:
                - how do I succinctly say that the if the width is greater than height, 
                - do configuration A otherwise, do configuration B?

                - Maybe just do a bunch of if statements then refactor!!!!
            */
            const ratio = img.naturalWidth / img.naturalHeight;
            const referencePoint = Math.max(img.naturalWidth, img.naturalHeight);
            console.log(referencePoint);
            // Assume the height is greater than the width!!
            const scaledImgH = canvas.height;
            const scaledImgW = scaledImgH * ratio;
            const centerX = (canvas.width - scaledImgW) / 2;
            const centerY = (canvas.height - scaledImgH) / 2;
            ctx.drawImage(img, centerX, centerY, scaledImgW, scaledImgH);


            // Iterate through pixel array, count pixels
            // const averageColor = {
            //     red: 0,
            //     green: 0,
            //     blue: 0,
            //     alpha: 0
            // };
            // const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            // for (let i = 0; i < imgData.data.length; i++) {
            // }
        };

        // Randomize picture on refresh
        // TODO - Pick random image with no repeats!
        const getRandomImgNum = () => {
            return Math.floor(Math.random() * numOfImages);
        };
        img.src = `/static/img/${getRandomImgNum()}.jpg`;
    }
}

window.onload = ev => {
    draw();
};

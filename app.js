function draw() {
    const canvas = document.querySelector('#image-display');
    const canvasW = 1000;
    const canvasH = 1000;
    const numOfImages = 5;

    // TODO - Pick random image with no repeats!
    const getRandomImgNum = () => {
        return Math.floor(Math.random() * numOfImages);
    };

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const img = new Image();

        img.onload = () => {
            /*
            TODO - Get the average pixel's rgba based on each1 2x2 subsection of the canvas
            TODO - Display modified image based on updated pixel array
            */
            // Scale image to the size of the canvas
            let scaledImgW, scaledImgH;

            if (img.naturalWidth > img.naturalHeight) {
                // scale image dependent on width
                const ratio = img.naturalHeight / img.naturalWidth;
                scaledImgW = canvasW;
                scaledImgH = scaledImgW * ratio;
                canvas.setAttribute('width', scaledImgW);
                canvas.setAttribute('height', scaledImgH);
            }
            else {
                // scale image dependent on height
                const ratio = img.naturalWidth / img.naturalHeight;
                scaledImgH = canvasH;
                scaledImgW = scaledImgH * ratio;
                canvas.setAttribute('width', scaledImgW);
                canvas.setAttribute('height', scaledImgH);
            }
            const centerX = (canvas.width - scaledImgW) / 2;
            const centerY = (canvas.height - scaledImgH) / 2;

            ctx.drawImage(img, centerX, centerY, scaledImgW, scaledImgH);

            setBackground(img);
            goToNextImage(img, getRandomImgNum());


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
        img.src = `static/img/${getRandomImgNum()}.jpg`;
    }
}

function setBackground(img) {
    const imgURL = new URL(img.src);
    document.body.style.backgroundImage = `url(${imgURL.pathname})`;
}

/* 
TODO - The next button can't be clicked too fast. Something to do with changing the img.src??
     - Improve the speed of next image loading
*/
function goToNextImage(img, randomImgNum) {
    const nextImageBtn = document.querySelector("#btn-next-image");
    nextImageBtn.addEventListener("click", ev => {
        console.log('next');
        img.src = `static/img/${randomImgNum}.jpg`;
    });
}

window.onload = ev => {
    draw();
};

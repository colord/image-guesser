var show = false;

function draw() {
    const canvas = document.querySelector('#image-display');
    const canvasW = 900;
    const canvasH = 900;
    const numOfImages = 7;
    let pixelationFactor = 80;

    // TODO - Pick random image with no repeats!
    const getRandomImgNum = () => {
        return Math.floor(Math.random() * numOfImages);
    };

    if (canvas.getContext) {
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        const img = new Image();

        img.onload = () => {
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
            addNextImageBtn(img, getRandomImgNum());
            addShowBtn();

            function animate() {
                requestAnimationFrame(animate);
                if (show) ctx.drawImage(img, centerX, centerY, scaledImgW, scaledImgH);
                // setTimeout(() => { pixelationFactor -= 2; console.log('yes') }, 2000);
            }
            animate();


            let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            ctx.imageSmoothingEnabled = false;
            if (!show) {
                // Draw the pixelized image
                for (let y = 0; y < canvas.height; y += pixelationFactor) {
                    for (let x = 0; x < canvas.width; x += pixelationFactor) {
                        // extract the position of the sample pixel
                        const pixelPos = (x + y * canvas.width) * 4;
                        ctx.fillStyle = `rgba(
                          ${imgData[pixelPos]},
                          ${imgData[pixelPos + 1]},
                          ${imgData[pixelPos + 2]},
                          ${imgData[pixelPos + 3]}
                        )`;
                        ctx.fillRect(x, y, pixelationFactor, pixelationFactor);
                    }
                }
            }
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
function addNextImageBtn(img, randomImgNum) {
    const nextImageBtn = document.querySelector("#btn-next-image");
    nextImageBtn.addEventListener("click", ev => {
        img.src = `static/img/${randomImgNum}.jpg`;
    });
}

function addShowBtn() {
    const showBtn = document.querySelector("#btn-show");
    showBtn.addEventListener("click", ev => {
        show = !show;
    });
}

window.onload = ev => {
    draw();
};

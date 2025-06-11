const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// prompt the user to select media stream, pass to video element, then play
async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = async () => {
        videoElement.play();
        button.disabled = true;
        await videoElement.requestPictureInPicture();
        button.disabled = false;
    };
  } catch (error) {
    console.error('Error accessing display media.', error);
  }
}

button.addEventListener('click', async () => {
    if (!document.pictureInPictureElement) {
        selectMediaStream();
    }
    else {
        await document.exitPictureInPicture();
        videoElement.srcObject.getTracks().forEach(track => track.stop());
        videoElement.srcObject = null;
        selectMediaStream();
    }
});


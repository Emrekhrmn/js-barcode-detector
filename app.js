document.addEventListener('DOMContentLoaded', function() {
    startCamera();
  });

  async function startCamera() {
    try {
      // camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      const video = document.getElementById('video');
      video.srcObject = stream;

      const barcodeDetector = new BarcodeDetector();

      setInterval(async () => {
        try {
          const canvas = document.getElementById('canvas');
          const context = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const barcodes = await barcodeDetector.detect(canvas);
          barcodes.forEach(barcode => {
            console.log('Detected barcode:', barcode.rawValue); 
            document.getElementById('barcode').innerHTML = barcode.rawValue;
          });
        } catch (error) {
          console.error('Barcode detection error:', error);
        }
      }, 1000); // per 1 second
    } catch (error) {
      console.error('Camera access error:', error);
    }
  }

    let cropper = null;

    // Image Upload Handler
    document.getElementById('imageInput').addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(event) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = `<img id='uploadedImage' src='${event.target.result}'/>`;
        
        if (cropper) {
          cropper.destroy();
        }

        const image = document.getElementById('uploadedImage');
        cropper = new Cropper(image, {
          aspectRatio: 35/45,
          viewMode: 1,
          autoCropArea: 1,
          responsive: true,
          guides: true
        });
      };
      reader.readAsDataURL(file);
    });

    // Process Button Handler
    document.getElementById('processBtn').addEventListener('click', function() {
      if (!cropper) {
        alert('Please upload an image first');
        return;
      }

      const format = document.getElementById('formatSelect').value;
      const bgColor = document.getElementById('bgColor').value;
      
      const croppedCanvas = cropper.getCroppedCanvas({
        fillColor: bgColor,
        imageSmoothingQuality: 'high'
      });

      // Create download link
      const downloadLink = document.createElement('a');
      downloadLink.download = `GoojDex_pan-photo.${format}`;
      downloadLink.href = croppedCanvas.toDataURL(`image/${format}`);
      downloadLink.innerHTML = 'Download Resized Photo';
      downloadLink.className = 'btn btn-success w-100';

      // Update download section
      const downloadSection = document.getElementById('downloadSection');
      downloadSection.innerHTML = '';
      downloadSection.appendChild(downloadLink);
    });

    // Dimension Select Handler
    document.getElementById('dimensionSelect').addEventListener('change', function() {
      const customInput = document.getElementById('customSizeInput');
      customInput.style.display = this.value === 'custom' ? 'block' : 'none';
    });
  

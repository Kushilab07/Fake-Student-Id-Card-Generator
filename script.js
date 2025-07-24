// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Get all the elements on the card that will be updated
    const card = {
        logo: document.getElementById('logo'),
        profilePhoto: document.getElementById('profilePhoto'),
        studentName: document.getElementById('studentName'),
        studentClass: document.getElementById('studentClass'),
        rollNumber: document.getElementById('rollNumber'),
        dob: document.getElementById('dob'),
        year: document.getElementById('year'),
        address: document.getElementById('address'),
        mobile: document.getElementById('mobile'),
        universityName: document.getElementById('universityName')
    };

    // Get all the input fields
    const inputs = {
        name: document.getElementById('inputName'),
        class: document.getElementById('inputClass'),
        roll: document.getElementById('inputRoll'),
        dob: document.getElementById('inputDob'),
        year: document.getElementById('inputYear'),
        address: document.getElementById('inputAddress'),
        mobile: document.getElementById('inputMobile'),
        universityName: document.getElementById('inputUniversityName'),
        profilePhoto: document.getElementById('inputProfilePhoto'),
        logo: document.getElementById('inputLogo')
    };
    
    const updateButton = document.getElementById('updateButton');
    const downloadButton = document.getElementById('downloadButton');

    // Function to update the card content
    const updateCard = () => {
        card.studentName.textContent = inputs.name.value || card.studentName.textContent;
        card.studentClass.textContent = inputs.class.value || card.studentClass.textContent;
        card.rollNumber.textContent = inputs.roll.value || card.rollNumber.textContent;
        card.dob.textContent = inputs.dob.value || card.dob.textContent;
        card.year.textContent = inputs.year.value || card.year.textContent;
        card.address.textContent = inputs.address.value || card.address.textContent;
        card.mobile.textContent = inputs.mobile.value || card.mobile.textContent;
        card.universityName.textContent = inputs.universityName.value || card.universityName.textContent;
    };

    // Function to handle image file updates
    const updateImage = (fileInput, imageElement) => {
        if (fileInput.files && fileInput.files[0]) {
            imageElement.src = URL.createObjectURL(fileInput.files[0]);
        }
    };

    // Event listener for the update button
    updateButton.addEventListener('click', updateCard);
    
    // Event listeners for file inputs
    inputs.profilePhoto.addEventListener('change', () => updateImage(inputs.profilePhoto, card.profilePhoto));
    inputs.logo.addEventListener('change', () => updateImage(inputs.logo, card.logo));
    
    // FIXED: Event listener for the download button with error handling
    downloadButton.addEventListener('click', () => {
        const cardElement = document.querySelector('.id-card-holder');
        
        // Check if html2canvas is loaded
        if (typeof html2canvas === 'undefined') {
            alert("Error: Download library (html2canvas) is not loaded. Please check the script tag in your HTML file.");
            return;
        }
        
        console.log("Starting ID card capture...");

        // Use html2canvas to capture the element
        html2canvas(cardElement, {
            scale: 3,       // Increase scale for a higher resolution image
            useCORS: true,  // Important for loading images from other domains
            logging: false, // Set to true for detailed debugging in console
        }).then(canvas => {
            console.log("Capture successful. Creating download link.");
            
            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            
            // Create a dynamic filename
            const studentName = card.studentName.textContent.trim();
            link.download = studentName ? `${studentName}-ID-Card.png` : 'ID-Card.png';
            
            // Trigger the download and clean up
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            console.log("Download triggered.");
            
        }).catch(error => {
            // This is crucial for debugging
            console.error("Error capturing the ID card:", error);
            alert("Could not download the ID card. An error occurred. This can happen if external images (like the initial logo) are blocked. Try uploading your own images first. Check the console (F12) for more details.");
        });
    });
});
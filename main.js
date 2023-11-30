
const avatarContainer = document.querySelector(".avatar-container");
const options = document.querySelectorAll(".option");
const none = document.querySelectorAll(".none");
const avatarLayers = {};

document.addEventListener('DOMContentLoaded', (event) => {
    // Set default avatar parts
    setDefaultAvatar();

    // Hide all option containers initially
    // document.querySelectorAll('.options-container').forEach(container => {
    //     container.style.display = 'none';
    // }); Not sure when it could be useful, maybe when hiding the menus before the personalisation?
});

function setDefaultAvatar() {
    // Define the default parts and their layers
    const defaultParts = [
        { layer: '10', src: 'img/background.png' },
        { layer: '11', src: 'img/Cross/Cross1.png' },
        { layer: '13', src: 'img/skull.png' },
        { layer: '14', src: 'img/Teeth/Teeth1.png' },
        { layer: '15', src: 'img/Eyes/Eyes1.png' },
        { layer: '19', src: 'img/Hat/Hat1.png' }
    ];

    // Apply each default part
    defaultParts.forEach(part => {
        updateAvatarLayer(part.layer, part.src);
    });
}

function updateAvatarLayer(layerIndex, imageSrc) {
    // Create and add the new element
    const imgElement = document.createElement("img");
    imgElement.src = imageSrc;
    imgElement.classList.add("avatar-layer");
    imgElement.style.zIndex = layerIndex;
    avatarContainer.appendChild(imgElement);

    // Update the layers record
    avatarLayers[layerIndex] = imgElement;
}

options.forEach(option => {
    option.addEventListener("click", () => {
        const layerIndex = option.getAttribute("data-layer");
        
        // Remove currently active element in the same layer
        if (avatarLayers[layerIndex]) {
            avatarContainer.removeChild(avatarLayers[layerIndex]);
            delete avatarLayers[layerIndex];
        }
        // Create and add the new element
        const selectedOption = document.createElement("img");
        selectedOption.src = option.getAttribute("data-image-src");
        selectedOption.classList.add("avatar-layer");
        selectedOption.style.zIndex = layerIndex;
        avatarContainer.appendChild(selectedOption);

        // Update the layer and element records
        avatarLayers[layerIndex] = selectedOption;
    });
});

none.forEach(noneButton => {
    noneButton.addEventListener("click", () => {
        const layerIndex = noneButton.getAttribute("data-layer");
        // Remove currently active element in the same layer
        if (avatarLayers[layerIndex]) {
            avatarContainer.removeChild(avatarLayers[layerIndex]);
            delete avatarLayers[layerIndex];
        }
    });
});

// Initialize display state of option containers
// document.addEventListener('DOMContentLoaded', (event) => {
//     document.querySelectorAll('.options-container').forEach(container => {
//         container.style.display = 'none';
//     });
// });
// Not sure of what it does

// Toggle visibility of option containers
// document.querySelectorAll('.catalog-button').forEach(button => {
//     button.addEventListener('click', () => {
//         const targetId = button.getAttribute('data-target');
//         const targetElement = document.getElementById(targetId);
//         if (targetElement) {
//             targetElement.style.display = targetElement.style.display === 'none' ? 'block' : 'none';
//         }
//     });
// });
// Not sure either

// Add event listeners for opening the modals
document.querySelectorAll('.catalog-button').forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        const modal = document.getElementById(targetId);
        if (modal) {
            modal.style.display = 'block';
        }
    });
});

// Add event listeners for closing the modals (with the close icon)
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const targetId = closeBtn.getAttribute('data-target');
        const modal = document.getElementById(targetId);
        if (modal) {
            modal.style.display = 'none';
        }
    });
});

// Close the modal if the user clicks outside of it
window.addEventListener('click', function(event) {
    // Get all modals
    const modals = document.querySelectorAll('.modal');

    // Check each modal to see if the click was outside its content
    modals.forEach(function(modal) {
        const modalContent = modal.querySelector('.modal-content');
        // If the click is outside the modal content, then hide the modal
        if (event.target == modal && modalContent && !modalContent.contains(event.target)) {
            modal.style.display = 'none';
        }
    });
});

function updateCanvas(callback) {
    let canvas = document.getElementById('avatarCanvas');
    canvas.width = 3000; // Set canvas width
    canvas.height = 3000; // Set canvas height
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    let imagesLoaded = 0;
    const totalImages = Object.values(avatarLayers).length;

    Object.values(avatarLayers).forEach(layer => {
        let img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                callback(); // All images are loaded, execute the callback
            }
        }
        img.src = layer.src; // Set the source of the image
    });
}

document.getElementById('downloadButton').addEventListener('click', function() {
    updateCanvas(function() {
        // This function gets called once all images are loaded and drawn to the canvas
        let canvas = document.getElementById('avatarCanvas');
        let image = canvas.toDataURL("image/png", 1.0); // Convert canvas to PNG at full quality

        // Create a temporary link and trigger the download
        let tmpLink = document.createElement('a');
        tmpLink.download = 'Cap.png'; // Set the download name
        tmpLink.href = image;
        document.body.appendChild(tmpLink); // Add to the DOM
        tmpLink.click(); // Simulate click
        document.body.removeChild(tmpLink); // Remove the temporary link
    });
});

function resizeAndRealignAvatarLayers() {
    const avatarSection = document.querySelector('.avatar-container');

    avatarSection.style.width = '1000px'; // Takes the first third of the page width
    avatarSection.style.height = '100%'; // Takes the full height of the viewport
    avatarSection.style.position = 'relative'; // Ensures that absolutely positioned elements inside it are relative to it
    avatarSection.style.float = 'left'; // Makes it stick to the left


    const avatarLayers = document.querySelectorAll('.avatar-layer');
    avatarLayers.forEach(layer => {
        layer.style.width = '200px'; // Set the width of the image
        layer.style.height = 'auto'; // Keep the aspect ratio

        // Center the image horizontally, with a slight offset to the left
        layer.style.position = 'absolute';
        layer.style.top = '300px';
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Open the window connect modal
    document.getElementById('windowConnectButton').addEventListener('click', function() {
        resizeAndRealignAvatarLayers();
        document.getElementById('window-connect-modal').style.display = 'block';
    });

    // Close the modal when the close button is clicked
    // Assuming the close button has a class 'close'
    var closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            this.closest('.modal-connect').style.display = 'none';
        });
    });

    // Add any other necessary JavaScript code...
});

function closeWindowConnectModal() {
    document.getElementById('window-connect-modal').style.display = 'none';
}


// Modal Connect section

document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('connectButton').addEventListener('click', event => {
        ethereum.request({ method: 'eth_requestAccounts' })
        .then(accounts => {
            if (accounts.length === 0) {
                console.log('No accounts found');
            } else {
                const account = accounts[0];
                const displayAccount = account.substring(0, 7) + '...' + account.substring(account.length - 5);
                console.log('Connected account:', account);
                
                // Get the walletInfo div
                const walletInfoDiv = document.getElementById('walletInfo');
                
                // Set the text of the walletInfo div
                walletInfoDiv.innerText = displayAccount;
                
                // Make the walletInfo div visible
                walletInfoDiv.style.display = 'block';
            }
        })
        .catch(error => {
            console.error(error);
        });
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const treeTypeSelect = document.getElementById('treeType');
    const windSpeedSlider = document.getElementById('windSpeed');
    const windSpeedValue = document.getElementById('windSpeedValue');
    const windSpeedDisplay = document.getElementById('windSpeedDisplay');
    const windDirectionSlider = document.getElementById('windDirection');
    const windDirectionValue = document.getElementById('windDirectionValue');
    const windDirectionDisplay = document.getElementById('windDirectionDisplay');
    const precipitationSlider = document.getElementById('precipitation');
    const precipitationValue = document.getElementById('precipitationValue');
    const precipitationDisplay = document.getElementById('precipitationDisplay');
    const frontalAreaDensitySlider = document.getElementById('frontalAreaDensity');
    const frontalAreaDensityValue = document.getElementById('frontalAreaDensityValue');

    const house = document.getElementById('house');
    const tree = document.getElementById('tree');

    // Constants
    const constants = {
        momentumAbsorption: {
            oak: 1,
            pine: 0.8,
            palm: 0.5
        },
        airDensity: 1
    };

    // Update slider values
    windSpeedSlider.addEventListener('input', () => {
        windSpeedValue.textContent = windSpeedSlider.value;
        windSpeedDisplay.textContent = `${windSpeedSlider.value} mph`;
        updateAnimation();
    });

    windDirectionSlider.addEventListener('input', () => {
        windDirectionValue.textContent = windDirectionSlider.value;
        windDirectionDisplay.textContent = convertDirection(windDirectionSlider.value);
        updateAnimation();
    });

    precipitationSlider.addEventListener('input', () => {
        precipitationValue.textContent = precipitationSlider.value;
        precipitationDisplay.textContent = `${precipitationSlider.value} in/h`;
        updateAnimation();
    });

    frontalAreaDensitySlider.addEventListener('input', () => {
        frontalAreaDensityValue.textContent = `${frontalAreaDensitySlider.value}%`;
        updateAnimation();
    });

    treeTypeSelect.addEventListener('change', () => {
        updateAnimation();
    });

    function updateAnimation() {
        const treeType = treeTypeSelect.value;
        const windSpeed = windSpeedSlider.value;
        const windDirection = windDirectionSlider.value;
        const frontalAreaDensity = frontalAreaDensitySlider.value;

        // Set tree image based on type
        if (treeType === 'oak') {
            tree.src = 'path-to-oak-image.png';
        } else if (treeType === 'pine') {
            tree.src = 'path-to-pine-image.png';
        } else {
            tree.src = 'path-to-palm-image.png';
        }

        // Calculate momentum absorption
        const momentumAbsorption = constants.momentumAbsorption[treeType];
        const momentum = windSpeed * constants.airDensity * frontalAreaDensity / 100 * momentumAbsorption;

        // Example GSAP animation
        gsap.to(tree, {
            rotation: windSpeed / 2,
            x: windSpeed * 2,
            duration: 1,
            ease: 'power1.inOut'
        });

        gsap.to(house, {
            rotation: windSpeed / 4,
            x: windSpeed,
            duration: 1,
            ease: 'power1.inOut'
        });

        // Display popup for protection options if wind speed is high
        if (windSpeed >= 75) {
            document.getElementById('protectionOptions').classList.remove('hidden');
        } else {
            document.getElementById('protectionOptions').classList.add('hidden');
        }
    }

    function convertDirection(degree) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.floor((degree + 22.5) / 45) % 8;
        return directions[index];
    }

    updateAnimation(); // Initialize animation on load
});

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

    const windSpeedHand = document.getElementById('windSpeedHand');
    const windDirectionHand = document.getElementById('windDirectionHand');
    const precipitationHand = document.getElementById('precipitationHand');

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

    // The code for updating the sliders value
    windSpeedSlider.addEventListener('input', () => {
        windSpeedValue.textContent = windSpeedSlider.value;
        windSpeedDisplay.textContent = `${windSpeedSlider.value} mph`;
        updateAnimation();
        updateMeter(windSpeedSlider.value, 'windSpeed');
    });

    windDirectionSlider.addEventListener('input', () => {
        windDirectionValue.textContent = windDirectionSlider.value;
        windDirectionDisplay.textContent = convertDirection(windDirectionSlider.value);
        updateAnimation();
        updateMeter(windDirectionSlider.value, 'windDirection');
    });

    precipitationSlider.addEventListener('input', () => {
        precipitationValue.textContent = precipitationSlider.value;
        precipitationDisplay.textContent = `${precipitationSlider.value} in/h`;
        updateAnimation();
        updateMeter(precipitationSlider.value, 'precipitation');
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

        // Set tree image based on type but no images or svgs for now
        if (treeType === 'oak') {
            tree.src = 'path-to-oak-image.png';
        } else if (treeType === 'pine') {
            tree.src = 'path-to-pine-image.png';
        } else {
            tree.src = 'path-to-palm-image.png';
        }

        // Calculate momentum absorption used gpt for this tho
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

        // Display popup for protection options if wind speed is high...
        if (windSpeed >= 75) {
            document.getElementById('protectionOptions').classList.remove('hidden');
        } else {
            document.getElementById('protectionOptions').classList.add('hidden');
        }
    }

    function updateMeter(value, type) {
        let hand;
        let factor;
        switch (type) {
            case 'windSpeed':
                hand = windSpeedHand;
                factor = 1.5; // Example factor for wind speed
                break;
            case 'windDirection':
                hand = windDirectionHand;
                factor = 1; // Wind direction is direct rotation
                break;
            case 'precipitation':
                hand = precipitationHand;
                factor = 3.6; // Example factor for precipitation
                break;
        }
        gsap.to(hand, {
            rotation: value * factor,
            transformOrigin: '50% 50%',
            duration: 1,
            ease: 'power1.inOut'
        });
    }

    function convertDirection(degree) {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.floor((degree + 22.5) / 45) % 8;
        return directions[index];
    }

    updateAnimation();
});

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

     // Protection buttons
    const pruningButton = document.getElementById('pruning');
    const copperWireButton = document.getElementById('copperWire');
    const mulchingButton = document.getElementById('mulching');
    const magnifyingGlassButton = document.getElementById('magnifyingGlass');


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


        // Display popup for protection options if wind speed is high...
        if (windSpeed >= 75) {
            document.getElementById('protectionOptions').classList.remove('hidden');
            document.getElementById('protectionOptions').classList.add('show');
        } else {
            document.getElementById('protectionOptions').classList.add('hidden');
            document.getElementById('protectionOptions').classList.remove('show');
        }

        // Calculate momentum absorption
        const momentumAbsorption = constants.momentumAbsorption[treeType];
        const momentum = windSpeed * constants.airDensity * frontalAreaDensity / 100 * momentumAbsorption;

        // Calculate sway values
        const swayAngle = windSpeed / 10;
        const swayX = Math.cos(windDirection * Math.PI / 180) * windSpeed / 2;
        const swayY = Math.sin(windDirection * Math.PI / 180) * windSpeed / 2;

        // Get individual parts of the tree
        const leaves = document.querySelectorAll('#tree .leaves');
        const branches = document.querySelectorAll('#tree .branches');
        const trunk = document.querySelector('#tree .trunk');

        // Animate leaves
        gsap.to(leaves, {
            rotation: swayAngle * 1.5,
            x: swayX * 1.5,
            y: swayY * 1.5,
            duration: 1,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
        });

        // Animate branches
        gsap.to(branches, {
            rotation: swayAngle,
            x: swayX,
            y: swayY,
            duration: 1.5,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
        });

        // Animate trunk
        gsap.to(trunk, {
            rotation: swayAngle / 2,
            x: swayX / 2,
            y: swayY / 2,
            duration: 2,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
        });
    }

    function updateMeter(value, type) {
        let angle = (value / 100) * 180;
        if (type === 'windSpeed') {
            windSpeedHand.setAttribute('transform', `rotate(${angle}, 50, 50)`);
        } else if (type === 'windDirection') {
            windDirectionHand.setAttribute('transform', `rotate(${angle}, 50, 50)`);
        } else if (type === 'precipitation') {
            precipitationHand.setAttribute('transform', `rotate(${angle}, 50, 50)`);
        }
    }

    function convertDirection(value) {
        const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
        const index = Math.round(value / 22.5) % 16;
        return directions[index];
    }

    /// Function to apply protection measures
    function applyProtection(button, reductionPercentage) {
        const windSpeed = windSpeedSlider.value;
        const reducedWindSpeed = windSpeed - (windSpeed * reductionPercentage / 100);
        windSpeedSlider.value = reducedWindSpeed;
        windSpeedValue.textContent = reducedWindSpeed;
        windSpeedDisplay.textContent = `${reducedWindSpeed} mph`;
        updateAnimation();

        // Toggle active class
        const buttons = [pruningButton, copperWireButton, mulchingButton, magnifyingGlassButton];
        buttons.forEach(btn => {
            if (btn === button) {
                btn.classList.add('bg-green-500');
            } else {
                btn.classList.remove('bg-green-500');
            }
        });
    }

    // Add event listeners to protection buttons
    pruningButton.addEventListener('click', () => applyProtection(pruningButton, 10));
    copperWireButton.addEventListener('click', () => applyProtection(copperWireButton, 15));
    mulchingButton.addEventListener('click', () => applyProtection(mulchingButton, 5));
    magnifyingGlassButton.addEventListener('click', () => applyProtection(magnifyingGlassButton, 20));


    updateAnimation(); // Initial call to set the animation
});

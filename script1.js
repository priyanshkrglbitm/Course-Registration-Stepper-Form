let currentStep = 0;

document.addEventListener("DOMContentLoaded", function() {
    showStep(currentStep);
});

function showStep(step) {
    let steps = document.getElementsByClassName("step");
    let indicators = document.getElementsByClassName("step-indicator");

    // Hide all steps
    for (let i = 0; i < steps.length; i++) {
        steps[i].style.display = "none";
        indicators[i].classList.remove("active");
    }

    // Show the current step
    steps[step].style.display = "block";
    indicators[step].classList.add("active");

    // Manage the navigation buttons
    document.getElementById("prevBtn").style.display = step === 0 ? "none" : "inline";
    document.getElementById("nextBtn").style.display = step === steps.length - 1 ? "none" : "inline";
    document.getElementById("submitBtn").style.display = step === steps.length - 1 ? "inline" : "none";
}

function nextStep() {
    let steps = document.getElementsByClassName("step");
    if (!validateForm()) return false;

    steps[currentStep].style.display = "none";
    currentStep++;

    if (currentStep >= steps.length) {
        document.getElementById("stepperForm").submit();
        return false;
    }

    showStep(currentStep);
}

function prevStep() {
    let steps = document.getElementsByClassName("step");
    steps[currentStep].style.display = "none";
    currentStep--;
    showStep(currentStep);
}

function validateForm() {
    let valid = true;
    let steps = document.getElementsByClassName("step");
    let inputs = steps[currentStep].getElementsByTagName("input");
    let firstInvalidInput = null;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === "") {
            inputs[i].classList.add("invalid");
            valid = false;
            if (!firstInvalidInput) firstInvalidInput = inputs[i];
        } else {
            inputs[i].classList.remove("invalid");
        }
    }

    if (!valid) {
        alert("Please fill out all fields before proceeding.");
        if (firstInvalidInput) firstInvalidInput.focus();
    }

    return valid;
}


const stepsContainerArray = ["step1", "step2", "step3", "step4"];
const requiredInputFieldsStep1 = ["firstName", "userEmail", "userPhone"];
const radioNameStep1 = ["contact_method"];
const priceField = document.getElementById("price");
const nextButtonStep1 = document.getElementById("nextSlide1");
const nextButtonStep2 = document.getElementById("nextSlide2");
const nextButtonStep3 = document.getElementById("nextSlide3");
const nextButtonStep4 = document.getElementById("nextSlide4");
const containerStep1 = document.getElementById("step1");
const containerStep2 = document.getElementById("step2");
const containerStep3 = document.getElementById("step3");
const containerStep4 = document.getElementById("step4");
const errorText = document.getElementById("error_text");
const backButtonsArray = ["backBtnSlide2", "backBtnSlide3", "backBtnSlide4"];

const submissionCRMObj = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    contact_method: "",
    labor_only: "",
    labor_and_truck: "",
    moving_date: "",
    moving_time: "",
    pickup_location: "",
    address: "",
    flights_of_stairs: "",
    elevator: "",
    apartment: "",
    drop_off_location: "",
    drop_off_location_2: "",
    files: "",
    inventory_list: "",
    price: ""
}

// document.getElementById("datePicker").addEventListener("change", () => {
//     console.log(document.getElementById("datePicker").value)
// })

containerStep2.classList.add("hidden");
containerStep3.classList.add("hidden");
containerStep4.classList.add("hidden");
errorText.classList.add("hidden");

const grabInputValues = (inputId) => {
    const inputElement = document.getElementById(inputId);
    return inputElement.value;
}

const grabCheckedValue = (containerId, elementName) => {
    const checkedValue = document.getElementById(`${containerId}`).querySelector(`input[name="${elementName}"]:checked`)?.value;

    return checkedValue;
}

backButtonsArray.forEach((backBtn, index) => {
    const btn = document.getElementById(backBtn);
    const previousSlideNumber = parseInt(backBtn[backBtn.length - 1]) - 1;

    btn.addEventListener("click", () => {
        const previousSlide = document.getElementById(`step${previousSlideNumber}`)

        previousSlide.classList.remove("hidden");
        document.getElementById(`step${previousSlideNumber + 1}`).classList.add("hidden")
        errorText.classList.add("hidden")
    })
})

nextButtonStep1.addEventListener("click", () => {

    let isAllFilled = false;

    requiredInputFieldsStep1.forEach((fieldId) => {
        const field = document.getElementById(fieldId);

        if (field.value || field.value !== "") {

            const checkboxValue = document.getElementById("communication_method").querySelector('input[name="contact_method"]:checked')?.value;

            if (checkboxValue) {
                isAllFilled = true;
            }

        } else {
            isAllFilled = false;
        }
    })

    if (isAllFilled) {
        containerStep1.classList.add("hidden");
        containerStep2.classList.remove("hidden");
        errorText.classList.add("hidden");

        submissionCRMObj.first_name = grabInputValues("firstName");
        submissionCRMObj.last_name = grabInputValues("lastName");
        submissionCRMObj.email = grabInputValues("userEmail");
        submissionCRMObj.phone = grabInputValues("userPhone");
        submissionCRMObj.contact_method = grabCheckedValue("communication_method", "contact_method");
    } else {
        errorText.classList.remove("hidden");
    }

    console.log(submissionCRMObj)

})

nextButtonStep2.addEventListener("click", () => {

    containerStep2.classList.add("hidden");
    containerStep3.classList.remove("hidden");

    submissionCRMObj.labor_only = grabCheckedValue("labor_only", "labor_Only");

    submissionCRMObj.labor_and_truck = grabCheckedValue("labor_and_truck", "labor_and_truck");
    submissionCRMObj.moving_date = grabInputValues("datePicker");
    submissionCRMObj.moving_time = grabInputValues("moving_time");
    submissionCRMObj.pickup_location = grabCheckedValue("pickup_location", "pickup location")
    submissionCRMObj.address = grabInputValues("address");
    submissionCRMObj.flights_of_stairs = grabInputValues("flights_of_stairs");
    submissionCRMObj.elevator = grabCheckedValue("elevator", "elevator");
    submissionCRMObj.apartment = grabCheckedValue("apartment", "apartment");
    submissionCRMObj.drop_off_location = grabCheckedValue("drop_off_location", "drop of location");
    submissionCRMObj.drop_off_location_2 = grabInputValues("drop_off_location2");

})

nextButtonStep3.addEventListener("click", () => {
    containerStep3.classList.add("hidden");
    containerStep4.classList.remove("hidden");
    const imageInputField = document.getElementById("file_input");
    const imageDescription = document.getElementById("image_description");

    submissionCRMObj.inventory_list = grabInputValues("inventory_listing_input");
    submissionCRMObj.files = imageInputField.files[0];

    imageInputField.addEventListener("change", () => {

        if (imageInputField.files.length > 0) {
            imageDescription.classList.remove("hidden");
            imageDescription.textContent = `⎙ ${imageInputField.files[0].name}`;
        }

    })

})

nextButtonStep4.addEventListener("click", () => {
    if (grabInputValues("price")) {
        submissionCRMObj.price = grabInputValues("price");
        errorText.classList.add("hidden")

        fetch("https://smart-moving-backend-integration-o6oy276in.vercel.app/api/submit-lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submissionCRMObj)
        }).then(res => res.json()).then(data => console.log("Sent to smartMoving : ", data)).catch(error => {
            console.error("There's something more : ", error);
        })
    } else {
        errorText.classList.remove("hidden");
    }
})
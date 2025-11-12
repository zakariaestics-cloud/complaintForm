const elements = {
  name: document.getElementById("full-name"),
  email: document.getElementById("email"),
  order: document.getElementById("order-no"),
  productCode: document.getElementById("product-code"),
  quantity: document.getElementById("quantity"),
  complaints: document.querySelectorAll("input[name='complaint']"), // complaint group of checkboxes
  complaintDesc: document.getElementById("complaint-description"),
  solutions: document.querySelectorAll("input[name='solutions']"),// solution group of radio buttons
  solutionDesc: document.getElementById("solution-description"),
  form: document.getElementById("form"),
  submit: document.getElementById("submit-btn"),
  otherCheck: document.getElementById("other-complaint"),
  otherRadio: document.getElementById("other-solution"),
  checkBoxFather : document.getElementById("complaints-group"),
  radioFather : document.getElementById("solutions-group"),
  resultMsg: document.getElementById("message-box"),
};
const patterns = {
    name: /[a-zA-Z]+\s+[a-zA-Z]+/i,
    email: /[a-zA-Z]+@domain.com/i,
    productCode: /[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}-[a-zA-Z]{2}\d{1}/,
    order: /2024\d{6}/,
}
// this function changes border color based on validity
const colorSwitch= (el,isValid)=>{
    isValid?elements[el].style.borderColor= "green":elements[el].style.borderColor= "red" ;}
    // this checks validity of a single element
const markValid=(el)=>patterns[el].test(elements[el].value) // el => key
function validateForm(e){
    let v={};
    v["full-name"]= markValid("name");
    v["email"]= markValid("email");
    v["order-no"]= markValid("order");
    v["product-code"]= markValid("productCode");
    v["quantity"]= elements.quantity.value>0;
    v["complaints-group"]= loopValidation(elements.complaints);
    v["solutions-group"]= loopValidation(elements.solutions);
    // description checks in case "other" is selected

    if(!elements.otherCheck.checked){
        v["complaint-description"]= true;
    }else if(elements.otherCheck.checked){
        v["complaint-description"]= elements.complaintDesc.value.trim().length >= 20;
    }
    if(!elements.otherRadio.checked){
        v["solution-description"]= true;
    }else if(elements.otherRadio.checked){
        v["solution-description"]= elements.solutionDesc.value.trim().length >= 20;
    }
    
    return v;
}
function highlightErrorFields(e, validation) {
    // Text inputs
    switch (e.target.id) {
        case "full-name": colorSwitch("name", validation["full-name"]); break;
        case "email": colorSwitch("email", validation["email"]); break;
        case "order-no": colorSwitch("order", validation["order-no"]); break;
        case "product-code": colorSwitch("productCode", validation["product-code"]); break;
        case "quantity": colorSwitch("quantity", validation["quantity"]); break;
         default:
    } 
    // Checkboxes
    if (e.target.name === "complaint") {
        colorSwitch("checkBoxFather", validation["complaints-group"]);

        if (elements.otherCheck.checked) {
            colorSwitch("complaintDesc", validation["complaint-description"]);
        } else {
            resetUI(elements.complaintDesc);
        }
    }

    // Radio buttons
    if (e.target.name === "solutions") {
        colorSwitch("radioFather", validation["solutions-group"]);

        if (elements.otherRadio.checked) {
            colorSwitch("solutionDesc", validation["solution-description"]);
        } else {
            resetUI(elements.solutionDesc);
        }
    }
}
// highlight all errors that are not valid
function highlightAllErrors(validation) {
    for (const key in validation) {
       if(validation[key]=== false){
        switch (key) {
            case "full-name": colorSwitch("name", false); break;
            case "email": colorSwitch("email", false); break;
            case "order-no": colorSwitch("order", false); break;
            case "product-code": colorSwitch("productCode", false); break;
            case "quantity": colorSwitch("quantity", false); break;
            case "complaints-group": colorSwitch("checkBoxFather", false); break;
            case "solutions-group": colorSwitch("radioFather", false); break;
        }
       }
    }
    // Handle conditional fields specifically
    if (elements.otherCheck.checked) {
        colorSwitch("complaintDesc", validation["complaint-description"]);
    }

    if (elements.otherRadio.checked) {
 
        colorSwitch("solutionDesc", validation["solution-description"]);
    }
    if(isValid){
        elements.resultMsg.style.color= "green";
        elements.resultMsg.textContent= "Form submitted successfully!";}
    
}
function resetUI(el){
    el.style.borderColor= "";
}
function loopValidation(group){
    return [...group].some(el=>el.checked);
}
function isValid(obj){
    for(const key in obj){
        if(obj[key]!== true)return false;
    }   
    return true;
}
elements.form.addEventListener("change", (e) => {
    // Validate all fields (needed for conditional fields)
    const validation = validateForm();

    // Highlight only the field that triggered the event
    highlightErrorFields(e, validation);
});
elements.submit.addEventListener("click",(e)=>{
    e.preventDefault();
    highlightAllErrors(validateForm());
    
    if(isValid(validateForm())){
        elements.resultMsg.style.color= "green";
        elements.resultMsg.textContent= "Form submitted successfully!";}
        else{
            elements.resultMsg.style.color= "red";
            elements.resultMsg.textContent= "Please fix the errors in the form before submitting.";
        }
})
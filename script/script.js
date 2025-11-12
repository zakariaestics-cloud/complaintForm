const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const orderNoInput = document.getElementById("order-no");
const productCodeInput= document.getElementById('product-code');
const quantityInput = document.getElementById("quantity");
const complaintsGroup= document.querySelectorAll("input[type='checkbox']");
const complaintReasonInput = document.getElementById("complaint-description");

const solutionGroup = document.querySelectorAll("input[type='radio']");
const solutionDescInput= document.getElementById("solution-description")

const otherCheck= document.getElementById("other-complaint");
const otherRadio= document.getElementById("other-solution");

const form = document.getElementById("form");
const submitBtn= document.getElementById("submit-btn");
  const fullName = /[a-zA-Z]+\s+[a-zA-Z]+/i;
  const emailForm= /[a-zA-Z]+@domain.com/i;
  const productCode= /[a-zA-Z]{2}\d{2}-[a-zA-Z]{1}\d{3}-[a-zA-Z]{2}\d{1}/;
  const orderNum = /2024\d{6}/;
  // returns obj with the status of each field
function validateForm(){
  let obj= {
    "full-name": false,
    "email": false,
    "order-no": false,
    "product-code": false,
    "quantity": false,
    "complaints-group": false,
    "complaint-description":false,
    "solutions-group": false,
    "solution-description": false,
  };

  if(fullName.test(nameInput.value)&&fullName.trim("").length>0)obj["full-name"]= true;
  if(emailForm.test(emailInput.value))obj["email"]= true;
  if (orderNum.test(orderNoInput.value))obj["order-no"]= true;
  if(productCode.test(productCodeInput.value))obj["product-code"]= true;
  if(quantityInput.value>0)obj["quantity"]= true;
  let oneIsSelected= false;
  complaintsGroup.forEach((ch)=>ch.checked?oneIsSelected=true:false)
  if(oneIsSelected== true)obj["complaints-group"]= true;

  if(otherCheck.checked)if(solutionDescInput.value.length>=20)obj["solution-description"]= true;

  let radioIsChecked= false;
solutionGroup.forEach((rad)=>rad.checked?radioIsChecked= true:false);
if(radioIsChecked== true)obj["solutions-group"]= true;
if(otherRadio.checked)if(solutionDescInput.value.length>=20)obj["solution-description"]= true;

// isError?false:true;
return obj;
}
// verify all fields are valid
function isValid(obj){
  for(const key in obj){
    if(obj[key]== false&&(obj[key]!== "solution-description"||(obj[key]!==complaint-description)))return false;
  }
  return true;
}
// track each field and highlight errors
form.addEventListener("change",(e)=>{highlightErrorFields(e)})
function highlightErrorFields(e){
  
  let validation = validateForm();
  // for other input fields
  if(validation[e.target.id] == true){
    e.target.style.border= "green 3px solid";
    e.target.style.color= "green";
  }
  else{
    e.target.style.border= "red 3px solid";
    e.target.style.color= "red";
  }
  // for checkboxes and radio buttons
  if(e.target.type=="checkbox"){
if(validation["complaints-group"] == true){
      document.getElementById('complaints-group').style.border= "green 3px solid";
      document.getElementById(e.target.id).style.border= "green 3px solid";
      document.getElementById(e.target.id).style.accentColor= "green";}
      else{
        document.getElementById('complaints-group').style.border= "red 3px solid";
      document.getElementById(e.target.id).style.border= "red 3px solid";
      document.getElementById(e.target.id).style.accentColor= "red";
      }
    }if(e.target.type=="radio" ){
      if(validation["solutions-group"] == true){
        document.getElementById('solutions-group').style.border= "green 3px solid";
        document.getElementById(e.target.id).style.border= "green 3px solid";
        document.getElementById(e.target.id).style.accentColor= "green";
      }else{
        document.getElementById('solutions-group').style.border= "red 3px solid";
        document.getElementById(e.target.id).style.border= "red 3px solid";
        document.getElementById(e.target.id).style.accentColor= "red";
      }
    }
  
}
// verify before submitting.
submitBtn.addEventListener("click",(e)=>{
  const validation = validateForm();
  e.preventDefault();
  if(isValid(validation)){
    alert("Form submitted successfully!");
  }else{
    for(const key in validation){
      if(validation[key]== false){
        document.getElementById(key).style.borderColor= "red 3px solid";
         document.getElementById(key).style.border= "red 3px solid";
        document.getElementById(key).style.color= "red";
      }
    }
  }
});
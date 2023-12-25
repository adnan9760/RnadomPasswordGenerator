const inputSlider=document.querySelector("[data-lengthSlider]");
const datalength=document.querySelector("[data-lengthNumber]");
const uppercasecheck=document.querySelector("#uppercase");
const lowercasecheck=document.querySelector("#lowercase");
const numbercheck=document.querySelector("#number");
const symbolcheck=document.querySelector("#symbol");
const allcheck=document.querySelectorAll("input[type=checkbox]");
const datadisplay=document.querySelector("[data-passwordDisplay]");
const copyMsg=document.querySelector("[data-copyMsg]");
const copybtn=document.querySelector("[data-copy]");
const generatebtn=document.querySelector(".genarate-btn");
const indicator=document.querySelector("[data-indicator]");
const symbol="~`!@#$%^&*();:.>,<";
let password="";
let passwordlength=10;
// let checkcount=0;
handleSlider();
// console.log(allcheck);
function handleSlider(){
    inputSlider.value=passwordlength;
    datalength.innerHTML=passwordlength;
    console.log("handleSlider");
}
function setindicator(color){
indicator.Style.background="color";
indicator.style.shadow="";
}
function getRandomInterger(min , max){
    console.log("random")
    return Math.floor(Math.random()*(max-min)+min);
    
}
function getinteger(){
    console.log("interger");
    return getRandomInterger(0,9);
}
function getuppercase(){
    console.log("upper");
    return String.fromCharCode(getRandomInterger(65,90));
}
function getlowercase(){
    console.log("lower");
    return String.fromCharCode(getRandomInterger(97,122));
}
function getsymbol(){
    const rand= getRandomInterger(0,symbol.length);
    console.log(rand);
    return symbol.charAt(rand);
}
function calstrength(){
    let hasupper=false;
    let haslower=false;
    let hasint=false;
    let hassym=false;
    if(uppercasecheck.checked){
hasupper=true;
    }
    if(lowercasecheck.checked){
        haslower=true;
            }
            if(numbercheckcheck.checked){
                hasint=true;
                    }
                    if(symbolcheck.checked){
                        hassym=true;
                            }
                            if(haslower && hasupper && hassym && hasint && passwordlength>=8){
                                setindicator("#0f0");
                            }
                            else if(hasupper || haslower && hassym && hasint && passwordlength>=6){
                                setindicator("#ff0");

                            }
                            else{
                                setindicator("#fff");
                            }
}
function shufflepassword(Array){
    for(let i=Array.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=Array[i];
        Array[i]=Array[j];
        Array[j]=temp;
    }
    let str="";
    Array.forEach((el)=>{
        str += el
    });
    return str;
}
 async function copycontent(){
try {
    
     await navigator.clipboard.writeText(datadisplay.value);
     
     copyMsg.innerHTML="copied"
} catch (error) {
    copyMsg="faied"
}
copyMsg.classList.add("active");
setTimeout(()=>{
    copyMsg.classList.remove("active")
},2000)
}
inputSlider.addEventListener("input",(e)=>{
    passwordlength=e.target.value;
    handleSlider();
})
function handlecheckboxchange(){
    checkcount=0;
    allcheck.forEach((checkbox)=>{
        if(checkbox.checked){
            checkcount++;
        }
        
        
        console.log("checkcount");
        console.log(checkcount);
    })
    if(passwordlength < checkcount){
        passwordlength=checkcount;
        handleSlider();
    }
}
allcheck.forEach((checkbox)=>{
checkbox.addEventListener('change',handlecheckboxchange);
})


generatebtn.addEventListener("click",()=>{
    console.log("generate");
    if(checkcount ==0){
        return;
    }
    if(passwordlength < checkcount){
        passwordlength=checkcount;
        handleSlider();
    }
   
    password="";
    let funcArr=[];
    if(uppercasecheck.checked){
        console.log("upperchexk")
        funcArr.push(getuppercase);
    }
    if(lowercasecheck.checked){
        funcArr.push(getlowercase);
    }
    if(numbercheck.checked){
        funcArr.push(getinteger);
    }
    if(symbolcheck.checked){
        funcArr.push(getsymbol);
    }
    for(let i=0;i<funcArr.length;i++){
        password += funcArr[i]();
        console.log(password);
    }
    console.log("password");
    for(let i=0;i<passwordlength-funcArr.length;i++){
        let randindex=getRandomInterger(0,funcArr.length);
        password += funcArr[randindex]();
    }
    password=shufflepassword(Array.from(password));
    console.log("before display");
    datadisplay.value=password;
    // calstrength();
});
copybtn.addEventListener('click',()=>{
    if(datadisplay.value){
        copycontent();
    }
});


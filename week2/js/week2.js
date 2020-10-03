function sendInfo(){
    let info = document.getElementById("user_input").value;
    document.getElementById("output_div").textContent = info;
}
function sumNumbers(n){
    let sum = 0;
    for (let i = 0; i <= n; i++) {
        sum +=i;
    }
    return sum;
}
function calculate(){
    let number = parseInt(document.getElementById("user_input_2").value);
    console.log(number)
    if(isNaN(number)){
        alert("invalid number");
    }else{
        document.getElementById("output_div_2").textContent = sumNumbers(number);
    }
}
document.getElementById('btn_2').addEventListener('click',calculate);
// function calculate2(sum,a){
//     console.log("calling a function");
//     console.log(sum(a));
// }
// calculate2(sumNumbers,5);
// const sum = (a) => a+1;
// console.log(sum(1));
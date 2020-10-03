let ex_1_number = 32243;
function reverse_a_number(n) {
    return n.toString().split("").reverse().join("");
}

document.getElementById("ex_1_input").textContent = ex_1_number;
document.getElementById("ex_1_output").textContent = reverse_a_number(ex_1_number);
function function_name() {
    console.log(arguments.callee.name)
}
function_name();

function notRepeatedCharacter(word) {
    let list = word.split('');
    let result;
    let flag;
    for (let i = 0; i < list.length; i++) {
        flag = 0;
        for (let o = 0; o < list.length; o++) {
            if (list[i] == list[o]) {
                flag += 1;
            }
        }
        if (flag < 2) {
            result = list[i];
            break;
        }
    }
    console.log(result);
    return result;
}
notRepeatedCharacter('abacddbec');
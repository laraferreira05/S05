//declarando variáveis
/*
var x,y,z;
x = 5;
y = 6;
z = x + y;
console.log(z)


function exeploLet(){
    var x = 10;
    console.log(x); //saida: 10

    if(true) {
        var x = 20;
        console(x); //saida: 20
    }

    console.log(x);

}

exemploLet();
*/

/*
let inteiros = 10;
let decimal = 10.5;
console.log(typeof inteiro);;

console.log(Math.pow\\(2,3));
console.log(Math.sqrt\\(2,3));
*/

/*

let nome = "João";
let saudacao = "Olá, " + nome + "!";
console.log(saudacao);

let mensagem = "Bem Vindo";
mensagem += " ao JavnaScript";
concole.log(mensagem);

let texto = "JavaScript";
console.log(texto.length);
*/

/*
let frutas = [];
frutas.push("laranja");
frutas.pop();
frutas.push("laranja","maça","banana");
let tamanho = frutas.length;


console.log(frutas);
console.log(tamanho);
console.log(frutas[2]);

frutas.forEach(fruta => console.log(fruta));

*/

/*
let idade = 18;

if (idade >= 18){
    console.log("Maior de idade");
}
else{
    console.log("Menor de idade");
}

let nota = 85;

if(nota >= 90 && idade == 18) {
 console.log("Aprovado com excelencia");
} else if(nota >= 70){
    console.log("Aprovado");
} else {
    console.log("Reprovado");
}

*/
/*
for (let i = 0; i < 5; i++){
    console.log("Iteração " + i);
}

let cores = ["vermelho", "verde" , "azul"];
for(let i = 0);

*/
/*

let cores = ["vermelho", "verde" , "azul"];
for(let i=0; i < cores.length;i++){
console.log(cores[i]);
}


*/
/*
let numero = 42;
let texto = "olá";

console.log(typeof numero === "number");
console.log(typeof numero === typeof texto);

*/

let pessoa = {
    nome: "Lara",
    idade: 20,
    profissão: "engenheiro"
};

console.log(pessoa.nome);
console.log(pessoa["nome"]);
let chave = "nome";
console.log(pessoa[chave]);

for(let chave in pessoa){
    console.log(chave + ": " + pessoa[chave]);
}
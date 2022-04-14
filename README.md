# Jogo da Velha (Tic-tac-toe) ❌⭕
> Sempre tive muita vontade de programar um jogo da velha, mas nunca tive capacidade suficiente para isso. Mas fico muito feliz que resolvi programar ele em um dia pouco antes do almoço, e terminei de programar o core da aplicação no final da tarde. Isso me deixa muito feliz! Estou evoluindo como programador.
> Observei duas coisas muito importantes nesse projeto, que gostaria de compartilhar aqui, os meus códigos ainda não são devidamente comentados, mas vou melhorar nessa parte.

### Estrutura de Dados 🏦
Eu ainda tenho muito que aprender sobre como estruturar dados, mas cada vez percebo que é algo fundamental saber como os dados devem ser organizados dentro de uma aplicação, saber diferenciar var, let e const, entender os objetos JS, funções de Array, por exemplo, utilizar a seguinte estrutura de código é incrível: 

~~~javascript
Array.push({
    propriedade: valor
})
~~~
Pode parecer algo muito simples, mas entender que eu posso passar um objeto para dentro de um Array, e as infinitas possibilidades que isso me traz, é uma ideia incrível, sem contar outras estruturas de dados como Filas e Pilhas. Mas isso é assunto pra outros repositórios.

### Camadas da Aplicação 🐛
Já tentei programar o jogo da velha inúmeras vezes, mas a minha maior dificuldade e as minhas maiores frustrações, era conciliar um código JS com o que estava sendo exibido na tela para o jogador, ou seja misturar as informações visuais com a lógica do jogo, e principalmente, errei muito, utilizando informações visuais para preencher dados da lógica do jogo.
Acho que um apreendizado importantíssimo, foi saber separar a parte lógica da parte visual, tanto é que utilizei uma função `render()` ou seja ela simplismente exibe na tela o que está acontecendo na lógica do jogo.

Ainda vou adicionar uma pequena inteligência artificial para jogar contra o jogador. Então é isso! Bora pro código!! 👨‍💻

![Gatinho Frenético](https://www.tramaweb.com.br/wp-content/uploads/2019/10/f6719fd6-tenor.gif)

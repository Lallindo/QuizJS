var questaoAtual = 0;
var buttonElement = document.getElementById('butNext');
var buttonResetElement = document.getElementById('butReset');
var resultElement = document.getElementById('result');

var questoes = [ // Mais questões podem ser adicionadas para aumentar o quiz.
    ['Quanto é 2 x 5?'], // Q1
    ['Quanto é 7 / 2?'], // Q2
    ['Quanto é 30 * 2?'], // Q3
    ['Quanto é 2^5?'], // Q4
    ['Quanto é 3√16?'], // Q5
    ['Quanto é 10*5+2'] // Q6
]

var respostas = [ // As repostas, em ordem, das questões acima. 
    ['8', '10', '15', '12'], // R1 Corr: index 1
    ['5', '3', '2,5', '3,5'], // R2 Corr: index 3 
    ['30', '90', '60', '65'], // R3 Corr: index 2 
    ['128', '32', '64', '16'], // R4 Corr: index 1 
    ['12', '16', '9', '4'], // R5 Corr: index 0 
    ['50', '52', '70', '55'] // R6 Corr: index 0 
]
var respsCorretas = [2, 4, 3, 2, 1, 2]; // Alternativas corretas de cada questão.

var respsChecked = []; // Array que terá as alternativas clicadas.
var acertos = 0; // Quantidade de acertos.

var tempoPassado = 6 * questoes.length; // Quanto mais questões, mais tempo o jogador terá.
var pararTempo = false; // Variável vai se tornar true caso o tempo chegue a zero ou todas as questões sejam passadas.

document.getElementById('tempoText').innerHTML = 'Tempo: ' + tempoPassado; // Tempo Inicial mostrado.

function radioActive(input) { // Ativa e desativa os 'Radios', envia os dados necessários para saber os acertos e erros e passa as questões.
    if (questaoAtual == 0) { // Inicia o timer quando a primeira questão é iniciada.
        timeLimit();
    }
    resultElement.innerHTML = ''
    if (input.id === 'butNext') { // Se o botão for clicado, a função irá para a próxima questão.
        for (i = 1; i <= 4; i++) { // Ativa todos os 'Radios'
            document.getElementById('butR' + i).disabled = false;
            document.getElementById('butR' + i).checked = false;
        }
        changeQuest(input);
    } else { // Se a função for chamada por um Radio, ela desativa os outros radios para não haver mais de uma resposta.
        for (i = 1; i <= 4; i++) {
            document.getElementById('butR' + i).disabled = true; // Desabilita todos os radios.
        }
        respsChecked.unshift(input.id) // Coloca o id em uma variável para ser possível saber qual alternativa foi clicada.
        console.log(respsChecked);
        checkCorrect();
    }
}

function changeQuest(input) { // Altera a questão e suas alternativas.
    questaoAtual++;
    document.getElementById('quest').innerHTML = questoes[questaoAtual - 1];
    for (i = 0; i < 4; i++) {
        let idElementStr = 'r' + (i + 1);
        document.getElementById(idElementStr).innerHTML = respostas[questaoAtual - 1][i];
    }
}

function checkCorrect() { // Checa para ver se a alternativa clicada foi correta.
    let checked = respsChecked[0].split('butR');
    checked = checked.pop(); // Tira a parte 'butR' do id da alternativa, sobrando apenas o número da alternativa. 
    if ((checked) == respsCorretas[questaoAtual - 1]) { // Se o número que sobrou for igual ao que está no array de corretas, ele diz que a questão foi acertada.
        console.log('Acertou');
        resultElement.innerHTML = 'Acertou';
        resultElement.style.color = 'green';
        acertos++; // Aumenta a quantidade de acertos para mostrar no fim.
    } else {
        console.log('Errou');
        resultElement.innerHTML = 'Errou';
        resultElement.style.color = 'red';
    }
    console.log(checked, respsCorretas[questaoAtual - 1]);
    checked = []; // Zera o array usado para que ele possa ser reutilizado sem guardar as informações para sempre.
    console.log(questaoAtual);
    endGame();
}

function endGame() { // Função disabilita os botões pela quantidade de questões passadas ou pelo tempo.
    if (questaoAtual == questoes.length || tempoPassado == 0) { // Se uma das condições for verdadeira ele para o jogo.
        alert('Você acertou ' + acertos + ' questões');
        pararTempo = true; // Para o timer no tempo que o jogo for terminado.
        for (i = 1; i <= 4; i++) { // Desabilita os radios.
            document.getElementById('butR' + i).disabled = true;
            document.getElementById('butR' + i).checked = false;
        }
        buttonElement.disabled = true; // Desabilita o botão.
    }
}

function resetQuests() { // Recarrega a página para reiniciar o jogo.
    location.reload();
}

function timeLimit() { // Passa o tempo para que haja um limite.
    var idTimer = setInterval(function () {
        tempoPassado--;
        document.getElementById('tempoText').innerHTML = 'Tempo: ' + tempoPassado;
        if (tempoPassado === 0) // Se o tempo restante for 0 ele parará o timer.
        {
            pararTempo = true;
        }
        if (pararTempo === true) { // Se o timer acabar ou o endGame() trocar a var pararTempo para true, o timer irá parar.
            clearInterval(idTimer);
        }
    }, 1000)
}
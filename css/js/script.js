// ===== NAVEGAÇÃO POR ABAS =====
const buttons = document.querySelectorAll('.nav-tabs button');
const contents = document.querySelectorAll('.tab-content');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        contents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const target = document.getElementById(btn.dataset.tab);
        if (target) target.classList.add('active');
    });
});

// ===== QUIZ =====
const perguntas = [
    {
        pergunta: "Qual neurotransmissor está diretamente relacionado ao controle dos movimentos e é reduzido na Doença de Parkinson?",
        opcoes: ["Serotonina", "Dopamina", "Noradrenalina", "GABA"],
        correta: 1
    },
    {
        pergunta: "Como age a L-DOPA no tratamento da Doença de Parkinson?",
        opcoes: [
            "Ela é um neurotransmissor sintético que imita a serotonina.",
            "Ela é convertida pelo cérebro em dopamina.",
            "Ela bloqueia os receptores de dopamina.",
            "Ela destrói o excesso de noradrenalina."
        ],
        correta: 1
    },
    {
        pergunta: "Qual a função principal da serotonina no cérebro?",
        opcoes: [
            "Controlar o sono e o humor.",
            "Acelerar os batimentos cardíacos.",
            "Aumentar a força muscular.",
            "Regular a temperatura do corpo."
        ],
        correta: 0
    }
];

let perguntaAtual = 0;

function carregarPergunta() {
    const p = perguntas[perguntaAtual];
    document.getElementById('pergunta').textContent = p.pergunta;
    const container = document.getElementById('opcoes');
    container.innerHTML = '';
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'none';
    feedback.className = 'feedback';

    p.opcoes.forEach((texto, index) => {
        const btn = document.createElement('button');
        btn.textContent = texto;
        btn.dataset.index = index;
        btn.addEventListener('click', () => verificarResposta(index));
        container.appendChild(btn);
    });
}

function verificarResposta(index) {
    const p = perguntas[perguntaAtual];
    const botoes = document.querySelectorAll('#opcoes button');
    const feedback = document.getElementById('feedback');

    botoes.forEach(b => b.classList.remove('correto', 'errado'));

    const correto = p.correta === index;
    if (correto) {
        botoes[index].classList.add('correto');
        feedback.textContent = '✅ Correto! Muito bem!';
        feedback.className = 'feedback certo';
    } else {
        botoes[index].classList.add('errado');
        botoes[p.correta].classList.add('correto');
        feedback.textContent = `❌ Não foi dessa vez. A resposta correta era: "${p.opcoes[p.correta]}".`;
        feedback.className = 'feedback erro';
    }
    feedback.style.display = 'block';

    setTimeout(() => {
        perguntaAtual = (perguntaAtual + 1) % perguntas.length;
        carregarPergunta();
    }, 3000);
}

carregarPergunta();

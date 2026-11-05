function openMenu() {
  const menu = document.getElementById("menu_aba");
  if(menu) menu.style.display = "block"; 
}

function closeMenu() {
  const menu = document.getElementById("menu_aba");
  if(menu) menu.style.display = "none";    
}

function temaLim() {
  document.documentElement.style.setProperty('--cor-click', '#38184C');
  document.documentElement.style.setProperty('--cor-sombra', '#9b0a59');
  document.documentElement.style.setProperty('--cor-text', 'black');
  document.documentElement.style.setProperty('--cor-back1', '#CEF09D');
  document.documentElement.style.setProperty('--cor-back2', '#4f6a93');
  document.documentElement.style.setProperty('--md-sys-color-primary', '#38184C');
}

function temaInatel() {
  document.documentElement.style.setProperty('--cor-click', '#126ae2');
  document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
  document.documentElement.style.setProperty('--cor-text', 'black');
  document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
  document.documentElement.style.setProperty('--cor-back2', '#6a937a');
  document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');
}

function temaDark() {
  const cores = {
    '--cor-click': '#CEF09D',
    '--cor-sombra': '#9b0a59',
    '--cor-text': 'black',
    '--cor-back1': '#38184C',
    '--cor-back2': '#4f6a93',
    '--md-sys-color-primary': '#CEF09D'
  };

  for (const [variavel, valor] of Object.entries(cores)) {
    document.documentElement.style.setProperty(variavel, valor);
  }
}

const eventos = [
  { id: 1, title: 'Semana do Software 2025', date: '12/05', time: '10:00', location: 'Salão de Eventos', type: 'tech', description: 'Uma semana inteira dedicada à tecnologia e inovação.', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400' },
  { id: 2, title: 'Workshop de IoT', date: '12/01', time: '08:00', location: 'Laboratório CS&I', type: 'tech', description: 'Workshop prático sobre Internet das Coisas e indústria 4.0.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400' }
];

const carousel = document.querySelector('.carousel');

function createCards() {
  if (!carousel) return;
  eventos.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="info">
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
      </div>
    `;
    carousel.appendChild(card);
  });
}

let index = 0;
function nextCard() {
  if (!carousel) return;
  index = (index + 1) % eventos.length;
  updateCarousel();
}

function prevCard() {
  if (!carousel) return;
  index = (index - 1 + eventos.length) % eventos.length;
  updateCarousel();
}

function updateCarousel() {
  if (carousel) carousel.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById('nextBtn')?.addEventListener('click', nextCard);
document.getElementById('prevBtn')?.addEventListener('click', prevCard);

if (carousel) {
  setInterval(nextCard, 5000);
  let startX;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  carousel.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextCard();
    if (endX - startX > 50) prevCard();
  });
}

createCards();

// =====================================================================
// NOVO: Dados das contas (alunos) e das matérias do período
// Para trocar de conta: menu > "Trocar de conta" (ou ícone de perfil)
// =====================================================================
const gradeBase = [
  { id: 1, disciplina: 'Paradigmas', data: 'ter', horario: '07:30', local: 'P1-S12', prova: '30/11/2026', prova_alert: true },
  { id: 2, disciplina: 'Operação homem máquina', data: 'ter', horario: '10:00', local: 'P1-S17', prova: '25/11/2026', prova_alert: true },
  { id: 3, disciplina: 'Cálculo III', data: 'ter', horario: '13:30', local: 'P2-S05', prova: '03/12/2026', prova_alert: true },
  { id: 4, disciplina: 'Física III', data: 'qua', horario: '07:30', local: 'P3-S01', prova: '18/11/2026', prova_alert: true },
  { id: 5, disciplina: 'Gestão de Projetos', data: 'qua', horario: '10:00', local: 'P1-S08', prova: '25/11/2026', prova_alert: false },
  { id: 6, disciplina: 'Digital II', data: 'qui', horario: '08:00', local: 'Lab. 04', prova: '23/11/2026', prova_alert: true }
];

// Junta a grade (igual para a turma) com faltas, nota e prova de cada aluno (mesma ordem da grade)
function montarAulas(desempenho) {
  return gradeBase.map((aula, i) => ({ ...aula, ...desempenho[i] }));
}

function gerarParcelas(total, quitadas, emAtraso, valor, inicio) {
  return Array.from({ length: total }, (_, i) => {
    const numero = i + 1;
    let situacao = 'EM_ABERTO';
    if (numero <= quitadas) situacao = 'PAGA';
    else if (numero <= quitadas + emAtraso) situacao = 'EM_ATRASO';
    return {
      numero,
      valor,
      vencimento: new Date(inicio.getFullYear(), inicio.getMonth() + i, 1),
      situacao
    };
  });
}

const contas = [
  {
    matricula: '780',
    senha: '1234',
    nome: 'Lara',
    curso: 'Engenharia de Software',
    avisos: ['Você possui um armário reservado com entrega para hoje...'],
    aulas: montarAulas([
      { frequencia: '4 de 25', nota: '9' },
      { frequencia: '10 de 25', nota: '10' },
      { frequencia: '8 de 25', nota: '6' },
      { frequencia: '12 de 25', nota: '5' },
      { frequencia: '2 de 25', nota: '8' },
      { frequencia: '6 de 25', nota: '7' }
    ]),
    financiamento: {
      contrato: { modalidade: 'FIES', valorFinanciado: 150000, coparticipacaoMensal: 510, totalParcelas: 60 },
      aditamento: { semestre: '2026/2', prazo: new Date(2026, 10, 10), status: 'Em dia' },
      pagamento: { chavePix: 'chave-pix-lara-exemplo', codigoBarras: '23793.38128 60000.000003 00000.000400 1 00000000000000' },
      parcelas: gerarParcelas(60, 12, 1, 510, new Date(2025, 10, 1))
    }
  },
  {
    matricula: '2024002',
    senha: '1234',
    nome: 'Pedro',
    curso: 'Engenharia de Software',
    avisos: [],
    aulas: montarAulas([
      { frequencia: '1 de 25', nota: '8' },
      { frequencia: '3 de 25', nota: '9' },
      { frequencia: '5 de 25', nota: '7' },
      { frequencia: '2 de 25', nota: '8' },
      { frequencia: '0 de 25', nota: '10' },
      { frequencia: '9 de 25', nota: '4' }
    ]),
    financiamento: null
  }
];

// Componente Aulas
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
    this.aulas = []; // preenchido pela conta que entrou (veja entrar())
    this.hoje = "ter"; 
  }

  connectedCallback() {
    this.render(); 
  }

  render() {
    const dia = this.getAttribute('dia') || this.hoje; // dia="todas" mostra a semana toda
    const todas = dia === 'todas';
    const nomesDias = { seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta' };
    const aulasDia = todas ? this.aulas : this.aulas.filter(a => a.data === dia); 
    this.shadowRoot.innerHTML = `
      <style>
        .comp-aula {
          position: relative;
          background-color: white;
          padding: 15px;
          margin: 20px 0;
          border-radius: 10px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }
        .titulo_aula {
          font-family: "Arimo", sans-serif;
          font-weight: bold;
          font-size: 15px;
          color: #333333;
          padding: 0 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p {
          font-family: "Arimo", sans-serif;
          font-size: 11px;
          color: #555555;
          line-height: 1.5;
          padding: 0 5px;
        }
        .lables { display: flex; gap: 8px; margin-top: 8px; }
        .lable-prova { background-color: #126ae2; padding: 7px 15px; margin-bottom: 10px; border-radius: 500px; text-align: center; display: inline-block; }
        .lable-frequencia { background-color: #126ae2; padding: 7px 15px; border-radius: 500px; }
        .lable-nota { background-color: #126ae2; padding: 7px 15px; border-radius: 500px; }
        .lable-nota-vermelho { background-color: #d32f2f; padding: 7px 15px; border-radius: 500px; }
        .lable-nota-laranja { background-color: #fbc02d; padding: 7px 15px; border-radius: 500px; }
        .lable-nota-verde { background-color: #388e3c; padding: 7px 15px; border-radius: 500px; }
        .p_lable { font-family: "Arimo", sans-serif; font-size: 11px; color: white; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .lable-nota-laranja.p_lable { color: #000000; }
      </style>
      <div>
        ${aulasDia.length ? '' : '<p>Sem aulas hoje.</p>'}
        ${aulasDia.map(a => {
          let provaDisplay = a.prova_alert ? '' : 'display: none;';

          let notaNum = parseFloat(a.nota);
          let classeDaNota = 'lable-nota'; 

          if (notaNum < 6) {
              classeDaNota = 'lable-nota-vermelho';
          } else if (notaNum >= 6 && notaNum < 8) {
              classeDaNota = 'lable-nota-laranja';
          } else if (notaNum >= 8) {
              classeDaNota = 'lable-nota-verde';
          }

          return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${todas ? nomesDias[a.data] + ' - ' : ''}${a.local} -${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="${classeDaNota} p_lable">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
}
customElements.define('aulas-component', AulasComponent);


// =====================================================================
// NOVO: Componente Financeiro (FIES) - App Inatel
// Telas (wireframe / HTA):
//   financeiro (1.2) -> resumo (2.1) -> parcelas (2.2)
//   -> pagamento (3.A) / extrato (3.B)      + aditamento (menu)
// O login (1.1) é feito antes, pelo app. A navegação entre
// "Início / Notas / Aditamento / Financeiro" fica no menu (irPara).
// =====================================================================
class FinanceiroComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tela = 'financeiro'; // financeiro | resumo | parcelas | pagamento | extrato | aditamento
    this.parcelaSelecionada = null;
    this.mensagem = '';

    
    this.possuiFinanciamento = false;
    this.contrato = null;
    this.aditamento = null;
    this.pagamento = null;
    this.parcelas = [];
  }

  carregar(dados) {
  this.possuiFinanciamento = !!dados;

  if (dados) {
    this.contrato = dados.contrato;
    this.aditamento = dados.aditamento;
    this.pagamento = dados.pagamento;
    this.parcelas = dados.parcelas;
  } else {
    this.contrato = null;
    this.aditamento = null;
    this.pagamento = null;
    this.parcelas = [];
  }

  this.tela = 'financeiro';
  this.parcelaSelecionada = null;
  this.mensagem = '';

  this.render();
}

  connectedCallback() {
    // Um único listener (delegação): continua funcionando quando o innerHTML é refeito
    this.shadowRoot.addEventListener('click', (e) => {
      const el = e.target.closest('[data-acao]');
      if (el) this.executar(el.dataset.acao, el.dataset.valor);
    });
    this.render();
  }

  // Chamado pelo menu para abrir uma tela específica
  abrir(tela) {
    this.tela = tela;
    this.mensagem = '';
    this.render();
  }

  // ---------- Regras (métodos do diagrama de classes) ----------
  parcelasQuitadas() {
    return this.parcelas.filter(p => p.situacao === 'PAGA').length;
  }

  temAtraso() {
    return this.parcelas.some(p => p.situacao === 'EM_ATRASO');
  }

  diasParaPrazo() {
    return Math.ceil((this.aditamento.prazo - new Date()) / 86400000);
  }

  // Aditamento.verificarPendencia(): simula o alerta push
 verificarPendencia() {
  if (!this.possuiFinanciamento || !this.aditamento) {
    return false;
  }

  const dias = this.diasParaPrazo();
  return dias >= 0 && dias <= 7;
}
  moeda(v) {
    return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  data(d) {
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  }

  // Pagamento.copiarCodigo()
  async copiarCodigo(texto) {
    try {
      await navigator.clipboard.writeText(texto);
      this.mensagem = 'Copiado!';
    } catch {
      this.mensagem = 'Não foi possível copiar';
    }
    this.render();
  }

  // Extrato.baixarPDF() - versão simples em .txt (troque por PDF real depois)
  baixarPDF() {
    const linhas = this.parcelas
      .map(p => `#${p.numero} | ${this.moeda(p.valor)} | ${p.situacao}`)
      .join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([linhas], { type: 'text/plain' }));
    a.download = 'extrato-fies.txt';
    a.click();
    URL.revokeObjectURL(a.href);
    this.mensagem = 'Arquivo baixado';
    this.render();
  }

  // Extrato.compartilhar()
  async compartilhar() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Extrato FIES',
          text: `${this.parcelasQuitadas()} de ${this.contrato.totalParcelas} parcelas quitadas`
        });
      } catch { /* usuário cancelou */ }
    } else {
      this.mensagem = 'Compartilhamento indisponível neste navegador';
      this.render();
    }
  }

  // ---------- Navegação interna ----------
  executar(acao, valor) {
    switch (acao) {
      case 'ir':
        this.tela = valor;
        break;
      case 'home':
        irPara('home');
        return;
      case 'pagar':
        this.parcelaSelecionada = Number(valor);
        this.tela = 'pagamento';
        break;
      case 'copiar':
        this.copiarCodigo(valor === 'pix' ? this.pagamento.chavePix : this.pagamento.codigoBarras);
        return;
      case 'baixar':
        this.baixarPDF();
        return;
      case 'compartilhar':
        this.compartilhar();
        return;
    }
    this.mensagem = '';
    this.render();
  }

  // ---------- Telas ----------
  telaFinanceiro() {

  // ALUNO SEM FINANCIAMENTO
  if (!this.possuiFinanciamento) {
    return `
      <h2>Financeiro</h2>

      <div class="card">
        <span class="material-symbols-outlined">
          account_balance
        </span>

        <h3>Você não possui financiamento ativo</h3>

        <p>
          Atualmente, não existe nenhum contrato de
          financiamento vinculado à sua matrícula.
        </p>

        <button data-acao="ir" data-valor="informacoes">
          Conheça o FIES
        </button>
      </div>

      <div class="card">
        <h3>Informações financeiras</h3>
        <p>
          Nesta área você poderá consultar informações
          sobre financiamentos estudantis, pagamentos
          e orientações financeiras.
        </p>
      </div>
    `;
  }

  // ALUNO COM FINANCIAMENTO
  return `
    <h2>Financeiro</h2>

    <div class="card">
      <b>Boletos</b>
      <p>Consulte suas informações de pagamento.</p>
    </div>

    <div class="card">
      <b>Financiamentos</b>

      <p>Contrato ativo</p>

      <button data-acao="ir" data-valor="resumo">
        ${this.contrato.modalidade} - Consultar contrato
      </button>
    </div>

    <div class="card">
      <b>Aditamento</b>

      <h3>${this.aditamento.status}</h3>

      <p>
        Semestre: ${this.aditamento.semestre}
      </p>

      <p>
        Prazo: ${this.data(this.aditamento.prazo)}
      </p>

      <button data-acao="ir" data-valor="aditamento">
        Consultar aditamento
      </button>
    </div>
  `;
}

  telaAditamento() {
    const dias = this.diasParaPrazo();
    const banner = this.verificarPendencia()
      ? `<div class="banner">Aditamento vence em ${dias} dias. Renove até ${this.data(this.aditamento.prazo)}.</div>`
      : '';
    return `
      <h2>Aditamento</h2>
      ${banner}
      <div class="card">
        <small>Semestre</small>
        <h3>${this.aditamento.semestre}</h3>
      </div>
      <div class="card">
        <small>Status</small>
        <h3>${this.aditamento.status}</h3>
        <p>Prazo: ${this.data(this.aditamento.prazo)}</p>
      </div>
      <button data-acao="ir" data-valor="resumo">Ver financiamento</button>`;
  }

  telaInformacoes() {
  return `
    <button class="voltar" data-acao="ir" data-valor="financeiro">
      ← Voltar
    </button>

    <h2>Conheça o FIES</h2>

    <div class="card">
      <h3>O que é o FIES?</h3>

      <p>
        O Fundo de Financiamento Estudantil (FIES)
        é um programa do Governo Federal que oferece
        financiamento para estudantes cursarem o
        ensino superior em instituições privadas
        participantes.
      </p>
    </div>

    <div class="card">
      <h3>Como funciona?</h3>

      <p>
        O programa possibilita financiar parte dos
        encargos educacionais, conforme as regras
        e condições estabelecidas para cada modalidade.
      </p>
    </div>

    <div class="card">
      <h3>Como buscar um financiamento?</h3>

      <p>
        1. Consulte os editais e requisitos do programa.
      </p>

      <p>
        2. Verifique se sua instituição e curso
        participam do FIES.
      </p>

      <p>
        3. Acompanhe os períodos de inscrição
        e os procedimentos oficiais.
      </p>
    </div>

    <div class="card">
      <h3>Precisa de ajuda?</h3>

      <p>
        Procure o setor financeiro da instituição
        para receber orientações sobre as opções
        de financiamento estudantil.
      </p>
    </div>
  `;
 }
  telaResumo() {
    const c = this.contrato;
    return `
      <button class="voltar" data-acao="ir" data-valor="financeiro">← Voltar</button>
      <h2>Resumo ${c.modalidade}</h2>
      <div class="card">
        <small>Valor financiado</small>
        <h3>${this.moeda(c.valorFinanciado)}</h3>
        <p>Pago pelo FIES</p>
      </div>
      <div class="card">
        <small>Coparticipação</small>
        <h3>${this.moeda(c.coparticipacaoMensal)}/mês</h3>
        <p>Pago por você</p>
      </div>
      <div class="card">
        <small>Aditamento</small>
        <h3>${this.aditamento.status}</h3>
        <p>Prazo: ${this.data(this.aditamento.prazo)}</p>
      </div>
      <button data-acao="ir" data-valor="parcelas">Ver parcelas</button>`;
  }

  telaParcelas() {
    const quitadas = this.parcelasQuitadas();
    const total = this.contrato.totalParcelas;
    const classe = { PAGA: 'verde', EM_ABERTO: 'laranja', EM_ATRASO: 'vermelho' };
    const texto = { PAGA: 'Paga', EM_ABERTO: 'Em aberto', EM_ATRASO: '! Em atraso' };

    const itens = this.parcelas.map(p => `
      <div class="parcela">
        <span>#${p.numero} - ${this.data(p.vencimento)}</span>
        <span class="selo ${classe[p.situacao]}">${texto[p.situacao]}</span>
        ${p.situacao !== 'PAGA'
          ? `<button data-acao="pagar" data-valor="${p.numero}">Pagar parcela</button>`
          : ''}
      </div>`).join('');

    return `
      <button class="voltar" data-acao="ir" data-valor="resumo">← Voltar</button>
      <h2>Parcelas</h2>
      <p>${quitadas} de ${total} quitadas</p>
      <div class="barra"><div style="width:${(quitadas / total) * 100}%"></div></div>
      <div class="lista">${itens}</div>
      <button data-acao="ir" data-valor="extrato">Extrato PDF</button>`;
  }

  telaPagamento() {
    return `
      <button class="voltar" data-acao="ir" data-valor="parcelas">← Voltar</button>
      <h2>Pagar parcela</h2>
      <p>Parcela #${this.parcelaSelecionada}</p>
      <div class="qr">QR PIX</div>
      <button data-acao="copiar" data-valor="pix">Copiar PIX</button>
      <button class="sec" data-acao="copiar" data-valor="codigo">Copiar código</button>
      ${this.mensagem ? `<p class="msg">${this.mensagem}</p>` : ''}`;
  }

  telaExtrato() {
    return `
      <button class="voltar" data-acao="ir" data-valor="parcelas">← Voltar</button>
      <h2>Extrato</h2>
      <button data-acao="baixar">Baixar PDF</button>
      <button class="sec" data-acao="compartilhar">Compartilhar</button>
      ${this.mensagem ? `<p class="msg">${this.mensagem}</p>` : ''}`;
  }

  estilos() {
    return `<style>
      :host { display: block; font-family: "Arimo", sans-serif; }
      h2 { color: #333; font-size: 18px; margin: 12px 0 4px; }
      p { font-size: 12px; color: #555; }
      .card { background: white; padding: 15px; margin: 12px 0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,.1); }
      .card p, .card small { font-size: 12px; color: #555; margin: 4px 0; }
      .card h3 { margin: 4px 0; color: #333; }
      button { background: var(--cor-click, #126ae2); color: white; border: 0; border-radius: 500px; padding: 10px 15px; margin: 6px 0; cursor: pointer; font-size: 13px; font-family: inherit; }
      button.sec { background: #e3e8ee; color: #333; }
      button.voltar { background: none; color: var(--cor-click, #126ae2); padding: 8px 0 0; }
      button:focus-visible { outline: 2px solid #333; outline-offset: 2px; }
      .banner { background: #fbc02d; color: #000; padding: 10px; border-radius: 8px; font-size: 13px; margin: 8px 0; }
      .barra { background: #ddd; border-radius: 500px; height: 10px; overflow: hidden; }
      .barra div { background: #388e3c; height: 100%; }
      .lista { max-height: 260px; overflow-y: auto; margin: 10px 0; background: white; border-radius: 10px; }
      .parcela { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 8px; border-bottom: 1px solid #eee; font-size: 12px; color: #333; }
      .parcela button { padding: 5px 10px; font-size: 11px; margin: 0; }
      .selo { padding: 4px 10px; border-radius: 500px; color: white; font-size: 11px; white-space: nowrap; }
      .selo.verde { background: #388e3c; }
      .selo.laranja { background: #fbc02d; color: #000; }
      .selo.vermelho { background: #d32f2f; }
      .qr { width: 140px; height: 140px; margin: 10px auto; border: 2px dashed #999; display: flex; align-items: center; justify-content: center; color: #555; }
      .msg { color: #388e3c; font-weight: bold; text-align: center; font-size: 13px; }
    </style>`;
  }

  render() {
   const telas = {
  financeiro: () => this.telaFinanceiro(),
  aditamento: () => this.telaAditamento(),
  informacoes: () => this.telaInformacoes(),
  resumo: () => this.telaResumo(),
  parcelas: () => this.telaParcelas(),
  pagamento: () => this.telaPagamento(),
  extrato: () => this.telaExtrato()
};
    this.shadowRoot.innerHTML = this.estilos() + `<div>${telas[this.tela]()}</div>`;
  }
}
customElements.define('financeiro-component', FinanceiroComponent);


// =====================================================================
// NOVO: Navegação do app (menu do canto superior esquerdo)
// =====================================================================

// Troca a tela exibida. view = home | notas | horarios | aditamento | financeiro | biblioteca
function irPara(view) {
  // aditamento e financeiro usam o mesmo componente
  const secao = (view === 'aditamento') ? 'financeiro' : view;

  document.querySelectorAll('.view').forEach(v => v.classList.remove('ativa'));
  document.getElementById('view-' + secao)?.classList.add('ativa');

  document.querySelectorAll('.menu-item').forEach(btn => {
    btn.classList.toggle('ativo', btn.dataset.view === view);
  });

  const fin = document.getElementById('financeiro');
  if (view === 'financeiro') fin?.abrir('financeiro');
  if (view === 'aditamento') fin?.abrir('aditamento');
  if (view === 'home') atualizarAvisos();
  if (view === 'notas') renderNotas();
  if (view === 'perfil') renderPerfil();

  closeMenu();
  window.scrollTo(0, 0);
}

// Avisos do cartão de boas-vindas (aditamento e financeiro vêm do componente)
function atualizarAvisos() {
  const lista = document.getElementById('avisos');
  const fin = document.getElementById('financeiro');
  if (!lista || !fin || !contaAtual) return;

  const avisos = contaAtual.avisos.map(t => ({ icone: 'notifications_active', texto: t, destino: null }));

  if (fin.verificarPendencia()) {
    avisos.push({
      icone: 'event_repeat',
      texto: `Aditamento vence em ${fin.diasParaPrazo()} dias. Renove até ${fin.data(fin.aditamento.prazo)}.`,
      destino: 'aditamento'
    });
  }

  if (fin.temAtraso()) {
    avisos.push({ icone: 'mail', texto: 'Você possui uma pendência no financeiro...', destino: 'financeiro' });
  }

  if (!avisos.length) {
    lista.innerHTML = '<li>Sem novos avisos.</li>';
    return;
  }

  lista.innerHTML = avisos.map(a => `
    <li ${a.destino ? `class="clicavel" role="button" tabindex="0" onclick="irPara('${a.destino}')"` : ''}>
      <span class="material-symbols-outlined">${a.icone}</span>
      <span>${a.texto}</span>
    </li>`).join('');
}

// Tela de Notas: matérias da conta que está logada
function renderNotas() {
  const destino = document.getElementById('lista-notas');
  if (!destino || !contaAtual) return;

  destino.innerHTML = contaAtual.aulas.map(a => {
    const n = parseFloat(a.nota);
    const cor = n < 6 ? 'nota-vermelho' : n < 8 ? 'nota-laranja' : 'nota-verde';
    return `
      <div class="cartao">
        <div class="titulo_aula">${a.disciplina}</div>
        <div class="lables">
          <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
          <div class="lable-nota ${cor} p_lable">CR: <b>${a.nota}</b></div>
        </div>
      </div>`;
  }).join('');
}

function renderPerfil() {
  if (!contaAtual) return;
  document.getElementById('perfil-nome').textContent = contaAtual.nome;
  document.getElementById('perfil-dados').textContent =
    `Matrícula ${contaAtual.matricula} - ${contaAtual.curso}`;
}

// ---------- Contas: entrar e trocar de conta ----------
let contaAtual = null;
let ultimaConta = null; // usada pela biometria

// Coloca os dados da conta em todas as telas e abre o início
function entrar(conta) {
  contaAtual = conta;
  ultimaConta = conta;

  document.querySelectorAll('aulas-component').forEach(c => {
    c.aulas = conta.aulas;
    c.render();
  });
  document.getElementById('financeiro')?.carregar(conta.financiamento);
  document.getElementById('saudacao').textContent = `Olá, ${conta.nome}!`;

  document.getElementById('login').classList.remove('ativa');
  irPara('home');
}

function fazerLogin(e) {
  if (e) e.preventDefault();
  const matricula = document.getElementById('login-matricula').value.trim();
  const senha = document.getElementById('login-senha').value;
  const erro = document.getElementById('login-erro');

  const conta = contas.find(c => c.matricula === matricula && c.senha === senha);
  if (!conta) {
    erro.textContent = 'Matrícula ou senha incorreta. Confira os dados e tente de novo.';
    return;
  }
  erro.textContent = '';
  entrar(conta);
}

// Simula a biometria: entra na última conta usada neste aparelho
function entrarComBiometria() {
  entrar(ultimaConta || contas[0]);
}

// Atalho das contas de demonstração: preenche a matrícula e a senha
function preencherLogin(matricula) {
  const conta = contas.find(c => c.matricula === matricula);
  if (!conta) return;
  document.getElementById('login-matricula').value = conta.matricula;
  document.getElementById('login-senha').value = conta.senha;
  document.getElementById('login-erro').textContent = '';
}

// Sai da conta atual e volta para o login, para outro aluno entrar
function sair() {
  contaAtual = null;
  closeMenu();
  document.getElementById('login-matricula').value = '';
  document.getElementById('login-senha').value = '';
  document.getElementById('login-erro').textContent = '';
  document.getElementById('login').classList.add('ativa');
  window.scrollTo(0, 0);
  document.getElementById('login-matricula').focus();
}

// Esc fecha o menu; Enter/Espaço ativam os avisos clicáveis
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
  // Enter nos campos do login (sem <form>, que alguns ambientes bloqueiam)
  if (e.key === 'Enter' && e.target.matches('#login input')) fazerLogin();
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('#avisos li.clicavel')) {
    e.preventDefault();
    e.target.click();
  }
});
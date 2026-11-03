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

// Componente Aulas
class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); 
    this.aulas = [
      { id: 1, disciplina: 'S05 - Interface Homem-máquina', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: false, prova: '12/05', frequencia: '10/25', nota: '10' },
      { id: 2, disciplina: 'E01 - Circuitos Elétricos em Corrente Contínua', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '5' },
      { id: 3, disciplina: 'M02 - Álgebra e Geometria Analítica', data: 'ter', horario: '10:00', local: 'P1-S17', prova_alert: true, prova: '12/05', frequencia: '10/25', nota: '7' }
    ];
    this.hoje = "ter"; 
  }

  connectedCallback() {
    this.render(); 
  }

  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje); 
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
              <p class="p">Local e Horário: <b>${a.local} -${a.horario}</b></p>
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
// Cada tela corresponde a um quadro do wireframe e a uma etapa da HTA:
//   login (1.1) -> home -> financeiro (1.2) -> resumo (2.1)
//   -> parcelas (2.2) -> pagamento (3.A) / extrato (3.B)
// =====================================================================
class FinanceiroComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.tela = 'login'; // login | home | financeiro | resumo | parcelas | pagamento | extrato
    this.parcelaSelecionada = null;
    this.mensagem = '';

    // Classes do diagrama de classes viram objetos JS
    this.aluno = { nome: 'Lara', curso: 'Engenharia de Software' };

    this.contrato = {
      modalidade: 'FIES',
      valorFinanciado: 48000,
      coparticipacaoMensal: 350,
      totalParcelas: 48
    };

    this.aditamento = {
      semestre: '2026/2',
      prazo: new Date(2026, 10, 10), // 10/11/2026
      status: 'Em dia'
    };

    this.pagamento = {
      chavePix: 'chave-pix-de-exemplo',
      codigoBarras: '23793.38128 60000.000003 00000.000400 1 00000000000000'
    };

    // 48 parcelas: 1-12 pagas, 13 em atraso, o restante em aberto
    this.parcelas = Array.from({ length: 48 }, (_, i) => {
      const numero = i + 1;
      let situacao = 'EM_ABERTO';
      if (numero <= 12) situacao = 'PAGA';
      else if (numero === 13) situacao = 'EM_ATRASO';
      return {
        numero,
        valor: 350,
        vencimento: new Date(2025, 9 + numero, 1),
        situacao
      };
    });
  }

  connectedCallback() {
    // Um único listener (delegação): continua funcionando quando o innerHTML é refeito
    this.shadowRoot.addEventListener('click', (e) => {
      const el = e.target.closest('[data-acao]');
      if (el) this.executar(el.dataset.acao, el.dataset.valor);
    });
    this.render();
  }

  // ---------- Regras (métodos do diagrama de classes) ----------
  parcelasQuitadas() {
    return this.parcelas.filter(p => p.situacao === 'PAGA').length;
  }

  diasParaPrazo() {
    return Math.ceil((this.aditamento.prazo - new Date()) / 86400000);
  }

  // Aditamento.verificarPendencia(): simula o alerta push
  verificarPendencia() {
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

  // ---------- Navegação ----------
  executar(acao, valor) {
    switch (acao) {
      case 'ir':
        this.tela = valor;
        break;
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
  telaLogin() {
    return `
      <h2>App Inatel</h2>
      <input placeholder="Matrícula">
      <input type="password" placeholder="Senha">
      <button data-acao="ir" data-valor="home">Entrar</button>
      <button class="sec" data-acao="ir" data-valor="home">Usar biometria</button>`;
  }

  telaHome() {
    const banner = this.verificarPendencia()
      ? `<div class="banner">Aditamento vence em ${this.diasParaPrazo()} dias. Renove até ${this.data(this.aditamento.prazo)}.</div>`
      : '';
    return `
      <h2>Olá, ${this.aluno.nome}</h2>
      ${banner}
      <div class="card atalho" data-acao="ir" data-valor="resumo">
        <b>Aditamento</b>
        <p>Prazo: ${this.data(this.aditamento.prazo)}</p>
      </div>
      <div class="grid">
        <button class="sec">Notas</button>
        <button class="sec">Horários</button>
        <button data-acao="ir" data-valor="financeiro">Financeiro</button>
        <button class="sec">Biblioteca</button>
      </div>`;
  }

  telaFinanceiro() {
    return `
      <button class="voltar" data-acao="ir" data-valor="home">← Voltar</button>
      <h2>Financeiro</h2>
      <div class="card"><b>Boletos</b></div>
      <div class="card">
        <b>Financiamentos</b>
        <p>Contratos</p>
        <button data-acao="ir" data-valor="resumo">${this.contrato.modalidade} - Contrato ativo</button>
      </div>`;
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
      :host { display: block; max-width: 380px; margin: 0 auto; font-family: "Arimo", sans-serif; }
      h2 { color: #333; }
      .card { background: white; padding: 15px; margin: 12px 0; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,.1); }
      .card p, .card small { font-size: 12px; color: #555; margin: 4px 0; }
      .card h3 { margin: 4px 0; color: #333; }
      .atalho { cursor: pointer; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      button { background: var(--cor-click, #126ae2); color: white; border: 0; border-radius: 500px; padding: 10px 15px; margin: 6px 0; cursor: pointer; font-size: 13px; font-family: inherit; }
      button.sec { background: #e3e8ee; color: #333; }
      button.voltar { background: none; color: var(--cor-click, #126ae2); padding: 0; }
      button:focus-visible, input:focus-visible { outline: 2px solid #333; outline-offset: 2px; }
      input { display: block; width: 100%; box-sizing: border-box; padding: 10px; margin: 8px 0; border: 1px solid #ccc; border-radius: 8px; font-family: inherit; }
      .banner { background: #fbc02d; color: #000; padding: 10px; border-radius: 8px; font-size: 13px; }
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
      .msg { color: #388e3c; font-weight: bold; text-align: center; }
    </style>`;
  }

  render() {
    const telas = {
      login: () => this.telaLogin(),
      home: () => this.telaHome(),
      financeiro: () => this.telaFinanceiro(),
      resumo: () => this.telaResumo(),
      parcelas: () => this.telaParcelas(),
      pagamento: () => this.telaPagamento(),
      extrato: () => this.telaExtrato()
    };
    this.shadowRoot.innerHTML = this.estilos() + `<div>${telas[this.tela]()}</div>`;
  }
}
customElements.define('financeiro-component', FinanceiroComponent);
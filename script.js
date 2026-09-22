/*
 * Games FAD
 *
 * Os jogos são adicionados manualmente no HTML, como no projeto original.
 * Exemplo:
 *
 * <div class="card">
 *     <div class="game"><img src="Games/Novo_Jogo.jpg" alt="Novo Jogo"></div>
 *     <div class="info">
 *         <h2>20- Novo Jogo</h2>
 *         <p><strong>PLATAFORMA:</strong> PS3</p>
 *         <p><strong>NOTA:</strong> 8,5</p>
 *     </div>
 * </div>
 *
 * O JavaScript apenas organiza os cards pela nota e atualiza a numeração.
 * Não existe cadastro, formulário, lista de fotos ou localStorage.
 */

function obterNota(card) {
    const texto = card.querySelector(".info")?.innerText || card.innerText || "";

    // Aceita 8,5 e 8.5
    const match = texto.match(/NOTA\s*:\s*([0-9]+(?:[.,][0-9]+)?)/i);

    if (!match) return -Infinity;

    return Number(match[1].replace(",", "."));
}

function organizarJogos(seletor) {
    const container = document.querySelector(seletor);

    if (!container) return;

    const cards = Array.from(container.querySelectorAll(":scope > .card"));

    // Mantém a ordem original quando duas notas são iguais.
    cards.forEach((card, index) => {
        card.dataset.ordemOriginal = index;
    });

    cards.sort((a, b) => {
        const diferenca = obterNota(b) - obterNota(a);

        if (diferenca !== 0) return diferenca;

        return Number(a.dataset.ordemOriginal) -
               Number(b.dataset.ordemOriginal);
    });

    cards.forEach((card, index) => {
        const titulo = card.querySelector(".info h2");

        if (titulo) {
            // Retira a numeração antiga, caso exista.
            const nome = titulo.textContent.replace(/^\s*\d+\s*[-–—]\s*/, "").trim();

            titulo.textContent = `${index + 1}- ${nome}`;
        }

        container.appendChild(card);
    });
}

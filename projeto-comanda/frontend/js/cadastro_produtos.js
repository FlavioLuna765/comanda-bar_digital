    let itens = [];

    // Define data de hoje no input por padrão
    document.getElementById('data_reg').valueAsDate = new Date();

    function adicionarItem() {
        const desc = document.getElementById('desc').value;
        const valor = parseFloat(document.getElementById('valor').value);
        const data = document.getElementById('data_reg').value;

        if(!desc || !valor) return alert("Preencha os campos corretamente!");

        const novoItem = { id: Date.now(), desc, valor, data };
        itens.push(novoItem);
        atualizarTabela();
        
        // Limpa campos
        document.getElementById('desc').value = '';
        document.getElementById('valor').value = '';
    }

    function excluirItem(id) {
        itens = itens.filter(i => i.id !== id);
        atualizarTabela();
    }

    function atualizarTabela() {
        const tbody = document.getElementById('listaItens');
        tbody.innerHTML = '';
        
        itens.forEach(item => {
            tbody.innerHTML += `
                <tr>
                    <td><span class="text-secondary small">${item.data}</span><br><strong>${item.desc}</strong></td>
                    <td class="text-end var(--accent-gold)">R$ ${item.valor.toFixed(2)}</td>
                    <td class="text-end">
                        <button onclick="excluirItem(${item.id})" class="btn-delete"><i class="bi bi-x-circle"></i></button>
                    </td>
                </tr>
            `;
        });
    }

    function gerarRelatorio(tipo) {
        if(itens.length === 0) return alert("Não há dados para o relatório!");

        const printTitle = document.getElementById('printTitle');
        const printBody = document.getElementById('printBody');
        const printTotal = document.getElementById('printTotal');
        
        printTitle.innerText = "Relatório " + tipo + " - Comanda Luna";
        
        let html = '<table style="width:100%; border-collapse: collapse;">';
        let total = 0;
        
        itens.forEach(i => {
            html += `<tr><td style="padding:8px; border-bottom:1px solid #ddd;">${i.data} - ${i.desc}</td><td style="text-align:right">R$ ${i.valor.toFixed(2)}</td></tr>`;
            total += i.valor;
        });
        
        html += '</table>';
        printBody.innerHTML = html;
        printTotal.innerText = "Total Geral: R$ " + total.toFixed(2);

        window.print();
    }
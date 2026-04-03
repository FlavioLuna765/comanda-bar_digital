    const formatBRL = (v) => v.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

    function atualizarTotais() {
        let subtotal = 0;
        document.querySelectorAll('.menu-card').forEach(card => {
            const preco = parseFloat(card.getAttribute('data-price'));
            const qtd = parseInt(card.querySelector('.quantity-input').value);
            subtotal += preco * qtd;
        });
        const taxa = subtotal * 0.10;
        document.getElementById('subtotal').innerText = formatBRL(subtotal);
        document.getElementById('serviceTax').innerText = formatBRL(taxa);
        document.getElementById('totalAmount').innerText = formatBRL(subtotal + taxa);
    }

    document.querySelectorAll('.plus-btn').forEach(btn => {
        btn.onclick = () => { 
            const input = btn.parentElement.querySelector('.quantity-input');
            input.value = parseInt(input.value) + 1;
            atualizarTotais();
        };
    });

    document.querySelectorAll('.minus-btn').forEach(btn => {
        btn.onclick = () => {
            const input = btn.parentElement.querySelector('.quantity-input');
            if (input.value > 0) { input.value = parseInt(input.value) - 1; atualizarTotais(); }
        };
    });

    document.getElementById('paymentBtn').onclick = () => {
        if (document.getElementById('totalAmount').innerText === "R$ 0,00") return alert("Comanda vazia!");
        paymentModal.show();
    };

    function enviarParaBalcao(metodo) {
        const pedido = {
            id: Date.now(),
            cliente: document.getElementById('clientName').value || "Cliente s/ Nome",
            mesa: document.getElementById('tableNumber').value || "0",
            total: document.getElementById('totalAmount').innerText,
            metodo: metodo,
            hora: new Date().toLocaleTimeString(),
            itens: []
        };

        document.querySelectorAll('.menu-card').forEach(card => {
            const qtd = parseInt(card.querySelector('.quantity-input').value);
            if (qtd > 0) pedido.itens.push({ nome: card.getAttribute('data-name'), qtd: qtd });
        });

        // SALVA NO LOCALSTORAGE PARA O OUTRO ARQUIVO LER
        let historico = JSON.parse(localStorage.getItem('pedidosBalcao') || '[]');
        historico.push(pedido);
        localStorage.setItem('pedidosBalcao', JSON.stringify(historico));

        paymentModal.hide();
        
        // Altera Status do Botão
        const badge = document.getElementById('statusBadge');
        badge.className = "badge bg-danger w-100 p-3 status-badge";
        badge.innerHTML = '<i class="bi bi-clock-history"></i> PEDIDO NO BALCÃO';

        alert("Pedido enviado com sucesso!");
        
        // Reset após 5 segundos para simular nova comanda
        setTimeout(() => {
            document.querySelectorAll('.quantity-input').forEach(i => i.value = 0);
            atualizarTotais();
            badge.className = "badge bg-success w-100 p-3 status-badge";
            badge.innerHTML = '<i class="bi bi-unlock-fill"></i> COMANDA ABERTA';
        }, 5000);
    }
    let totalPedidosAntigo = JSON.parse(localStorage.getItem('pedidosBalcao') || '[]').length;

    function render() {
        const lista = document.getElementById('lista');
        const pedidos = JSON.parse(localStorage.getItem('pedidosBalcao') || '[]');
        
        // Lógica do Som
        if (pedidos.length > totalPedidosAntigo) {
            document.getElementById('bellSound').play().catch(e => console.log("Áudio bloqueado: Interaja com a página primeiro."));
        }
        totalPedidosAntigo = pedidos.length;

        if(pedidos.length === 0) {
            lista.innerHTML = '<h3 class="text-center opacity-25 mt-5">Sem pedidos pendentes</h3>';
            return;
        }

        lista.innerHTML = pedidos.slice().reverse().map(p => `
            <div class="col-md-6 col-lg-4">
                <div class="card order-card shadow">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <span class="h5 text-warning">MESA ${p.mesa}</span>
                            <span class="badge bg-dark">${p.hora}</span>
                        </div>
                        <h6>${p.cliente}</h6>
                        <hr class="border-secondary">
                        <div class="mb-3">
                            ${p.itens.map(i => `<div>• ${i.qtd}x ${i.nome}</div>`).join('')}
                        </div>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fw-bold text-success">${p.total}</span>
                            <button onclick="entregar(${p.id})" class="btn btn-success btn-sm">
                                <i class="bi bi-check2"></i> ENTREGUE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function entregar(id) {
        let db = JSON.parse(localStorage.getItem('pedidosBalcao') || '[]');
        db = db.filter(p => p.id !== id);
        localStorage.setItem('pedidosBalcao', JSON.stringify(db));
        totalPedidosAntigo = db.length; // Atualiza para não tocar som ao remover
        render();
    }

    function limparTudo() {
        if(confirm("Apagar histórico?")) {
            localStorage.clear();
            totalPedidosAntigo = 0;
            render();
        }
    }

    window.addEventListener('storage', render);
    setInterval(render, 2000);
    render();
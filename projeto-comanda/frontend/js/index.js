const actionBtn = document.getElementById('actionBtn');
        actionBtn.addEventListener('click', () => {
            // Adicionei um efeito de carregamento simples antes de redirecionar
            actionBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Carregando...';
            setTimeout(() => {
                // Aqui você coloca o link da sua página de cardápio
                window.location.href = 'cardapio.html'; 
            }, 800);
        });
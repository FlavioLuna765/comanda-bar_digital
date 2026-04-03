        const loginForm = document.getElementById('loginForm');
        const btnLogin = document.getElementById('btnLogin');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Efeito visual de carregamento
            btnLogin.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Autenticando...';
            btnLogin.disabled = true;

            setTimeout(() => {
                // Simulação de lógica de login
                alert('Login realizado com sucesso! Redirecionando...');
                window.location.href = 'index.html'; // Volta para a sua home ou dashboard
            }, 1500);
        });
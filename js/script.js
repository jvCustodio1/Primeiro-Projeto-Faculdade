// ======================================================
//        CÓDIGO FINAL E CORRIGIDO - script.js
// ======================================================

document.addEventListener('DOMContentLoaded', function() {
    // MUITO IMPORTANTE: Coloque seu nome de usuário real do GitHub aqui!
    const username = 'jvCustodio1'; 
    
    const reposContainer = document.getElementById('repositorios-github');

    // Função para buscar os repositórios do GitHub
    async function fetchRepos() {
        // Se não houver nome de usuário, não faz nada.
        if (!username || username === 'jvCustodio1') {
            console.log("Nome de usuário do GitHub não configurado. Exibindo apenas projetos manuais.");
            return;
        }

        try {
            const response = await fetch(`https://api.github.com/users/${jvCustodio1e}/repos?sort=created&direction=desc`);
            if (!response.ok) {
                throw new Error(`Usuário não encontrado ou erro na API: ${response.status}`);
            }
            const repos = await response.json();
            displayRepos(repos);
        } catch (error) {
            // CORREÇÃO FINAL: Se der erro, apenas mostramos no console e não mexemos no HTML.
            // Isso garante que os projetos manuais NUNCA sejam apagados.
            console.error("Falha ao buscar repositórios do GitHub:", error);
        }
    }

    // Função para exibir os repositórios na página
    function displayRepos(repos) {
        if (repos.length === 0) {
            return; // Se não houver repositórios, simplesmente não adiciona nada.
        }

        let html = '';
        // Pega apenas os 6 repositórios mais recentes
        const reposRecentes = repos.slice(0, 6);

        reposRecentes.forEach(repo => {
            html += `
                <div class="projeto-card">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Sem descrição.'}</p>
                    <a href="${repo.html_url}" class="projeto-botao github" target="_blank">Ver no GitHub</a>
                </div>
            `;
        });
        
        // Adiciona o HTML dos novos projetos no final do container, sem apagar o que já existe.
        reposContainer.insertAdjacentHTML('beforeend', html);
    }

    // Chama a função para buscar os repositórios
    fetchRepos();
});
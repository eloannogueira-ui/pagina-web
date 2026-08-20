```javascript
// =====================================================
// BLOG TECH - JAVASCRIPT
// Recursos:
// Favoritos
// Comentários
// Visualizações
// Notificações
// Perfil
// Pesquisa
// Curtidas
// Menu mobile
// Voltar ao topo
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {


        // =================================================
        // ELEMENTOS
        // =================================================

        const artigos =
            document.querySelectorAll("article");

        const campoPesquisa =
            document.querySelector("#campo-pesquisa");

        const contadorPosts =
            document.querySelector("#contador-posts");

        const totalVisualizacoes =
            document.querySelector("#total-visualizacoes");

        const semResultados =
            document.querySelector("#sem-resultados");

        const botaoTopo =
            document.querySelector("#voltar-topo");

        const botaoMenu =
            document.querySelector("#botao-menu");

        const menuPrincipal =
            document.querySelector("#menu-principal");

        const botaoPerfil =
            document.querySelector("#botao-perfil");

        const modalPerfil =
            document.querySelector("#modal-perfil");

        const fecharPerfil =
            document.querySelector("#fechar-perfil");

        const botaoNotificacoes =
            document.querySelector("#botao-notificacoes");

        const painelNotificacoes =
            document.querySelector("#painel-notificacoes");

        const fecharNotificacoes =
            document.querySelector("#fechar-notificacoes");


        // =================================================
        // CONTADOR DE POSTS
        // =================================================

        if (contadorPosts) {

            contadorPosts.textContent =
                artigos.length;
        }


        // =================================================
        // MENU MOBILE
        // =================================================

        if (botaoMenu) {

            botaoMenu.addEventListener(
                "click",
                function () {

                    const aberto =
                        menuPrincipal.classList.toggle(
                            "menu-aberto"
                        );

                    botaoMenu.setAttribute(
                        "aria-expanded",
                        aberto
                    );

                    botaoMenu.textContent =
                        aberto ? "✕" : "☰";

                }
            );

        }


        // =================================================
        // CURTIDAS
        // =================================================

        const botoesCurtida =
            document.querySelectorAll(
                ".botao-curtir"
            );


        botoesCurtida.forEach(
            function (botao) {

                const artigo =
                    botao.closest("article");

                const indice =
                    Array.from(artigos)
                        .indexOf(artigo);

                const tipo =
                    botao.dataset.tipo;

                const chave =
                    `curtida-${indice}-${tipo}`;

                const span =
                    botao.querySelector("span");


                const curtiu =
                    localStorage.getItem(chave)
                    === "true";


                if (curtiu) {

                    botao.classList.add(
                        "curtiu"
                    );

                    span.textContent =
                        Number(
                            span.textContent
                        ) + 1;
                }


                botao.addEventListener(
                    "click",
                    function () {

                        const estaCurtido =
                            botao.classList.contains(
                                "curtiu"
                            );


                        if (!estaCurtido) {

                            span.textContent =
                                Number(
                                    span.textContent
                                ) + 1;

                            botao.classList.add(
                                "curtiu"
                            );

                            localStorage.setItem(
                                chave,
                                "true"
                            );

                        } else {

                            span.textContent =
                                Math.max(
                                    0,
                                    Number(
                                        span.textContent
                                    ) - 1
                                );

                            botao.classList.remove(
                                "curtiu"
                            );

                            localStorage.setItem(
                                chave,
                                "false"
                            );
                        }

                    }
                );

            }
        );


        // =================================================
        // FAVORITOS
        // =================================================

        const botoesFavorito =
            document.querySelectorAll(
                ".botao-favorito"
            );

        const listaFavoritos =
            document.querySelector(
                "#lista-favoritos"
            );


        function carregarFavoritos() {

            const favoritos =
                JSON.parse(
                    localStorage.getItem(
                        "blog-favoritos"
                    ) || "[]"
                );


            botoesFavorito.forEach(
                function (botao, indice) {

                    if (
                        favoritos.includes(indice)
                    ) {

                        botao.classList.add(
                            "favoritado"
                        );

                        botao.textContent =
                            "★ Favoritado";
                    }

                }
            );


            listaFavoritos.innerHTML = "";


            if (favoritos.length === 0) {

                listaFavoritos.innerHTML =
                    "<p>Você ainda não favoritou nenhum artigo.</p>";

                return;
            }


            favoritos.forEach(
                function (indice) {

                    const artigo =
                        artigos[indice];

                    if (!artigo) return;


                    const titulo =
                        artigo.querySelector("h2")
                            .textContent;


                    const item =
                        document.createElement(
                            "div"
                        );

                    item.className =
                        "favorito-item";

                    item.textContent =
                        "⭐ " + titulo;

                    listaFavoritos.appendChild(
                        item
                    );

                }
            );

        }


        botoesFavorito.forEach(
            function (botao, indice) {

                botao.addEventListener(
                    "click",
                    function () {

                        let favoritos =
                            JSON.parse(
                                localStorage.getItem(
                                    "blog-favoritos"
                                ) || "[]"
                            );


                        if (
                            favoritos.includes(indice)
                        ) {

                            favoritos =
                                favoritos.filter(
                                    function (item) {
                                        return item !== indice;
                                    }
                                );

                            botao.classList.remove(
                                "favoritado"
                            );

                            botao.textContent =
                                "☆ Favoritar";


                            adicionarNotificacao(
                                "⭐ Artigo removido dos favoritos."
                            );

                        } else {

                            favoritos.push(
                                indice
                            );

                            botao.classList.add(
                                "favoritado"
                            );

                            botao.textContent =
                                "★ Favoritado";


                            adicionarNotificacao(
                                "⭐ Artigo adicionado aos favoritos!"
                            );

                        }


                        localStorage.setItem(
                            "blog-favoritos",
                            JSON.stringify(
                                favoritos
                            )
                        );


                        carregarFavoritos();

                    }
                );

            }
        );


        carregarFavoritos();


        // =================================================
        // VISUALIZAÇÕES
        // =================================================

        function carregarVisualizacoes() {

            let total = 0;


            artigos.forEach(
                function (artigo, indice) {

                    const chave =
                        `visualizacoes-${indice}`;

                    let visualizacoes =
                        Number(
                            localStorage.getItem(
                                chave
                            ) || 0
                        );


                    // Conta uma visita apenas uma vez
                    // por artigo nesta sessão.

                    const sessao =
                        `visitado-${indice}`;

                    if (
                        !sessionStorage.getItem(
                            sessao
                        )
                    ) {

                        visualizacoes++;

                        localStorage.setItem(
                            chave,
                            visualizacoes
                        );

                        sessionStorage.setItem(
                            sessao,
                            "true"
                        );

                    }


                    const campo =
                        artigo.querySelector(
                            ".visualizacoes"
                        );

                    if (campo) {

                        campo.textContent =
                            visualizacoes;
                    }


                    total +=
                        visualizacoes;

                }
            );


            if (totalVisualizacoes) {

                totalVisualizacoes.textContent =
                    total;
            }

        }


        carregarVisualizacoes();


        // =================================================
        // COMENTÁRIOS
        // =================================================

        function carregarComentarios() {

            artigos.forEach(
                function (artigo, indice) {

                    const chave =
                        `comentarios-${indice}`;

                    const comentarios =
                        JSON.parse(
                            localStorage.getItem(
                                chave
                            ) || "[]"
                        );


                    const lista =
                        artigo.querySelector(
                            ".lista-comentarios"
                        );

                    const contador =
                        artigo.querySelector(
                            ".quantidade-comentarios"
                        );


                    lista.innerHTML = "";


                    comentarios.forEach(
                        function (comentario) {

                            const elemento =
                                document.createElement(
                                    "div"
                                );

                            elemento.className =
                                "comentario";

                            elemento.textContent =
                                "💬 " + comentario;

                            lista.appendChild(
                                elemento
                            );

                        }
                    );


                    contador.textContent =
                        comentarios.length;

                }
            );

        }


        document.querySelectorAll(
            ".form-comentario"
        ).forEach(
            function (formulario, indice) {

                formulario.addEventListener(
                    "submit",
                    function (evento) {

                        evento.preventDefault();


                        const campo =
                            formulario.querySelector(
                                ".campo-comentario"
                            );

                        const texto =
                            campo.value.trim();


                        if (!texto) return;


                        const chave =
                            `comentarios-${indice}`;


                        const comentarios =
                            JSON.parse(
                                localStorage.getItem(
                                    chave
                                ) || "[]"
                            );


                        comentarios.push(
                            texto
                        );


                        localStorage.setItem(
                            chave,
                            JSON.stringify(
                                comentarios
                            )
                        );


                        campo.value = "";


                        carregarComentarios();


                        adicionarNotificacao(
                            "💬 Seu comentário foi adicionado!"
                        );

                    }
                );

            }
        );


        carregarComentarios();


        // =================================================
        // PESQUISA
        // =================================================

        if (campoPesquisa) {

            campoPesquisa.addEventListener(
                "input",
                function () {

                    const pesquisa =
                        campoPesquisa.value
                            .toLowerCase()
                            .trim();


                    let encontrados = 0;


                    artigos.forEach(
                        function (artigo) {

                            const texto =
                                (
                                    artigo.textContent
                                    + " "
                                    + artigo.dataset.categoria
                                    + " "
                                    + artigo.dataset.tags
                                )
                                    .toLowerCase();


                            if (
                                texto.includes(
                                    pesquisa
                                )
                            ) {

                                artigo.classList.remove(
                                    "oculto"
                                );

                                encontrados++;

                            } else {

                                artigo.classList.add(
                                    "oculto"
                                );

                            }

                        }
                    );


                    if (semResultados) {

                        semResultados.hidden =
                            encontrados !== 0;

                    }

                }
            );

        }


        // =================================================
        // NOTIFICAÇÕES
        // =================================================

        let notificacoes =
            JSON.parse(
                localStorage.getItem(
                    "blog-notificacoes"
                ) || "[]"
            );


        function atualizarNotificacoes() {

            const lista =
                document.querySelector(
                    "#lista-notificacoes"
                );

            const contador =
                document.querySelector(
                    "#contador-notificacoes"
                );


            lista.innerHTML = "";


            if (
                notificacoes.length === 0
            ) {

                lista.innerHTML =
                    "<p>Nenhuma notificação nova.</p>";

            } else {

                notificacoes
                    .slice()
                    .reverse()
                    .forEach(
                        function (texto) {

                            const item =
                                document.createElement(
                                    "div"
                                );

                            item.className =
                                "notificacao";

                            item.textContent =
                                texto;

                            lista.appendChild(
                                item
                            );

                        }
                    );

            }


            contador.textContent =
                notificacoes.length;

        }


        function adicionarNotificacao(
            mensagem
        ) {

            notificacoes.push(
                mensagem
            );


            // Mantém somente as 10 mais recentes.

            if (
                notificacoes.length > 10
            ) {

                notificacoes =
                    notificacoes.slice(-10);

            }


            localStorage.setItem(
                "blog-notificacoes",
                JSON.stringify(
                    notificacoes
                )
            );


            atualizarNotificacoes();

        }


        atualizarNotificacoes();


        if (botaoNotificacoes) {

            botaoNotificacoes.addEventListener(
                "click",
                function () {

                    painelNotificacoes.hidden =
                        !painelNotificacoes.hidden;

                }
            );

        }


        if (fecharNotificacoes) {

            fecharNotificacoes.addEventListener(
                "click",
                function () {

                    painelNotificacoes.hidden =
                        true;

                }
            );

        }


        // =================================================
        // PERFIL
        // =================================================

        function atualizarPerfil() {

            const favoritos =
                JSON.parse(
                    localStorage.getItem(
                        "blog-favoritos"
                    ) || "[]"
                );


            let totalComentarios = 0;


            artigos.forEach(
                function (_, indice) {

                    const comentarios =
                        JSON.parse(
                            localStorage.getItem(
                                `comentarios-${indice}`
                            ) || "[]"
                        );

                    totalComentarios +=
                        comentarios.length;

                }
            );


            document.querySelector(
                "#perfil-artigos"
            ).textContent =
                artigos.length;


            document.querySelector(
                "#perfil-favoritos"
            ).textContent =
                favoritos.length;


            document.querySelector(
                "#perfil-comentarios"
            ).textContent =
                totalComentarios;

        }


        if (botaoPerfil) {

            botaoPerfil.addEventListener(
                "click",
                function () {

                    atualizarPerfil();

                    modalPerfil.hidden =
                        false;

                }
            );

        }


        if (fecharPerfil) {

            fecharPerfil.addEventListener(
                "click",
                function () {

                    modalPerfil.hidden =
                        true;

                }
            );

        }


        if (modalPerfil) {

            modalPerfil.addEventListener(
                "click",
                function (evento) {

                    if (
                        evento.target ===
                        modalPerfil
                    ) {

                        modalPerfil.hidden =
                            true;

                    }

                }
            );

        }


        // =================================================
        // BOTÃO VOLTAR AO TOPO
        // =================================================

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 400
                ) {

                    botaoTopo.classList.add(
                        "visivel"
                    );

                } else {

                    botaoTopo.classList.remove(
                        "visivel"
                    );

                }

            }
        );


        botaoTopo.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );


    }
);
```

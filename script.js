// =====================================================
// BLOG TECH - JAVASCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    const campoPesquisa =
        document.querySelector("#campo-pesquisa");

    const artigos =
        document.querySelectorAll("article");

    const contadorPosts =
        document.querySelector("#contador-posts");

    const semResultados =
        document.querySelector("#sem-resultados");

    const botaoTopo =
        document.querySelector("#voltar-topo");


    // =================================================
    // CURTIDAS
    // =================================================

    const botoesCurtida =
        document.querySelectorAll(".botao-curtir");


    botoesCurtida.forEach(function (botao) {

        const artigo =
            botao.closest("article");

        const indice =
            Array.from(artigos).indexOf(artigo);

        const tipo =
            botao.dataset.tipo;

        const chave =
            `curtida-${indice}-${tipo}`;

        const span =
            botao.querySelector("span");


        // Recupera a curtida salva

        const curtiu =
            localStorage.getItem(chave) === "true";


        if (curtiu) {

            botao.classList.add("curtiu");

            span.textContent =
                Number(span.textContent) + 1;
        }


        botao.addEventListener("click", function () {

            const estaCurtido =
                botao.classList.contains("curtiu");


            if (!estaCurtido) {

                span.textContent =
                    Number(span.textContent) + 1;

                botao.classList.add("curtiu");

                localStorage.setItem(
                    chave,
                    "true"
                );

            } else {

                span.textContent =
                    Math.max(
                        0,
                        Number(span.textContent) - 1
                    );

                botao.classList.remove("curtiu");

                localStorage.setItem(
                    chave,
                    "false"
                );
            }
        });

    });


    // =================================================
    // CONTADOR DE POSTS
    // =================================================

    if (contadorPosts) {

        contadorPosts.textContent =
            artigos.length;
    }


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


                artigos.forEach(function (artigo) {

                    const texto =
                        artigo.textContent.toLowerCase();


                    if (texto.includes(pesquisa)) {

                        artigo.classList.remove("oculto");

                        encontrados++;

                    } else {

                        artigo.classList.add("oculto");
                    }

                });


                if (semResultados) {

                    semResultados.hidden =
                        encontrados !== 0;
                }

            }
        );
    }


    // =================================================
    // BOTÃO VOLTAR AO TOPO
    // =================================================

    if (botaoTopo) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 400) {

                    botaoTopo.classList.add("visivel");

                } else {

                    botaoTopo.classList.remove("visivel");
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

});

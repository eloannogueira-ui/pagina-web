```javascript
// ===============================
// CURTIDAS
// ===============================

const botoes = document.querySelectorAll("article button");

botoes.forEach(function (botao) {
    let curtiu = false;

    botao.addEventListener("click", function () {
        const texto = botao.querySelector("span");
        let quantidade = Number(texto.textContent);

        if (!curtiu) {
            quantidade++;
            curtiu = true;
        } else {
            quantidade--;
            curtiu = false;
        }

        texto.textContent = quantidade;
    });
});


// ===============================
// MODO ESCURO
// ===============================

const botaoTema = document.querySelector("#botao-tema");

// Verifica se o usuário já escolheu o modo escuro
const temaSalvo = localStorage.getItem("tema");

if (temaSalvo === "escuro") {
    document.body.classList.add("modo-escuro");
    botaoTema.textContent = "☀️ Modo claro";
}


// Alterna entre claro e escuro
botaoTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-escuro");

    const modoEscuro = document.body.classList.contains("modo-escuro");

    if (modoEscuro) {
        botaoTema.textContent = "☀️ Modo claro";
        localStorage.setItem("tema", "escuro");
    } else {
        botaoTema.textContent = "🌙 Modo escuro";
        localStorage.setItem("tema", "claro");
    }
});
```

const URL = "http://localhost:3000/filmes";

async function carregarDashboard() {

    const resposta = await fetch(URL);

    const filmes = await resposta.json();

    atualizarCards(filmes);

    criarGraficoGenero(filmes);

    criarGraficoNotas(filmes);

    criarGraficoAno(filmes);
}

function atualizarCards(filmes){

    document.getElementById("totalFilmes").textContent =
        filmes.length;

    const somaNotas =
        filmes.reduce((soma, filme) => soma + filme.nota, 0);

    const media =
        (somaNotas / filmes.length).toFixed(1);

    document.getElementById("mediaNotas").textContent =
        media;

    const maisRecente =
        filmes.reduce((a,b) =>
            a.ano > b.ano ? a : b
        );

    document.getElementById("filmeRecente").textContent =
        maisRecente.titulo;
}

function criarGraficoGenero(filmes){

    const generos = {};

    filmes.forEach(filme => {

        generos[filme.genero] =
            (generos[filme.genero] || 0) + 1;
    });

    new Chart(
        document.getElementById("graficoGenero"),
        {
            type:'pie',

            data:{
                labels:Object.keys(generos),

                datasets:[{
                    data:Object.values(generos)
                }]
            }
        }
    );
}

function criarGraficoNotas(filmes){

    let faixas = {
        "0-2":0,
        "2-4":0,
        "4-6":0,
        "6-8":0,
        "8-10":0
    };

    filmes.forEach(filme => {

        if(filme.nota <= 2) faixas["0-2"]++;
        else if(filme.nota <= 4) faixas["2-4"]++;
        else if(filme.nota <= 6) faixas["4-6"]++;
        else if(filme.nota <= 8) faixas["6-8"]++;
        else faixas["8-10"]++;
    });

    new Chart(
        document.getElementById("graficoNotas"),
        {
            type:'bar',

            data:{
                labels:Object.keys(faixas),

                datasets:[{
                    label:"Quantidade",
                    data:Object.values(faixas)
                }]
            }
        }
    );
}

function criarGraficoAno(filmes){

    const anos = {};

    filmes.forEach(filme => {

        anos[filme.ano] =
            (anos[filme.ano] || 0) + 1;
    });

    new Chart(
        document.getElementById("graficoAno"),
        {
            type:'line',

            data:{
                labels:Object.keys(anos),

                datasets:[{
                    label:"Filmes",
                    data:Object.values(anos)
                }]
            }
        }
    );
}

carregarDashboard();
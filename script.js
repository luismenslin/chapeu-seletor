function getFormData(event) {
    event.preventDefault(); 

    const form = document.querySelector('form');
    const perguntas = [
        'pergunta1',
        'pergunta2',
        'pergunta3',
        'pergunta4',
        'pergunta5'
    ];

    let todasRespondidas = true;

    // Verifica se todas as perguntas foram respondidas
    perguntas.forEach(pergunta => {
        const options = form.querySelectorAll(`input[name="${pergunta}"]`);
        const respondida = Array.from(options).some(option => option.checked);
        if (!respondida) {
            todasRespondidas = false;
        }
    });

    if (!todasRespondidas) {
        alert("Por favor, responda todas as perguntas.");
        return;
    }


    const counts = {
        G: 0,
        S: 0,
        C: 0,
        L: 0
    };

    const selectedOptions = form.querySelectorAll('input[type="radio"]:checked');
    selectedOptions.forEach(option => {
        counts[option.value]++;
    });


    let maxCount = 0;
    let selectedHouse = '';
    const tiedHouses = [];

    for (const house in counts) {
        if (counts[house] > maxCount) {
            maxCount = counts[house];
            selectedHouse = house;
            tiedHouses.length = 0;
            tiedHouses.push(house);
        } else if (counts[house] === maxCount) {
            tiedHouses.push(house);
        }
    }

    // Desempate aleatório em caso de empate
    if (tiedHouses.length > 1) {
        const randomIndex = Math.floor(Math.random() * tiedHouses.length);
        selectedHouse = tiedHouses[randomIndex];
    }

    const houseNames = {
        G: 'Grifinória',
        S: 'Sonserina',
        C: 'Corvinal',
        L: 'Lufa-Lufa'
    };

    const houseUrls = {
        G: 'grifinoria.html',
        S: 'sonserina.html',
        C: 'corvinal.html',
        L: 'lufa-lufa.html'
    };

    // Redireciona para a página correspondente
    if (selectedHouse) {
        window.location.href = `houses/${houseUrls[selectedHouse]}`;
    } else {
        alert("Ocorreu um erro ao determinar a casa. Por favor, tente novamente.");
    }
}
const search = document.getElementById('search');
const result = document.getElementById('result');
const alerte = document.getElementById('alert');
const textAlert = document.getElementById('textAlert');
const closeAlert = document.getElementById('closeAlert');

search.addEventListener('keydown', function (event) {
    if (event.keyCode == 27) {
        search.value = '';
    }
})

closeAlert.addEventListener('click', function () {
    alerte.classList.add('hidden');
})

search.addEventListener('input', getVilles);

function getVilles() {
    if (search.value.length > 0) {
        if (!alerte.classList.contains('hidden')) {
            alerte.classList.add('hidden');
        }
        fetch('http://localhost/autocompletion/php/pdo.php?search=' + search.value, {
            method: 'GET',
        }).then(function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            throw new Error(response.statusText)
        })
            .then(function (data) {
                updateResult(data);
            })
    } else {
        emptyResult();
        textAlert.innerHTML = 'Votre recherche ne peut pas être vide si vous souhaitez recevoir des propositions.';
        alerte.classList.remove('hidden');
    }
}

function updateResult(data) {
    emptyResult();
    displayResult(data);
}

function emptyResult() {
    while (result.childNodes.length > 0) {
        result.childNodes[0].remove();
    }
}

function displayResult(data) {
    console.log(data);
    var isEmpty = true;
    for (var elem of data) {
        var li = document.createElement('li');
        li.innerHTML = elem['name'];
        result.appendChild(li);
        isEmpty = false;
    }
    if (isEmpty) {
        textAlert.innerHTML = 'Aucun résultat ne correspond à votre recherche. Essayez en une autre!';
        alerte.classList.remove('hidden')
    }
}
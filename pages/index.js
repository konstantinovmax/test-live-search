const searchInput = document.querySelector('.header__input');
const results = document.querySelector('.header__results');

let searchString = '';
let poems;

const fetchPoems = async () => {
    poems = await fetch('https://raw.githubusercontent.com/sberbank-ai/classic-ai/master/data/classic_poems.json')
        .then(res => res.json())
        .catch(err => console.log(err));
};

const showPoems = async () => {
    results.innerHTML = '';
    await fetchPoems();

    const ul = document.createElement('ul');
    ul.classList.add('header__poems');

    poems
        .filter(poems => poems.content.toLowerCase().includes(searchString.toLowerCase()))
        .forEach(poems => {
            const li = document.createElement('li');
            li.classList.add('header__poems-element');

            const poemAuthor = document.createElement('h3');
            poemAuthor.innerText = poems.poet_id;
            poemAuthor.classList.add('header__poems-author');
            li.appendChild(poemAuthor);

            const poemName = document.createElement('p');
            poemName.innerText = poems.title;
            poemName.classList.add('header__poems-name');
            li.appendChild(poemName);

            const poemText = document.createElement('p');
            poemText.innerText = poems.content;
            poemText.classList.add('header__poems-text');
            li.appendChild(poemText);
            
            ul.appendChild(li);
        });

    results.appendChild(ul);
};

searchInput.addEventListener('input', e => {
    searchString = e.target.value;
    showPoems();
});

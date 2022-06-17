function attachEvents() {
    document.getElementById('refresh').addEventListener('click', loadMessages);
    document.getElementById('submit').addEventListener('click', onSubmit);
}

attachEvents();

const authorInput = document.querySelector('[name="author"]');
const contentInput = document.querySelector('[name="content"]');

async function onSubmit(){
    const author = authorInput.value;
    const content = contentInput.value;
    const result = await createMessage({ author, content });

}

async function loadMessages(){
    const url = 'http://localhost:3030/jsonstore/messenger';

    const res = await fetch(url);
    const data = await res.json();

    const result = Object.values(data);

    const area = document.getElementById('messages');
    area.value = result.map(m => `${m.author}: ${m.content}`).join('\n');
}

async function createMessage(message){
    const url = 'http://localhost:3030/jsonstore/messenger';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    };

    const res = await fetch(url, options);
    const data = await res.json();

    return data;
}
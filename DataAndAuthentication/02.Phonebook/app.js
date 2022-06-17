function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', loadContacts);
    document.getElementById('btnCreate').addEventListener('click', onSubmit);
}

attachEvents();

const phonebookElement = document.getElementById('phonebook');
const personInput = document.getElementById('person');
const phoneInput = document.getElementById('phone');

async function onSubmit(){
    const person = personInput.value;
    const phone = phoneInput.value;

    await createContact({person, phone});
    createElementContact({person, phone});
}

async function loadContacts(){
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const res = await fetch(url);
    const date = await res.json();

    Object.values(date).forEach(c => {
       createElementContact(c);
    })
}

function createElementContact(contact){
    const createLiElement = document.createElement('li');
    createLiElement.textContent = `${contact.person}: ${contact.phone}`;
    
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Delete'
    buttonElement.addEventListener('click', deleteContact(contact.id));
    createLiElement.appendChild(buttonElement);

    phonebookElement.appendChild(createLiElement);
}

async function createContact(message){
    const url = 'http://localhost:3030/jsonstore/phonebook';

    const options = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }

    const res = await fetch(url, options);
    const result = await res.json();

    return result;
}

async function deleteContact(id){
    const url =  'http://localhost:3030/jsonstore/phonebook/' + id;
    
    const options = {
        method: 'delete'
    }
    const res = await fetch(url, options);
    const result = await res.json();

    return result;

}
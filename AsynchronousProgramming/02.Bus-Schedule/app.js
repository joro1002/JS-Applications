function solve() {
    const infoElement = document.getElementById('info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    }

    async function depart() {
        const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        const res = await fetch(url);
        stop = await res.json();

        infoElement.textContent = `Next stop ${stop.name}`;

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
        infoElement.textContent = `Arriving at ${stop.name}`;
        
        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
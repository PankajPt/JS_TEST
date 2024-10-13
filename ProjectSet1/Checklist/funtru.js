const header = document.getElementById('header')
const ul = document.createElement('ul');
const li = document.createElement('li');
let submit = document.querySelector('.submit-btn')
const container = document.querySelector('.box-container');
const taskContainer = document.querySelector('.task-container');
let currentPage = location.pathname;

const taskList = {
    1: 'Copy 2 parameter in 3.4.0 a2p_config.xlsx',
    2: 'Update mapping sheet whitelist without prefix',
    3: 'Upgrade to release 3.5.0',
    4: 'Delete lib from Sync Server',
    5: 'Upgrade to HF2'
}

if (currentPage.includes('index.html')){ 
    submit.addEventListener('click', ()=>{
        let type = document.getElementById('type').value;
        let clusters = parseInt(document.getElementById('clusters').value);
        sessionStorage.setItem('fromIndex', 'true')
        sessionStorage.setItem('type', type);
        sessionStorage.setItem('clusters', clusters);
        location.href = 'checklist_1.html';
    })
}

if (currentPage.includes('checklist_1.html')){
    const fromIndex = sessionStorage.getItem('fromIndex');

    if (!fromIndex || fromIndex === 'false'){
        location.href = 'index.html';
    } else {
        const type = sessionStorage.type
        const clusters = sessionStorage.clusters
        const home = document.getElementById('home');

        home.addEventListener('click', ()=>{
            const userConfirmed = confirm("This will reset all your progress, so make sure to proceed carefully.");
            if (userConfirmed){                
            sessionStorage.setItem('fromIndex', 'false');
            location.href = 'index.html'
            }
        })

        if (type === 'Internal'){
            buildIntDiv(clusters);
        } else {
            buildExtDiv(clusters);
        }

        function buildIntDiv(clusters){

            for (let i = 1; i <= clusters; i++){
                header.textContent = type;
                const div = document.createElement('div');
                div.innerHTML = `<h2 id="cluster${i}">Cluster ${i}</h2>`
                div.classList.add('box')
                container.appendChild(div)
            }
        }

        function buildExtDiv(clusters){
            header.textContent = type;
            for (let i = 1; i <= clusters; i++){
                const div = document.createElement('div');
                div.innerHTML = `<h2 id="cluster${i}">Cluster ${i}</h2>`
                div.classList.add('box')
                container.appendChild(div)
            }
        }

        const clusterBox = document.querySelectorAll('.box');
        clusterBox.forEach(function(cluster, index){
            cluster.addEventListener('click', function(){
                const clusterNum = cluster.textContent
                sessionStorage.setItem('index', clusterNum)
                sessionStorage.setItem('tasklist', 'true')
                location.href = 'tasklist.html'
            })
        })

        // onload build div 
    }
}

if (currentPage.includes('tasklist.html')){
    const tasklist = sessionStorage.getItem('tasklist')
    if (!tasklist || tasklist === 'false'){
        location.href = 'index.html'
    } else {
        const tasks = Object.keys(taskList)
        const index = sessionStorage.getItem('index')
        const title = document.getElementById('title')
        title.textContent = `Tasks for ${index}`
        tasks.forEach(function(key, index){
            const div = document.createElement('div');
            div.classList.add('task')
            const span = document.createElement('span');
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.setAttribute('type', 'checkbox')
            input.setAttribute('id', index)
            const newTask = document.createTextNode(taskList[key])
            span.appendChild(newTask)
            label.appendChild(input)
            label.appendChild(span)
            div.appendChild(label)
            taskContainer.appendChild(div)
        })
    }
}




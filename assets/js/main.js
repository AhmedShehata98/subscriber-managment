import { ManagmentSystem } from "./ManagmentSystem.js";


let subscriberSystem = new ManagmentSystem();
const searchBox   = document.getElementById('searchByName');
const selectfilter   = document.getElementById('selectfilter');
const TogglerIcon = document.getElementById('toggle');
const expireBox = document.getElementById('expiredTrainees');
const activeBox = document.getElementById('activeTrainees');
const totalBox  = document.getElementById('totalTrainees');


subscriberSystem.displayUserData(subscriberSystem.trainees);
subscriberSystem.getTraineesFromLocalStorage();
subscriberSystem.checkIfExpired();

subscriberSystem.displayStatistics(expireBox,activeBox,totalBox);


// start event lisiners
TogglerIcon.addEventListener('click',()=>{
    document.querySelector('.sideHeader').classList.toggle('opened')
})

// search box
searchBox.addEventListener('input',()=>{
    subscriberSystem.filterDataWith(undefined,searchBox.value);
})

// filter with select
selectfilter.addEventListener('change',()=>{
    subscriberSystem.filterDataWith(selectfilter.value)
})

// hide navbar
window.addEventListener('resize',()=>{
    if (window.innerWidth <= 890) {
        document.querySelector('.sideHeader').classList.add('hide')
    }else{
        
        document.querySelector('.sideHeader').classList.remove('hide')
    }
})

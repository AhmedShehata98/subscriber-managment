import { ManagmentSystem } from "./ManagmentSystem.js";

let subscriberSystem = new ManagmentSystem();
const TogglerIcon = document.getElementById('toggle');
const fullName = document.getElementById('fullName');
const subscribePrice = document.getElementById('price');
const exerciseType = document.getElementById('ExerciseType');
const subscriptionPeriod = document.getElementById('SubscriptionPeriod');
const sendBTN = document.getElementById('sendBTN');

// triger functions
subscriberSystem.displayUserData(subscriberSystem.trainees);
subscriberSystem.getTraineesFromLocalStorage();
subscriberSystem.checkIfExpired();

// Start events
TogglerIcon.addEventListener('click',()=>{
    document.querySelector('.sideHeader').classList.toggle('opened')
})

sendBTN.addEventListener('click',()=>{
    subscriberSystem.getDataFromAdmin__LS_Verson(fullName.value,+subscribePrice.value,exerciseType.value,subscriptionPeriod.value);
    subscriberSystem.displayUserData(subscriberSystem.trainees);
})

fullName.addEventListener('input',()=>{
    subscriberSystem.filterDataWith(undefined,fullName.value);
})

window.addEventListener('resize',()=>{
    if (window.innerWidth <= 890) {
        document.querySelector('.sideHeader').classList.add('hide')
    }else{
        
        document.querySelector('.sideHeader').classList.remove('hide')
    }
})

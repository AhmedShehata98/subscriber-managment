const innerDataLocation = document.getElementById('innerData');
const mainInputForm     = document.getElementById('mainInputForm');

export class ManagmentSystem{
    constructor(){
        this.traineeDetails ;
        this.trainees = [];
        this.dateNow = new Date();
    }


        getDataFromAdmin__LS_Verson(nameIn,priceIn,exerciseTypeIn,subsPeriodIn){
            
            if (mainInputForm.checkValidity() === false){
                // check if input fields in not empty
                swal('worong',"You can not leave empty input fields" ,'error')

            }else{
                this.traineeDetails = {
                name : nameIn.toUpperCase(),
                moneyPaid : priceIn,
                exerciseType : exerciseTypeIn.toUpperCase(),
                subsPeriod : subsPeriodIn,
                subsStatus : true,
                subsctibeExpireDate : this.getExpireDate(subsPeriodIn,new Date().getDate(),new Date().getMonth() , new Date().getFullYear()),
                

                
            }
            // push to array
            this.trainees.push(this.traineeDetails);

            // reset input fields
            mainInputForm.reset()

            // save to local storage
            if(this.trainees.length > 0){
                localStorage.setItem('trainee' , JSON.stringify(this.trainees));
                swal('Ok',"trainee is add successfully" ,'success')
            }

        }   
    }

    getTraineesFromLocalStorage(){
        if(window.localStorage.getItem('trainee') == undefined || window.localStorage.getItem('trainee') == null){

        }else{
            this.trainees = JSON.parse(window.localStorage.getItem('trainee'))
            this.displayUserData(this.trainees);
        }
    }

    displayUserData(array){
        innerDataLocation.innerHTML = ''

        array.forEach((trainee,index) =>{
            const tableRow = document.createElement('tr');
            const tableHeadID = document.createElement('th');
            const tableHeadName = document.createElement('th');
            const tableHeadExerType = document.createElement('th');
            const tableHeadExpiryDate = document.createElement('th');
            const tableHeadPriceing = document.createElement('th');
            const tableHeadSubsPeriod = document.createElement('th');
            const tableHeadStat = document.createElement('th');
            const statRenewBTN = document.createElement('button');

            statRenewBTN.className = 'btn btn-outline-primary btn-sm text-capitalize mx-2'
            statRenewBTN.setAttribute('data-id','renewBTN')
            statRenewBTN.appendChild(document.createTextNode('renew'));

            tableRow.appendChild(tableHeadID);
            tableRow.appendChild(tableHeadName);
            tableRow.appendChild(tableHeadExerType);
            tableRow.appendChild(tableHeadSubsPeriod);
            tableRow.appendChild(tableHeadExpiryDate);
            tableRow.appendChild(tableHeadPriceing);
            tableRow.appendChild(tableHeadStat);
            
            tableHeadID.appendChild(document.createTextNode(index +1) );
            tableHeadID.setAttribute('scope','row');
            tableHeadName.appendChild(document.createTextNode(trainee.name) );
            tableHeadExerType.appendChild(document.createTextNode(trainee.exerciseType) );
            tableHeadSubsPeriod.appendChild(document.createTextNode(trainee.subsPeriod) );    
            tableHeadExpiryDate.appendChild(document.createTextNode(trainee.subsctibeExpireDate) );
            tableHeadPriceing.appendChild(document.createTextNode(trainee.moneyPaid) );
            tableHeadStat.appendChild(document.createTextNode(trainee.subsStatus === true ? 'paid' : 'Expired') );
            trainee.subsStatus === true ? '' :  tableHeadStat.appendChild(statRenewBTN)
            
            statRenewBTN.addEventListener('click',(e)=>{
                this.renewSubscribe(index)
                // trainee.subsStatus === true ? tableHeadStat.removeChild(statRenewBTN) :''

            })
            
            innerDataLocation.appendChild(tableRow);
        })
    }
    
    getExpireDate(period,dayValue,monthValue,yearValue){
        let calcMonth ;
        let calcYear ;
        

        if (period === '1-month' ) {
            calcMonth = monthValue + 1
        }

        if (period === '3-month' ) {
            calcMonth = monthValue + 3
        }

        if (period === '6-month' ) {
            calcMonth = monthValue + 6
        }
        if (period === 'year' ) {
            calcYear = yearValue + 1
        }
        

        return `${dayValue} / ${calcMonth === undefined ? calcMonth = monthValue : calcMonth} / ${calcYear === undefined ? calcYear = yearValue : calcYear}`; 
    }


    alertExpiredTraineeSubscribeDate(expireDate){
        let dateNow = new Date().toDateString();
        let expire  = new Date(expireDate).toDateString(); 
        
        if (dateNow === expire) { 
            return true //means trainee  is expired
        }else{
            return false //means trainee  is not expired
        }
    }

    checkIfExpired(){
        let dateNow = new Date().toDateString();

        for(let i=0 ; i< this.trainees.length ; i++){

            if(new Date(this.trainees[i].subsctibeExpireDate).toDateString() === dateNow){
                this.trainees[i].subsStatus = false ;
            }
        }
    }

    renewSubscribe(index){
        let newSubscribeDate ;

        if (this.trainees[index].subsPeriod.split('-')[1] === 'month') {
            newSubscribeDate = `${new Date().getDate()} / ${new Date().getMonth() + +(this.trainees[index].subsPeriod.split('-')[0])} / ${new Date().getFullYear()} `

            swal('done' ,'The subscription has been successfully renewed ' ,'success' )
        }
        
        if (this.trainees[index].subsPeriod === 'year') {
            newSubscribeDate = `${new Date().getDate()} / ${new Date().getMonth()} / ${new Date().getFullYear() + 1} `
            swal('done' ,'The subscription has been successfully renewed ' ,'success' )
        }
        this.trainees[index].subsctibeExpireDate = newSubscribeDate ;
        this.trainees[index].subsStatus = true;
        window.localStorage.setItem('trainee',JSON.stringify(this.trainees));
        this.displayUserData(this.trainees);
    }

    filterDataWith(shearchMethod,inputSearch){

        if(shearchMethod === undefined && inputSearch !== ''){

            let filterd = this.trainees.filter(str => {
               return str.name.startsWith(inputSearch.toUpperCase())
            })
            
            this.displayUserData(filterd)
            
        }else{

            
            if(shearchMethod === 'expired'){
                let filter = this.trainees.filter(item => item.subsStatus === false);
                this.displayUserData(filter);
            }else if(shearchMethod === 'active'){
                let filter = this.trainees.filter(item => item.subsStatus === true);
                this.displayUserData(filter);
            }else{
                this.displayUserData(this.trainees);
            }
        }
    }

    displayStatistics(expireBox , activeBox ,totalBox){
        totalBox.textContent  = this.trainees.length;
        let activeTrainees =this.trainees.filter(active => active.subsStatus === true).length
        let expiredTrainees =this.trainees.filter(active => active.subsStatus === false).length
        expireBox.textContent  = expiredTrainees ;
        activeBox.textContent  = activeTrainees ;
    }

}
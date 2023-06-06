showtask();

let addtaskinput=document.getElementById("task-field");
let addtaskbtn=document.getElementById("btn-1");

addtaskbtn.addEventListener("click",function(){

    inputValue=addtaskinput.value;
    if(inputValue.trim()!=0){

         
    let webtask=localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }else{
        taskObj = JSON.parse(webtask); 
    }

    taskObj.push(inputValue);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value='';
    }

   
    showtask();
})


function showtask(){

    let webtask=localStorage.getItem("localtask");
    if(webtask == null){
        taskObj = [];
    }else{
        taskObj = JSON.parse(webtask); 
    }

    let html ='';
    let addtasklist = document.getElementById('output-value');
    taskObj.forEach((item,index) => {
        html += `  <tr>
        <th> ${index+1} </th>
        <td> ${item} </td>
        <td> <button type="button" class="btn text-primary" onclick="edittask(${index})">Edit</button> </td>
        <td> <button type="button" class="btn text-danger" onclick="deleteitem(${index})">Delete</button> </td>
        
        </tr>`;

    });

    addtasklist.innerHTML=html;
}


// for edit task

function edittask(index){
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("btn-1");
    let savetaskbtn = document.getElementById("save-btn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    addtaskinput.value = taskObj[index];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";


}


// for save task 

let savetaskbtn = document.getElementById("save-btn");
savetaskbtn.addEventListener("click",function(){
    let addtaskbtn = document.getElementById("btn-1");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    let saveindex = document.getElementById("saveindex").value;
    taskObj[saveindex]=addtaskinput.value;
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    addtaskinput.value='';
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
})


// for delete item 

function deleteitem(index){
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index,1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}


// for delete all 

let deleteallbtn=document.getElementById("del-btn");
deleteallbtn.addEventListener("click",function(){
    let savetaskbtn = document.getElementById("save-btn");
    let addtaskbtn = document.getElementById("btn-1");
let webtask = localStorage.getItem("localtask");
let taskObj = JSON.parse(webtask);
if(webtask == null){
    taskObj = [];
}else{
    taskObj = JSON.parse(webtask);
    taskObj = []; 
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    showtask();
}

addtaskbtn.style.display="block";
savetaskbtn.style.display="none";

})


// for sesrching an item in the list 

let searchtextbox = document.getElementById("search-box");
searchtextbox.addEventListener("input",function(){

    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item){
        let searchedtext = item.getElementsByTagName("td")[0].innerText;
        let searchtextboxval = searchtextbox.value;
        let re = new RegExp(searchtextboxval,'gi');
        if(searchedtext.match(re)){
            item.style.display="table-row";
        }else{
            item.style.display="none";
        }
    })
})

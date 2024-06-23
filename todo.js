function getandupdate(){
    console.log("Updating List");
    tit=document.getElementById('title').value;
    desc=document.getElementById('description').value;

    //itemJson is used as s key
    if(localStorage.getItem('itemsJson') == null){
        itemJsonArray = [];   // declaring the array
        itemJsonArray.push([tit,desc]);
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson'); // this will be returned as a string , therefore we need to parse it 
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit,desc]);
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    }
    update();
}
function update(){

    if(localStorage.getItem('itemsJson') == null){
        itemJsonArray = [];   // declaring the array
        localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    }
    else{
        itemJsonArrayStr = localStorage.getItem('itemsJson'); // this will be returned as a string , therefore we need to parse it 
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    //populate the table
    let tableBody = document.getElementById("tablebody");
    let str = "";
    itemJsonArray.forEach((content,index) => {
        str+=`
        <tr>
            <th scope="row">${index + 1})</th>
            <td>${content[0]}</td>
            <td>${content[1]}</td>
            <td><button class="btn btn-sm btn-editing" onclick="edited(${index})"">Edit</button></td>
            <td><button class="btn btn-sm btn-deleting" onclick="deleted(${index})"">Delete</button></td>
        </tr>
        `
    });

    tableBody.innerHTML = str;
}
add = document.getElementById("add");
add.addEventListener("click", getandupdate);
update();


function deleted(itemindex){
    itemJsonArrayStr = localStorage.getItem('itemsJson'); // this will be returned as a string , therefore we need to parse it 
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemindex from the array
    itemJsonArray.splice(itemindex,1);
    localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));
    update();
}


function edited(itemindex){
    itemJsonArrayStr = localStorage.getItem('itemsJson'); 
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    
    let newdeadline= prompt("Enter the new deadline: ");
    itemJsonArray[itemindex][1] = newdeadline;

    localStorage.setItem('itemsJson',JSON.stringify(itemJsonArray));

    update();
}


function clearing(){
    if(confirm("Do you really want to clear?")){
        console.log('clearing the storage');
        localStorage.clear();
        update();
    }
}

const input = document.querySelector("input#input-el");
const saveButton = document.querySelector("button#save-btn");
const linkBody = document.querySelector("ul#link-body");
const deleteButton = document.querySelector("button#delete-btn");
const listItem = document.querySelectorAll("ul li");


const setMultipleAttrs = ( el, obj ) => {
    for ( attr in obj ) {
        el.setAttribute(attr, obj[attr]);
    }
}

const storeLeads = ( ul ) => {
    let leads = [];
    for ( el of ul.children ){
        leads.push(el.textContent);
    }
    localStorage.setItem("leads", JSON.stringify(leads))
    console.log(leads);
}

const leadsFromStorage = JSON.parse(localStorage.getItem("leads"));

const renderLeads = () => {
    let innerLeadsHTML = "";
    for (let i = 0; i < leadsFromStorage.length; i++) {
        innerLeadsHTML += `
                            <li><a href=${leadsFromStorage[i]} target=_blank >${leadsFromStorage[i]}</a></li>
                          `
    }
    linkBody.innerHTML = innerLeadsHTML;
}


if ( leadsFromStorage ) {
    renderLeads();
}   

saveButton.addEventListener( "click", () => {

    const link = document.createElement("a");
    const li = document.createElement("li");
    link.textContent = input.value; 
    input.value = "";
    setMultipleAttrs(link, {"href": input.value, "target": "_blank"});
    li.appendChild(link);
    linkBody.appendChild(li);
    storeLeads(linkBody);
});



deleteButton.addEventListener( "dblclick", () => {
    localStorage.clear();
    linkBody.innerHTML = "";

})
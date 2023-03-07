
const input = document.querySelector("input#input-el");
const saveButton = document.querySelector("button#save-btn");
const linkBody = document.querySelector("ul#link-body");
const deleteButton = document.querySelector("button#delete-btn");


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

const render = ( store ) => {
    let innerStoreHTML = "";
    for (let i = 0; i < store.length; i++) {
        innerStoreHTML += `
                            <li><a href=${store[i]} target=_blank >${store[i]}</a></li>
                          `
    }
    linkBody.innerHTML = innerStoreHTML;
}


if ( leadsFromStorage ) {
    render( leadsFromStorage );
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



// tag do resulado
const balance = document.querySelector("#balance")
// tipo/nome da receita
const text = document.querySelector("#text")
// o valor da montante recebido ou negativado 
const amount = document.querySelector("#amount")
//form 
const form_control = document.querySelector(".form-control")
//botao do form
const btn_submit = document.querySelector(".btn")
//contador 
let cont = 0 


const fragment = document.createDocumentFragment()
// ul -> lista
const transactions = document.querySelector("#transactions") 

// itens a serem salvos 
let itens = {}
if (localStorage.getItem("itens")) {
  itens = JSON.parse(localStorage.getItem("itens"))
}

btn_submit.addEventListener('click',(event)=>{
    event.preventDefault();
    cont++;
    
    itens[ cont] = {"id":cont,"nome": text.value,"valor":  amount.value }
    text.value = ""
    amount.value = ""
    localStorage.setItem("itens",JSON.stringify(itens))
    
    // let parametro = localStorage.getItem(itens[1])
    // console.log(parametro);
    // let dados = JSON.parse(parametro)
    // console.log(dados);
    criadorDeTags()

 
})



function criadorDeTags() {
    
    const li = document.createElement("li")
    console.log(itens[cont]["valor"]);
    if(itens[cont]["valor"]>0){
        li.classList.add("plus")
        li.innerHTML = itens[cont]["nome"] + `<span>${itens[cont]["valor"]}</span> <button class="delete-btn">x</button>`
    }else{
        li.classList.add("minus")
        li.innerHTML = itens[cont]["nome"] + `<span>${itens[cont]["valor"]}</span> <button class="delete-btn">x</button>`
    }
    fragment.appendChild(li)
    transactions.appendChild(fragment)
 
}




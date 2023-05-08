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
// itens a serem salvos 
let itens = []
const fragment = document.createDocumentFragment()
// ul -> lista
const transactions = document.querySelector("#transactions") 

btn_submit.addEventListener('click',(event)=>{
    event.preventDefault();
    cont++;
  
    itens.push({"id":cont,"nome": text.value,"valor":  amount.value })
    text.value = ""
    amount.value = ""
    criadorDeTags()
 
})


function criadorDeTags() {
    
    const li = document.createElement("li")
    
    if(itens[cont-1]["valor"]>0){
        li.classList.add("plus")
        li.innerHTML = itens[cont-1]["nome"] + `<span>${itens[cont-1]["valor"]}</span> <button class="delete-btn">x</button>`
    }else{
        li.classList.add("minus")
        li.innerHTML = itens[cont-1]["nome"] + `<span>${itens[cont-1]["valor"]}</span> <button class="delete-btn">x</button>`
    }
    fragment.appendChild(li)
    
}



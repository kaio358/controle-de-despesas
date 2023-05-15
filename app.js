// Para tag do resulado
const balance = document.querySelector("#balance")
var valor = 0



// tipo/nome da receita
const text = document.querySelector("#text")
// o valor da montante recebido ou negativado 
const amount = document.querySelector("#amount")
//form 
const form_control = document.querySelector(".form-control")
//botao do form
const btn_submit = document.querySelector(".btn")


const fragment = document.createDocumentFragment()
// ul -> lista
const transactions = document.querySelector("#transactions") 

// itens a serem salvos 
let itens = localStorage.getItem("itens") ? JSON.parse(localStorage.getItem("itens")) : {};
let cont = Object.keys(itens).length;

// Receita e despesas 
const money_plus = document.querySelector("#money-plus")
let valor_plus = 0;
const money_minus = document.querySelector("#money-minus")
let valor_minus = 0;

btn_submit.addEventListener('click',(event)=>{
    event.preventDefault();


    cont++;
    if(localStorage.getItem("id") == null){
        localStorage.setItem("id",cont)
       
    }
    if ((localStorage.getItem("id") >  cont)|| (localStorage.getItem("id") < cont )) {
        localStorage.setItem("id", parseInt( localStorage.getItem("id")) +1)
        
    }

    
    itens[ localStorage.getItem("id")] = {"id":localStorage.getItem("id"),"nome": text.value,"valor":  amount.value }
    text.value = ""
    amount.value = ""
    localStorage.setItem("itens",JSON.stringify(itens))
      
    
    criadorDeTags()

 
})

function criaBotao(itensLocal,val) {
    
    const button = document.createElement("button")
        button.classList.add("delete-btn")
        button.innerText = "x"
        
        // evento de click para o botão
        button.addEventListener('click', () => {
            const pai  =  button.parentNode
            
            delete itensLocal[pai.id]
            if( pai.classList.toString() == "plus") money_plus.textContent = "R$ "+(valor_plus -val).toFixed(2)
            if( pai.classList.toString() == "minus") money_minus.textContent = "R$ "+(valor_minus +val).toFixed(2)
            
            pai.remove()
            valor += val*(-1)
            balance.textContent = valor.toFixed(2);
    
            localStorage.setItem("balance", valor);
            localStorage.setItem("itens",JSON.stringify(itensLocal))
          
        });
    return button
}

function criaLi(itensLocal,elemento) {
    const li = document.createElement("li")
    li.id = itensLocal[elemento]["id"]
    if(itensLocal[elemento]["valor"]>0){
        valor_plus +=  parseFloat( itensLocal[elemento]["valor"])
      
        money_plus.textContent =   "R$ "+(valor_plus).toFixed(2)
        li.classList.add("plus")
        li.innerHTML = itensLocal[elemento]["nome"] + `<span>${itensLocal[elemento]["valor"]}</span> `
       
    }else{
        valor_minus += (itensLocal[elemento]["valor"]*-1)
        li.classList.add("minus")
        money_minus.textContent =   "R$ "+(valor_minus).toFixed(2)
        
        li.innerHTML = itensLocal[elemento]["nome"] + `<span>${itensLocal[elemento]["valor"]}</span> `
       
    }
    return li
}

function criadorDeTags() {
    var itensLocal = JSON.parse(localStorage.getItem("itens"))
    const li = criaLi(itensLocal,localStorage.getItem("id"))
    const button = criaBotao(itensLocal,parseFloat( itensLocal[localStorage.getItem("id")]["valor"]))
          

    li.appendChild(button)
    transactions.appendChild(li)


    valor += parseFloat( itensLocal[localStorage.getItem("id")]["valor"])
    balance.textContent = valor.toFixed(2);
    
    localStorage.setItem("balance", valor);
}

function main() {

    var itensLocal = JSON.parse(localStorage.getItem("itens"))
  
    for(var elemento in itensLocal){
        const li = criaLi(itensLocal,elemento)
      
        // implementando o botão 
    
        const button =   criaBotao(itensLocal,parseFloat(itensLocal[elemento]["valor"]))
      
        li.appendChild(button)
        fragment.appendChild(li)


       valor+= parseFloat(itensLocal[elemento]["valor"]);
    
     
    }
  
    
    
    transactions.appendChild(fragment)

   
    balance.textContent = valor.toFixed(2);
    
    localStorage.setItem("balance", valor);
}


window.addEventListener('DOMContentLoaded', function() {
    console.log('A página foi carregada!');
    main()
  });
  
  window.addEventListener('beforeunload', function(event) {
    event.preventDefault(); // Cancela o evento padrão
    console.log('A página está sendo fechada!');
    main()

  });


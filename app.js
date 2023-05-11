// tag do resulado
const balance = document.querySelector("#balance")

let valorParaBalance = localStorage.getItem("balance") ? parseInt(localStorage.getItem("balance")) : 0;


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



function criadorDeTags() {
    var itensLocal = JSON.parse(localStorage.getItem("itens"))
    const li = document.createElement("li")
    if(itensLocal[localStorage.getItem("id")]["valor"]>0){
        li.classList.add("plus")
        li.innerHTML = itensLocal[localStorage.getItem("id")]["nome"] + `<span>${itensLocal[localStorage.getItem("id")]["valor"]}</span> <button class="delete-btn">x</button>`
    }else{
        li.classList.add("minus")
        li.innerHTML = itensLocal[localStorage.getItem("id")]["nome"] + `<span>${itensLocal[localStorage.getItem("id")]["valor"]}</span> <button class="delete-btn">x</button>`
    }
    transactions.appendChild(li)
}

function main() {
    var itensLocal = JSON.parse(localStorage.getItem("itens"))
   
   
    for(var elemento in itensLocal){
        const li = document.createElement("li")
        if(itensLocal[elemento]["valor"]>0){
            li.classList.add("plus")
            li.innerHTML = itensLocal[elemento]["nome"] + `<span>${itensLocal[elemento]["valor"]}</span> <button class="delete-btn">x</button>`
        }else{
            li.classList.add("minus")
            li.innerHTML = itensLocal[elemento]["nome"] + `<span>${itensLocal[elemento]["valor"]}</span> <button class="delete-btn">x</button>`
        }
        localStorage.setItem("balance", parseInt( localStorage.getItem("balance")) + parseInt( elemento["valor"]))
        fragment.appendChild(li)
        
    }

    
    
    transactions.appendChild(fragment)
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

//botao de delete
const delete_btn = document.querySelectorAll(".delete-btn")

delete_btn.forEach((button, index) => {

    button.addEventListener('click', () => {
      alert(`Você clicou no botão ${index + 1}`);
    });
  });

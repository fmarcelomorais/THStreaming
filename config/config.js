$(document).ready(function() {  
    
  $('footer').html(` <div class="footer-lower container">
  <div class="media-container-row">
      <div class="col-sm-12">
          <hr>
      </div>
  </div>
  <div class="media-container-row mbr-white">
      <div class="col-sm-12 copyright">
          © <span class="year"></span> - Todos os Direitos Reservados - <span class="nameRev"></span>
          <p class="mbr-text mbr-fonts-style display-7">
             <!--  © <span class="year"></span> - Todos os Direitos Reservados - <span class="rev"></span> -->
          </p>
      </div>
  </div>
</div>
</div>`);  

$('.year').html(new Date().getFullYear())
$('.btnEnviar').on('click', enviar)
$('.btnEditar').on('click', editar)
$('.btnLogar').on('click', logar)
    
})

async function logar(e){
    e.preventDefault()
    const data = {
        login: $('#login').val(),
        password: $('#password').val()
    }

    const URL = 'https://backend-site-six.vercel.app/login';
    $.ajax({
        url: URL,
        method: 'GET',
        data: data,
        success: function(data){
          if(data.length > 0){        
            window.close('/login.html')           
            window.open('/painel-site.html')
            window.localStorage.setItem('id', data[0].id)
            $('.idUser').attr('value',window.localStorage.getItem('id'))
        }else{     
            setTimeout(()=>{
                window.location.reload('/login.html')
            }, 2000)
        } 
    }
})   
    
}

async function enviar(e){
      e.preventDefault();
      const data = {
        nameSite: $('#nameSite').val(),
        //icon: 'logo',
        title: $('#title').val(),
        whatsapp: $('#whatsapp').val(),
        whatsappRev: "85987959500",
        plan1: $('#plan1').val(),
        priceplan1: $('#priceplan1').val(), 
        plan2: $('#plan2').val(),
        priceplan2: $('#priceplan2').val(), 
        plan3: $('#plan3').val(),
        priceplan3: $('#priceplan3').val(),
        pricereseller: '120',
        priceactive: '3,50',
        textHeader: $('#nameSite').val(),
        facebook:$('#facebook').val(),
        linkPanel: "https://deyler.xyz/"
    }
      const URL = 'https://backend-site-six.vercel.app/';
      $.ajax({
        url: URL,
        method: 'POST',
        data: data,
        success: function(data){
         swal('Cadastrado');
        }
      })
 
}

async function getData(e){
    e.preventDefault();
    const URL = "https://backend-site-six.vercel.app/"
    const data = { id: localStorage.getItem("id")};
    $.ajax({
      url: URL,
      method: 'GET',
      data: data,
      success: function(data){
        $('title').html(data[0].title);
        $('.namesite').html(data[0].namesite);
        $('.linkHome').html(data[0].textheader);
        $('.whatsapp').html( mask(data[0].whatsapp) );
        $('.panel').attr('href', data[0].linkpanel).attr('target', '_blank');
        for(let i=1;i<4;i++) {
            $(`.${`plano${i}`}`).html(`${data[0][`plan${i}`]}`);
            $(`.${`valPlano${i}`}`).html(`${data[0][`priceplan${i}`]}`);
        }
        $('.nameRev').html(data[0].namesite);
        $('.facebook').attr('href', data[0].facebook);
        $('.wspRev').html( mask(data[0].whatsapprev));
        $('.revWhatsapp').attr('href', `https://web.whatsapp.com//send?phone=55${data[0].whatsapprev}&text=${data[0].whatsapp}-Venho do site. Quero ser revendedor!`);
        $('.rev').html(data[0].pricereseller);
        $('.ativo').html(data[0].priceactive);
        $('.idUser').attr('value', data[0].id);
      }
    })
   
}

async function editar(e){
    e.preventDefault();
    const URL = "https://backend-site-six.vercel.app/update"
    const data = {         
        nameSite: $('#nameSite').val(),
        //icon: 'logo',
        title: $('#title').val(),
        whatsapp: $('#whatsapp').val(),
        whatsappRev: "85987959500",
        plan1: $('#plan1').val(),
        priceplan1: $('#priceplan1').val(), 
        plan2: $('#plan2').val(),
        priceplan2: $('#priceplan2').val(), 
        plan3: $('#plan3').val(),
        priceplan3: $('#priceplan3').val(),
        pricereseller: '120',
        priceactive: '3,50',
        textHeader: $('#nameSite').val(),
        facebook:$('#facebook').val(),
        linkPanel: "https://deyler.xyz/",
        idUser: localStorage.getItem("id")
    };

    $.ajax({
      url: URL,
      method: 'PATCH',
      data: data,
      success: function(data){
        setTimeout(()=>{
            swal('Dados Alterados');
            window.location.reload('/login.html')            
        }, 3000)
      }
    })
   
}


async function getDatas() {
    const URL = "https://backend-site-six.vercel.app"
    const request = await fetch(URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
    const data = await request.json();
    $('title').html(data[0].title);
    $('.namesite').html(data[0].namesite);
    $('.linkHome').html(data[0].textheader);
    $('.whatsapp').html( mask(data[0].whatsapp) );
    $('.panel').attr('href', data[0].linkpanel).attr('target', '_blank');
    for(let i=1;i<4;i++) {
        $(`.${`plano${i}`}`).html(`${data[0][`plan${i}`]}`);
        $(`.${`valPlano${i}`}`).html(`${data[0][`priceplan${i}`]}`);
    }
    $('.nameRev').html(data[0].namesite);
    $('.facebook').attr('href', data[0].facebook);
    $('.wspRev').html( mask(data[0].whatsapprev));
    $('.revWhatsapp').attr('href', `https://web.whatsapp.com//send?phone=55${data[0].whatsapprev}&text=${data[0].whatsapp}-Venho do site. Quero ser revendedor!`);
    $('.rev').html(data[0].pricereseller);
    $('.ativo').html(data[0].priceactive);
    $('.idUser').attr('value', data[0].id);
}


function mask(param){    
    const ddd = param.slice(0,2)
    const contato = param.slice(2)
    const telefone = `(${ddd}) ${contato}`
    return telefone;
}

async function testeIPTV(e){
    e.preventDefault();
   // Swal.fire("Olá Cliente!", "TESTE CRIADO", "info");
    const URL = "https://deyler.xyz/api/chatbot/RvWGv6lDe3/BV4D3rLaqZ";
    const criaTeste = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }
    })
    const response = await criaTeste.json();
    Swal.fire(response.reply);
    
}

function payment(){
    const host = window.location.host;
    const arrHost = []
    arrHost.push(host);
    if(arrHost.indexOf(host) != -1){
        Swal.fire("Olá Cliente!", "Área em desenvolvimento!", "info");
    }else{
        Swal.fire("Olá Cliente!", "Ja fez um teste", "warning");
    }
    console.log(arrHost);
   

}

async function sejaRevendedor(e){
    e.preventDefault();
    $('.panel').attr('href', data.linkPanel);
   // Swal.fire("Olá Cliente!", "Área em desenvolvimento!", "info");
   /* const whatsapp = await swal({
        text: 'Mande seu whatsapp que enviaremos mais informações.',
        content: "input",
        button: {
          text: "Enviar",
          closeModal: false,
        }
    })
    const URL = `https://web.whatsapp.com//send?phone=55${data.whatsapp}&text=${whatsapp}-Venho do site. Quero ser revendedor!`
    const request = await fetch(URL, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'strict-origin-when-cross-origin':'*',
            
          }
    });
    const response = await request.json();
    console.log(response); 
    */
}


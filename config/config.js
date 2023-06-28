const data = {
    nameRev: 'THPlayer Tv.',
    icon: 'logo',
    title: "THPlayer TV",
    whatsapp: "85982161439",
    revWhatsapp: "85987959500",
    plano1: "PLANO MENSAL",
    valPlano1: '30', 
    plano2: "PLANO TRIMESTRAL",
    valPlano2: '80', 
    plano3: "PLANO SEMESTRAL",
    valPlano3: '150',
    revenda: '120',
    ativo: '3,50',
    linkHome: "THPlayer TV",
    facebook: "https://www.facebook.com/profile.php?id=100091913952545",
    year: new Date().getFullYear(),
    linkPanel: "https://deyler.xyz/"

}

$(document).ready(function() {
    $('head').append(`<link rel="shortcut icon" href="assets/images/${data.icon}.png" type="image/x-icon">`)
    $('title').html(data.title);
    $('.payment').on('click', payment);
    $('.panel').attr('href', data.linkPanel).attr('target', '_blank');
    $('.wsp').attr("href", `https://api.whatsapp.com/send?phone=55${data.whatsapp}&text=Quero saber mais. venho do site.`);
    $('.wspRev').attr("href", `https://api.whatsapp.com/send?phone=55${data.revWhatsapp}&text=Venho do site. Quero ser Revendedor.`);
    $('.whatsapp').html( mask(data.whatsapp) );      
    $('.revWhatsapp').html( mask(data.revWhatsapp) );      
    for (let i = 1; i < 4; i++){
        $(`.${`plano${i}`}`).html(`${data[`plano${i}`]}`);
        $(`.${`valPlano${i}`}`).html(`${data[`valPlano${i}`]}`);
    } 
    $('.rev').html(data.revenda);
    $('.ativo').html(data.ativo);
    $('.linkHome').html(data.linkHome);
    $('.btnTeste1').on('click', testeIPTV)
    $('.facebook').attr('href', data.facebook);
    $('.year').html(data.year);
    $('.nameRev').html(data.nameRev);
})


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
   /*  Swal.fire({
        title: "Selecione o Horário",
        html: `
    <div class="swal2-container">
        <div style="display: flex; justify-content: center; align-items: center; width: 30%; margin-left:10px">
        <label for="">Hora Inicial</label>
            <select id="horainicioform" class="swal2-input" >
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
            </select>
        
        <label for="">Hora Final</label>
            <select id="horainicioform"  class="swal2-input">
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
            </select>
        </div>
    </div>
            `      
    })
 */
    

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


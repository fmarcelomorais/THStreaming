const data = {
    nameRev: 'TH-Streaming Tv.',
    icon: 'logo',
    title: "TH-Streaming TV",
    whatsapp: "85982161439",
    plano1: "PLANO MENSAL",
    valPlano1: '30', 
    plano2: "PLANO TRIMESTRAL",
    valPlano2: '80', 
    plano3: "PLANO SEMESTRAL",
    valPlano3: '170',
    revenda: '120',
    ativo: '3,50',
    linkHome: "TH STREAMING TV",
    facebook: "https://www.facebook.com/profile.php?id=100091913952545",
    year: "2023"

}

$(document).ready(function() {
    $('head').append(`<link rel="shortcut icon" href="assets/images/${data.icon}.png" type="image/x-icon">`)
    $('title').html(data.title);
    $('.panel').on('click', sejaRevendedor);
    $('.wsp').attr("href", `https://api.whatsapp.com/send?phone=55${data.whatsapp}&text=Quero saber mais. venho do site.`);
    $('.whatsapp').html( mask(data.whatsapp) );      
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

    const URL = "https://deyler.xyz/api/chatbot/RvWGv6lDe3/BV4D3rLaqZ";
    const criaTeste = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          }
    })
    const response = await criaTeste.json();
    swal(response.reply);
}

async function sejaRevendedor(e){
    e.preventDefault();
    swal("Olá Cliente!", "Área em desenvolvimento!", "info");
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


const texto = document.getElementById('texto')

texto.addEventListener('click', () => {
    if (texto.value == 'Este é um texto inicial que o usuário pode editar.') texto.value = ''          
})

const voltar = document.querySelector('back')


//funcções para formatacao de texto
function negrito(){
    texto.style.fontWeight = 'bold'
}

function italico(){
    texto.style.fontStyle = 'italic'
}
function sublinhado(){
    texto.style.textDecoration = 'underline'
}

function esquerda(){
    texto.style.textAlign = 'left'
}

function centro(){
    texto.style.textAlign = 'center'
}

function direita(){
    texto.style.textAlign = 'right'
}

function capitalize(){
    texto.style.textTransform ='capitalize'
}

function uppercase(){
    texto.style.textTransform ='uppercase'
}

function lowercase(){
    texto.style.textTransform = 'lowercase'
}

function limparTexto(){
    texto.style.fontWeight = 'normal'
    texto.style.fontStyle = 'normal'
    texto.style.textDecoration = 'none'
    texto.style.textAlign = 'left'
    texto.style.textTransform ='none' 
}


//GERAR PDF 
const gerarPdf = document.getElementById('pdf');
const data_atual = moment().format("DD/MM/YY")
const { jsPDF } = window.jspdf;

gerarPdf.addEventListener('click', () => {
    const idPacientes = document.querySelector('.leito').textContent
    let doc = new jsPDF();
    let maxWidth = doc.internal.pageSize.width - 20;
    
    
    doc.setDrawColor(0);
    doc.setFillColor(0, 156, 140);
    doc.rect(5, 5, 200, 30, "F");

    doc.setFontSize(20)
    doc.setTextColor(280, 280, 280)
    doc.text("EVOLUÇÃO NUTRICIONAL", 65, 17)
    
    

    doc.setFontSize(15)
    doc.setTextColor(280, 280, 280)
    doc.text("Data:", 65, 30)
    doc.text(data_atual, 80, 30)
    doc.text("Leito:", 120, 30)
    doc.text(idPacientes, 134, 30)
    
    doc.addImage("/img/index/logo.png ", "PNG", 10, 7.5, 25, 25);
    

    doc.setTextColor(0, 0, 0)
    
    let maintext = texto.value
    // Dividir o texto em várias linhas com base na largura máxima

    let lines = doc.splitTextToSize(maintext, maxWidth);
    
    // Definir a posição inicial
    let x = 10;
    let y = 50;
    
    // Adicionar as linhas ao PDF
    for (let i = 0; i < lines.length; i++) {
      doc.text(lines[i], x, y);
      y += 10; // Aumentar a posição vertical para a próxima linha
    }
    
    doc.save(`Evolução - Leito nº: ${idPacientes}.pdf`)
});


setTimeout(function () {
	const alert = document.querySelector(".alert")
	if (alert) alert.parentNode.removeChild(alert)
}, 1300); 
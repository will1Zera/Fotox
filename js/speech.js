let microphone = document.querySelector(".fa-microphone");
let button = document.querySelector(".search__btn");
let bar = document.querySelector(".search__bar");

// Consumindo api speech que captura a voz e transforma em texto

class speechApi{

    constructor(){

        const SpeechToText = window.SpeechRecognition ||
                                window.webkitSpeechRecognition;
        
        this.speechApi = new SpeechToText();
        this.output = bar.output;
        this.speechApi.continuous = true;
        this.speechApi.lang = "pt-BR";

        this.speechApi.onresult = e =>{
            var resultIndex = e.resultIndex;
            var transcript = e.results[resultIndex][0].transcript;

            bar.value += transcript;
        }
    }

    start(){
        this.speechApi.start();
    }
    
    stop(){
        this.speechApi.stop();
    }

};

var speech = new speechApi();

// Mecanismo inicia/para a gravação de voz, modifica cor do botão cinza/vermelho e muda o placeholder da search
 
button.addEventListener('click', () =>{
    if (button.name === 'start'){

        button.name = "stop";
        microphone.classList.add("red");
        bar.placeholder = "Fale agora, ouvindo...";
        speech.start();
    }else{

        button.name = "start";
        microphone.classList.remove("red");
        bar.placeholder = "Pesquise imagens";
        speech.stop();
    }
});





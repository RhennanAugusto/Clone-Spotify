const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const cover = document.getElementById('cover');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previus = document.getElementById('previus');
const currentProgress = document.getElementById('current-progress')
const progressContainer = document.getElementById('progress-container')
const shuffleButton = document.getElementById('shuffle')
const repeatButton = document.getElementById('repeat')
const likeButton = document.getElementById('like')

const doIWannaKnow = {
    songName: 'Do I Wanna Know',
    artist: 'Arctic Monkeys',
    file: 'arctic_monkeys'
};
const wonderWall = {
    songName: 'Wonderwal',
    artist: 'Oasis',
    file: 'oasis'
};
const paraQuemTemFe = {
    songName : 'Para quem tem fé',
    artist : 'O Rappa',
    file : 'rappa'
};
let isPlaying = false;
let isShuffle = false;
let repeatOn = false;
let liked = false;
const originalplaylist = [doIWannaKnow, wonderWall, paraQuemTemFe];
let sortedPlaylist = [...originalplaylist]; //esses pontinhos quer dizer que eu criei um conteudo igualzinho ao array original
let index = 0; 

function playSong(){
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');// aqui eu removo a classe bi , mas não removemos a tag , então a tag existe mas removendo a classe que é noso item.
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.add('bi-play-circle-fill');// aqui eu removo a classe bi , mas não removemos a tag , então a tag existe mas removendo a classe que é noso item.
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    if (isPlaying === true){
        pauseSong();
    }
    else{
        playSong();
    }
}

function initializeSong(){
    cover.src = `images/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`; 
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

function previusSong(){
    if (index === 0){
        index = sortedPlaylist.length - 1;
    }
    else{
        index -= 1 ; // o index decrementando 1 unidade dele mesmo
    }
    initializeSong();
    playSong();
    
}

function nextSong(){
    if (index === sortedPlaylist.length - 1){
        index = 0;
    }
    else{
        index += 1 ; // o index aumentando 1 unidade dele mesmo
    }
    initializeSong();
    playSong();
}

function updateSongBar(){
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);

}

function jumpTo(event){ // coloquei o evento pois ele vai me falar onde eu cliquei na barra de progresso e isso vai fazer eu ir para um determinado ponto da musica
    const width = progressContainer.clientWidth; // variavel da larguro da barra de progresso que modificamos para ficar mais facil ao usuario
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)* song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random()*size);  // usando biblioteca para retornar numeros aleatorios.
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;   
    }
}

function shuffleButtonClicked(){
    if(isShuffle === false){
        isShuffle = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } 
    else{
        isShuffle = false;
        sortedPlaylist = [...originalplaylist];
        shuffleButton.classList.remove('button-active');
    } 

}

function repeatButtonClicked(){
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active')

    }
    else{
        repeatOn = false;
        repeatButton.classList.remove('button-active')
    }

}

function nextOrRepeat(){
    if(repeatOn === false){
        nextSong();
    }
    else{
        playSong();
    }
}

function likeButtonClicked(){
    if(liked === false){
        liked = true;
        likeButton.classList.add('button-like')
    }
    else{
        liked = false;
        likeButton.classList.remove('button-like');
    }

}

initializeSong();

play.addEventListener('click', playPauseDecider);
previus.addEventListener('click',previusSong);
next.addEventListener('click',nextSong);
song.addEventListener('timeupdate',updateSongBar) //timeupdate fica me falando quanto tempo de musica passou
song.addEventListener('ended',nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click',shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked)
likeButton.addEventListener('click',likeButtonClicked)



import { getalbum } from "./spotify";
import { fetchDataFromWorker } from "./script";

export async function getdata_spotify(){ 
    let data = await fetchDataFromWorker();

    let newcontent;

    let spotify_item1 = document.getElementById("spotifyicon");
    let spotify_item2 = document.getElementById("spotifydata");
    let spotify_item3 = document.getElementById("main_playlist");

    spotify_item1.style.backgroundImage = "url('"+data.spotify.pfp[1].url+"')";

    newcontent = document.createElement("p");
    newcontent.textContent = newcontent.textContent + data.spotify.userName;
    spotify_item2.appendChild(newcontent);

    newcontent = document.createElement("a");
    newcontent.textContent = "come visit my spotify here!";
    newcontent.href = data.spotify.link.spotify;
    spotify_item2.appendChild(newcontent);

    spotify_item3.src = "https://open.spotify.com/embed/playlist/"+data.spotifyplaylist+"?utm_source=generator&theme=1";
}

export async function getdata_current(host){ 
    let data = await fetchDataFromWorker();

    if (typeof data.lastfm['@attr'] !== 'undefined'){
        host.style.display = "block";
        
        let newcontent;

        let current_item1 = document.getElementById("currenticon");
        let current_item2 = document.getElementById("currentdata");
        let current_item3 = document.getElementById("albumname");
        let current_item5 = document.getElementById("albumembed");

        current_item1.style.backgroundImage = "url('"+data.lastfm.image[3]['#text']+"')";

        newcontent = document.createElement("p");
        newcontent.textContent = data.lastfm.name + "- by -" + data.lastfm.artist['#text'];
        current_item2.appendChild(newcontent);

        current_item3.textContent = current_item3.textContent + data.lastfm.album['#text'];

        let albumdata = await getalbum(data.lastfm.album['#text'], data.lastfm.artist['#text']);

        current_item5.src = "https://open.spotify.com/embed/album/" + albumdata.song + "?utm_source=generator&theme=1";

        item2.append(current_item5);
    }
    else host.style.display = "none";

}

export function timer(){
    let countDownDate = new Date(Date.UTC (2024, 5, 21, 14, 55, 0)).getTime();
    timercheck("days","hours","minutes","seconds","free",countDownDate,"im free?");
}

export function timercheck(id1, id2, id3, id4, id5, date, message){
    let html_days = document.getElementById(id1);
    let html_hours = document.getElementById(id2);
    let html_minutes = document.getElementById(id3);
    let html_seconds = document.getElementById(id4);
    let html_free = document.getElementById(id5);

    let x3 = setInterval(function(){
        let now = new Date().getTime();
        let distance = date - now;
    
        if (distance > 0){
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            html_days.innerHTML = days
            html_hours.innerHTML = hours
            html_minutes.innerHTML = minutes
            html_seconds.innerHTML = seconds
        } if (distance = 0 || distance < 0){
            html_days.innerHTML = 0
            html_hours.innerHTML = 0
            html_minutes.innerHTML = 0
            html_seconds.innerHTML = 0
            html_free.innerHTML = (message)
        }
    },1000);
}
import { gethub } from "./github";
import { getdata_spotify } from "./extrajs/main";
import { getdata_current } from "./extrajs/main";
import { timer } from "./extrajs/main";

let item1 = document.getElementById("item1");
let item2 = document.getElementById("item2");
let item3 = document.getElementById("item3");
let item4 = document.getElementById("item4");

let amount = 4;

let random1 = Math.floor(Math.random() * amount);
let random2 = Math.floor(Math.random() * amount);
while (random2 === random1) random2 = Math.floor(Math.random() * amount);
let random3 = Math.floor(Math.random() * amount);
while (random3 === random1 || random3 === random2) random3 = Math.floor(Math.random() * amount);

if (random1 == 0 || random2 == 0)item1.style.display = "block"; getdata_spotify();
if (random1 == 1 || random2 == 1)getdata_current(item2);
if (random1 == 2 || random2 == 2)item3.style.display = "block"; gethub(item3);
if (random1 == 3 || random2 == 3)item4.style.display = "block"; timer();
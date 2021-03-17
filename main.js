/*function dasshutsu(str){
  var output = str
  output = output.replace(/\\/g,"\\\\")
  output = output.replace(/[\u2018\u2019]/g, "'")
  output = output.replace(/[\u201C\u201D]/g, '"');
  output = output.replace(/\"/g,"\\\"")
  output = output.replace(/\'/g,"\\\'")
  output = output.replace(/\//g,"\\\/")
  output = output.replace(/\&/g,"\\\&")
//  output = output.replace(/\n/g,"\\n")
  return output
}*/

var Table = document.getElementById("table");
var Solvent = document.getElementById("solvent");
var Field = document.getElementById("B");
var Outbox= document.getElementById("outbox");
var rows = 1

function write(){
  var summary_text="¹H NMR";
  summary_text+=" ("+Field.value+" MHz, "+Solvent.value+") δ ";


    for(k=1;k<=rows;k++){
      summary_text+=document.getElementById("ppm"+k).value.replace(/-/g,"—");
      summary_text+=" ("+document.getElementById("S"+k).value;
      if(document.getElementById("J"+k).value!==""){
        summary_text+=", 𝘑 = "+document.getElementById("J"+k).value+" Hz";
      }
      summary_text+=", "+document.getElementById("I"+k).value+" H) ";
    }

  summary_text=summary_text.slice(0,-1)
  summary_text+="."
  Outbox.value = summary_text
}

/*function vetname(element){
    element.value=element.value.replace(/[.*+\'\"?^${}()|[\]\\]/g,"")
    element.value=element.value.replace(/ /g,"")
    for(j=0;j<10;j++){
      while(element.value.indexOf(j)==0){
        element.value=element.value.slice(1)
      }
    }
    element.value=element.value.toLowerCase()
}

function vetnames(){
    vetname(Name)
  for(k=1;k<=nC;k++){
    vetname(document.getElementById("outcome"+k))
  }
}*/

function addchoices(){
  for(k=1;k<=rows;k++){
    document.getElementById("ppm"+k).innerHTML=document.getElementById("ppm"+k).value
    document.getElementById("S"+k).innerHTML=document.getElementById("S"+k).value
    document.getElementById("J"+k).innerHTML=document.getElementById("J"+k).value
    document.getElementById("I"+k).innerHTML=document.getElementById("I"+k).value
  }
  rows++
  table.innerHTML+="<tr><td>"+rows+"</td><td><textarea id=\"ppm"+rows+"\"></textarea></td><td><textarea id=\"S"+rows+"\"></textarea></td><td><textarea id=\"J"+rows+"\"></textarea></td><td><textarea id=\"I"+rows+"\"></textarea></td></tr>"
}


//document.addEventListener("keyup",vetnames)
document.addEventListener("keyup",write)
document.addEventListener("click",write)
document.getElementById("addchoice").addEventListener("click",addchoices)

var Outbox= document.getElementById("outbox");

/*=================================================================================
                              CODE THAT DEALS WITH
                        TOGGLING DIFFERENT PARTS OF THE SI
=================================================================================*/
var checkbox={
  _procedure:document.getElementById("check_procedure"),
  _1h:document.getElementById("check_1h"),
  _13c:document.getElementById("check_13c"),
  _ir:document.getElementById("check_ir"),
}
var containers={
  _procedure:document.getElementById("procedure"),
  _1h:document.getElementById("1H-NMR"),
  _13c:document.getElementById("13C-NMR"),
  _ir:document.getElementById("IR")
}
containers_display=function(){
  for(key in containers){
    if(checkbox[key].checked){
      containers[key].style.display="inline";
    } else {
      containers[key].style.display="none";
    }
  }
}
containers_display();

/*=================================================================================
                                      PROCEDURE
                        OBJECTS, METHODS, AND VARIABLES
=================================================================================*/
var procedures={selector:document.getElementById("proc_select")}
procedures.formation={
  X:document.getElementById("proc_form_X"),
  X_calc:document.getElementById("proc_form_Xcalc"),
  X_amount:document.getElementById("proc_form_Xamt"),
  Y:document.getElementById("proc_form_Y"),
  Y_calc:document.getElementById("proc_form_Ycalc"),
  Y_amount:document.getElementById("proc_form_Yamt"),
  mass:document.getElementById("proc_form_mass"),
  yield:document.getElementById("proc_form_yield"),
  physical:document.getElementById("proc_form_physchar"),
}
procedures.formation.write=function(){
  var str = "The general procedure was used for the formation of the title compound, starting from "+this.X.value+" ("+this.X_calc.value+", "+this.X_amount.value+") and "+this.Y.value+" ("+this.Y_calc.value+", "+this.Y_amount.value+"). This procedure afforded "+this.mass.value+" ("+this.yield.value+"% overall yield) of the title compound as a "+this.physical.value+". "
  return str
}


/*=================================================================================
                                  NMR
                      OBJECTS, METHODS, AND VARIABLES
=================================================================================*/

var proton={
  table:document.getElementById("H_table"),
  solvent:document.getElementById("H_solvent"),
  field:document.getElementById("H_B"),
  rows:1
}

var carbon={
  table:document.getElementById("C_table"),
  solvent:document.getElementById("C_solvent"),
  field:document.getElementById("C_B"),
  rows:1
}

proton.addrow=function(){
  for(h=1;h<=proton.rows;h++){
    document.getElementById("H_ppm"+h).innerHTML=document.getElementById("H_ppm"+h).value
    document.getElementById("H_S"+h).innerHTML=document.getElementById("H_S"+h).value
    document.getElementById("H_J"+h).innerHTML=document.getElementById("H_J"+h).value
    document.getElementById("H_I"+h).innerHTML=document.getElementById("H_I"+h).value
  }
  proton.rows++
  proton.table.innerHTML+="<tr><td>"+proton.rows+"</td><td><textarea id=\"H_ppm"+proton.rows+"\"></textarea></td><td><textarea id=\"H_S"+proton.rows+"\"></textarea></td><td><textarea id=\"H_J"+proton.rows+"\"></textarea></td><td><textarea id=\"H_I"+proton.rows+"\"></textarea></td></tr>"
}

carbon.addrow=function(){
  for(c=1;c<=carbon.rows;c++){
    document.getElementById("C_ppm"+c).innerHTML=document.getElementById("C_ppm"+c).value
    document.getElementById("C_S"+c).innerHTML=document.getElementById("C_S"+c).value
    document.getElementById("C_J"+c).innerHTML=document.getElementById("C_J"+c).value
  }
  carbon.rows++
  carbon.table.innerHTML+="<tr><td>"+carbon.rows+"</td><td><textarea id=\"C_ppm"+carbon.rows+"\"></textarea></td><td><textarea id=\"C_S"+carbon.rows+"\"></textarea></td><td><textarea id=\"C_J"+carbon.rows+"\"></textarea></td></tr>"
}

document.getElementById("H_addrow").addEventListener("click",proton.addrow)
document.getElementById("C_addrow").addEventListener("click",carbon.addrow)



/*=================================================================================

                          FUNCTION THAT WRITES THE SI

=================================================================================*/

function write(){
  var summary_text="";

/*===================================PROCEDURE=====================================*/
  if(checkbox._procedure.checked){
    switch(procedures.selector.value){
      case "formation":
        summary_text+=procedures.formation.write()
        break;
        case "coupling":
        break;
        default:
      }
    }
/*===================================1H-NMR=======================================*/
  if(checkbox._1h.checked){
    summary_text+="<sup>1</sup>H NMR";
    summary_text+=" ("+proton.field.value+" MHz, "+proton.solvent.value+") δ ";

      for(h=1;h<=proton.rows;h++){
        summary_text+=document.getElementById("H_ppm"+h).value.replace(/-/g,"—");
        summary_text+=" ("+document.getElementById("H_S"+h).value;
        if(document.getElementById("H_J"+h).value!==""){
          summary_text+=", <i>J</i> = "+document.getElementById("H_J"+h).value+" Hz";
        }
        summary_text+=", "+document.getElementById("H_I"+h).value+" H) ";
      }

      summary_text=summary_text.slice(0,-1)
      summary_text+="; "
    }

/*==================================13C-NMR=======================================*/
  if(checkbox._13c.checked){
    summary_text+="<sup>13</sup>C NMR";
    summary_text+=" ("+carbon.field.value+" MHz, "+carbon.solvent.value+") δ ";

      for(c=1;c<=carbon.rows;c++){
        summary_text+=document.getElementById("C_ppm"+c).value.replace(/-/g,"—");

        if(document.getElementById("C_S"+c).value!==""){
          summary_text+=" ("+document.getElementById("C_S"+c).value;
          if(document.getElementById("C_J"+c).value!==""){
            summary_text+=", <i>J</i><sub>CF</sub> = "+document.getElementById("C_J"+c).value+" Hz";
          }
          summary_text+=")"
        }
        summary_text+=", "
      }

      summary_text=summary_text.slice(0,-2)
      summary_text+=". "
    }


/*===================================OUTPUT=======================================*/

  Outbox.innerHTML = summary_text
}


document.addEventListener("keyup",write)
carbon.solvent.addEventListener("click",write)
proton.solvent.addEventListener("click",write)
for(key in checkbox){
  checkbox[key].addEventListener("click",write)
  checkbox[key].addEventListener("click",containers_display)
}

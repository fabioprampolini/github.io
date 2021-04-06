// JavaScript Document
// il JS parte quando la pagina è pronta -->


      function jsonCall() {
        // il cancelletto trova gli oggetti che hanno l'id Nome -->
        $("#output").val("");

        // Chiamata AJAX al web service che restituisce il file di -->

        //questa variabile prende il valore contenuto nel tag che ha come id WebService -->

        // definizione di un oggetto -->
        var parameters={
          APPID: "754f8369e6d2cb35905087e26e4d064a",
          q:$("#Citta").val(),
          units:$("#misura").val(),
		  lang: "it"
        };
        var webService="http://api.openweathermap.org/data/2.5/forecast";


        $.getJSON(webService,parameters,function(data) {
          // messaggio di successo -->
          console.log("Call succedeed");
          // chiamo la funzione che gestisce i dati -->
          manageResponseData(data);

        }
      )
      .error(function(jqXHR, textStatus, errorThrow) {
      //funzione eseguita automaticamente in caso di errore
        //errorThrow è il messaggio di errore del sistem: es. Not Found -->
        console.log("ERRORE: " + errorThrow);
        $("#Citta").val(errorThrow);
        $("#misura").val(errorThrow);
        $("#output").val(errorThrow);

        //messaggio pop-up di errore
        alert("ERRORE: " + errorThrow);
      });
}
      //funzione che elabora i dati
      function manageResponseData(data) {
        //se trova "data"
        if (data) {
          // assegna i valori del documento json ai campi del file html -->
          $("#Citta").val(data.city.name);
          //$("#misura").val();
          var altri="";
          var generalitaa="";
			var data_giorno=data.list[0].dt_txt;
			var output=[];
			var datav=[];
			var ind=0;
			
			var sub1;
			var sub2;
			
			datav[0]=data_giorno;

          generalitaa+="Città:    "+data.city.name+"\n"+"Nazione:    "+data.city.country+"\n"+
          "Latitudine:    "+data.city.coord.lat+"°"+"\n"+"Longitudine:    "+data.city.coord.lon+"°"+"\n";
			
			if($("#misura").val()==="metric"){
					for (var i=0;i<data.list.length;i++)
					{
						sub1=data_giorno.substring(0,10);
						sub2=data.list[i].dt_txt.substring(0,10);
						if(sub1!==sub2)
							{
								output[ind]=altri;
								datav[ind]=sub1;
								ind++;
								altri="";
							}
							
						data_giorno=data.list[i].dt_txt;	
						altri+=data.list[i].dt_txt.substring(11,19)+"\n"+"Temperatura:    "+data.list[i].main.temp+"°C"+"\n"+"Descrizione:    "+data.list[i].weather[0].description+"\n"+"Velocità vento:    "+data.list[i].wind.speed+" m/s"+"\n"+"\n"+"\n";
					}
				} else if($("#misura").val()==="imperial"){
					for (var j=0;j<data.list.length;j++)
					{
						sub1=data_giorno.substring(0,10);
						sub2=data.list[j].dt_txt.substring(0,10);
						if(sub1!==sub2)
							{
								output[ind]=altri;
								datav[ind]=sub1;
								ind++;
								altri="";
							}
						
						data_giorno=data.list[j].dt_txt;	
						altri+=data.list[j].dt_txt.substring(11,19)+"\n"+"Temperatura:    "+data.list[j].main.temp+"°F"+"\n"+"Descrizione:    "+data.list[j].weather[0].description+"\n"+"Velocità vento:    "+data.list[j].wind.speed+" miles/s"+"\n"+"\n"+"\n";
					}
				}
          
		  $("#generalita").val(generalitaa);
          $("#d1").val(datav[0]);
			$("#d2").val(datav[1]);
			$("#d3").val(datav[2]);
			$("#d4").val(datav[3]);
			$("#d5").val(data_giorno.substring(0,10));
			$("#o1").val(output[0]);
			$("#o2").val(output[1]);
			$("#o3").val(output[2]);
			$("#o4").val(output[3]);
			$("#o5").val(altri);
        }
      }

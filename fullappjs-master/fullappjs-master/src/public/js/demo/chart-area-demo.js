
// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';



function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
var cat = localStorage.getItem('miGato');
var objetoObtenido = JSON.parse(cat);
/*if("miGato" in localStorage){   
  localStorage.removeItem("miGato")
   var cat = localStorage.getItem('miGato');
    var objetoObtenido = JSON.parse(cat);  }
     else {
     var cat = localStorage.getItem('miGato');
      var objetoObtenido = JSON.parse(cat);  }*/
//console.log(cat[0].peso);
//console.log(objetoObtenido[0].PorcentajeGrasa);
// Area Chart Example
var l=[];
for(var i=0;i<12;i++){
   if(objetoObtenido[i]==null){
    objetoObtenido[i]="VACIO"  
  }
  }
for(var i=0;i<12;i++){
  l[i]=0;  
  }  
for(var i=0;i<12;i++){

if(objetoObtenido[i].mes=="Enero"&&objetoObtenido[i]!="VACIO"){     
  l[0]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Febrero"&&objetoObtenido[i]!="VACIO"){     
  l[1]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Marzo"&&objetoObtenido[i]!="VACIO"){     
  l[2]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Abril"&&objetoObtenido[i]!="VACIO"){     
  l[3]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Mayo"&&objetoObtenido[i]!="VACIO"){     
  l[4]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Junio"&&objetoObtenido[i]!="VACIO"){     
  l[5]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Julio"&&objetoObtenido[i]!="VACIO"){     
  l[6]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Agosto"&&objetoObtenido[i]!="VACIO"){     
  l[7]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Setiembre"&&objetoObtenido[i]!="VACIO"){     
  l[8]= parseInt(objetoObtenido[i].peso) 
}
if(objetoObtenido[i].mes=="Octubre"&&objetoObtenido[i]!="VACIO"){     
  l[9]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Noviembre"&&objetoObtenido[i]!="VACIO"){     
  l[10]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
if(objetoObtenido[i].mes=="Diciembre"&&objetoObtenido[i]!="VACIO"){     
  l[11]= parseInt(objetoObtenido[i].PorcentajeGrasa) 
}
}
for(var i=0;i<12;i++){
  console.log(objetoObtenido[i].mes);
  }

  
var ctx = document.getElementById("myAreaChart");
if(ctx!=null){
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [{
      label: "Perdidad de grasa",
      lineTension: 0.3,
      backgroundColor: "rgba(78, 115, 223, 0.05)",
      borderColor: "rgba(78, 115, 223, 1)",
      pointRadius: 3,
      pointBackgroundColor: "rgba(78, 115, 223, 1)",
      pointBorderColor: "rgba(78, 115, 223, 1)",
      pointHoverRadius: 3,
      pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
      pointHoverBorderColor: "rgba(78, 115, 223, 1)",
      pointHitRadius: 10,
      pointBorderWidth: 2,
      data: [l[0], l[1], l[2], l[3], l[4], l[5], l[6], l[7], l[8], l[9], l[10], l[11]],
    }],
  },
  options: {
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 10,
        right: 25,
        top: 25,
        bottom: 0
      }
    },
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false,
          drawBorder: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          maxTicksLimit: 5,
          padding: 10,
          // Include a dollar sign in the ticks
          callback: function(value, index, values) {
            return '%' + number_format(value);
          }
        },
        gridLines: {
          color: "rgb(234, 236, 244)",
          zeroLineColor: "rgb(234, 236, 244)",
          drawBorder: false,
          borderDash: [2],
          zeroLineBorderDash: [2]
        }
      }],
    },
    legend: {
      display: false
    },
    tooltips: {
      backgroundColor: "rgb(255,255,255)",
      bodyFontColor: "#858796",
      titleMarginBottom: 10,
      titleFontColor: '#6e707e',
      titleFontSize: 14,
      borderColor: '#dddfeb',
      borderWidth: 1,
      xPadding: 15,
      yPadding: 15,
      displayColors: false,
      intersect: false,
      mode: 'index',
      caretPadding: 10,
      callbacks: {
        label: function(tooltipItem, chart) {
          var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
          return datasetLabel + ': %' + number_format(tooltipItem.yLabel);
        }
      }
    }
  }
});
}

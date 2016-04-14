/*
Scott Kinder
*/

"use strict";

(function() {

	$(document).ready(function() {
		$("#first").on("click", function() {
			$.fn.displayGraph(1);
		});

		$("#second").on("click", function() {
			$.fn.displayGraph(2);
		});

		$("#third").on("click", function() {
			$.fn.displayGraph(3);
		});
	});


	$.fn.displayGraph = function(exNumber) {
		$.ajax({
			url: 'vizajax.php',
			type: 'post',
			data: { "example": "" + exNumber},
			success: function(data)
			{
				//$('#content').fadeOut(800, function() {
				$("#content").html(data);
				if (exNumber == 1) {
					//$.fn.boxPlot();
					$.fn.initializePlot('boxplot');
				} else if (exNumber == 2) {
					$.fn.initializePlot('3dplot');
				} else {
					$.fn.initializePlot('scatterbubbles');
				}
				//$("#content").fadeIn(800);

			},
			error: function()
			{
				alert('something is wrong');
			}
		});
	};

	$.fn.initializePlot = function(plotType) {
		Plotly.d3.csv("https://raw.githubusercontent.com/kinderst/Visualization_Design/master/antibiotics_data.csv", function(data) { $.fn.processData(data, plotType) } );
	};

	
	$.fn.processData = function(allRows, graphType) {
		var x = [];
		var yPen = [];
		var yStr = [];
		var yNeo = [];
		for (var i=0; i<allRows.length; i++) {
			var row = allRows[i];
			x.push(row['Gram Staining ']);
			yPen.push(row['Penicilin']);
			yNeo.push(row['Neomycin']);
			yStr.push(row['Streptomycin ']);
		}

		if (graphType == 'boxplot') {
			$.fn.makeScatterBoxPlot(x, yPen, 'Penicilin', 'graphone');
			$.fn.makeScatterBoxPlot(x, yStr, 'Streptomycin', 'graphtwo');
			$.fn.makeScatterBoxPlot(x, yNeo, 'Neomycin', 'graphthree');
		} else {
			var penPos = [];
			var penNeg = [];
			var strPos = [];
			var strNeg = [];
			var neoPos = [];
			var neoNeg = [];
			for (var i = 0; i < x.length; i++) {
				if (x[i] == 'positive') {
					penPos.push(yPen[i]);
					strPos.push(yStr[i]);
					neoPos.push(yNeo[i]);
				} else {
					penNeg.push(yPen[i]);
					strNeg.push(yStr[i]);
					neoNeg.push(yNeo[i]);
				}
			}
			if (graphType == '3dplot') {
				$.fn.make3dPlot(penPos, penNeg, strPos, strNeg, neoPos, neoNeg);
			} else {
				$.fn.makeScatterBubblePlot(penPos, penNeg, strPos, strNeg, neoPos, neoNeg);
			}
		}
	};

	$.fn.makeScatterBoxPlot = function(x, y, type, graphName) {
		var xData = ['Negative', 'Positive'];
		var yDataNegative = [];
		var yDataPositive = [];
		for (var i = 0; i < x.length; i++) {
			if (x[i] == 'positive') {
				yDataPositive.push(Math.log(y[i]));
			} else {
				yDataNegative.push(Math.log(y[i]));
			}
		}
		
		var yData = [yDataNegative, yDataPositive];
		var data = [];
		for ( var i = 0; i < xData.length; i++ ) {
			var result = {
				type: 'box',
				y: yData[i],
				name: xData[i],
				boxpoints: 'all',
				jitter: 0.25,
				whiskerwidth: 0.2,
				fillcolor: 'cls',
				marker: {
					size: 5
				},
				line: {
					width: 1
				}
			};
			data.push(result);
		}

		var layout = {
			title: '' + type + ' MIC Vs. Gram Staining Positive and Negative',
			yaxis: {
				title: '' + type + ' MIC (log transformed)',
				autorange: true,
				showgrid: true,
				zeroline: true,
				dtick: 2,
				gridcolor: 'rgb(255, 255, 255)',
				gridwidth: 1,
				zerolinecolor: 'rgb(255, 255, 255)',
				zerolinewidth: 2
			},
			xaxis: {
				title: 'Gram Staining'
			},
			margin: {
				l: 40,
				r: 30,
				b: 80,
				t: 100
			},
			paper_bgcolor: 'rgb(243, 243, 243)',
			plot_bgcolor: 'rgb(243, 243, 243)',
			width: 1000,
			height: 600,
			showlegend: false
		};

		Plotly.newPlot(graphName, data, layout, {staticPlot: true});
	};

	$.fn.make3dPlot = function(penPos, penNeg, strPos, strNeg, neoPos, neoNeg) {
		var data = [{
	        x: penPos,
	        y: strPos,
	        z: neoPos,
	        jitter: 100,
	        name: 'Positive Gram Staining',
	        mode: 'markers',
	        type: 'scatter3d',
	        marker: {
	          color: 'rgb(0, 0, 255)',
	          size: 6
	        }
	    },{
	        x: penNeg,
	        y: strNeg,
	        z: neoNeg,
	        name: 'Negative Gram Staining',
	        mode: 'markers',
	        jitter: 100,
	        type: 'scatter3d',
	        marker: {
	          color: 'rgb(255, 0, 0)',
	          size: 6
	        }
	    }];

	    var layout = {
	        autosize: true,
	        height: 480,
	        scene: {
	            aspectratio: {
	                x: 1,
	                y: 1,
	                z: 1
	            },
	            camera: {
	                center: {
	                    x: 0,
	                    y: 0,
	                    z: 0
	                },
	                eye: {
	                    x: 1.75,
	                    y: 1.75,
	                    z: 1.25
	                },
	                up: {
	                    x: 0,
	                    y: 0,
	                    z: 1
	                }
	            },
	            xaxis: {
	                type: 'linear',
	                zeroline: false,
	                title: 'Penicilin MIC'
	            },
	            yaxis: {
	                type: 'linear',
	                zeroline: false,
	                title: 'Streptomycin MIC'
	            },
	            zaxis: {
	                type: 'linear',
	                zeroline: false,
	                title:'Neomycin MIC'
	            }
	        },
	        title: '3d scatter plot of Penicilin, Streptomycin, and Neomycin MIC',
	        width: 600
	    };

    	Plotly.newPlot('graph', data, layout);
	};

	$.fn.makeScatterBubblePlot = function(penPos, penNeg, strPos, strNeg, neoPos, neoNeg) {
		var penPosMultiplied  = penPos.map(function(x) { return (x * 100000); });
		var penPosMultipliedLog = penPosMultiplied.map(function(x) { return Math.log(x); });
		var penPosMultipliedLogMultiplied = penPosMultipliedLog.map(function(x) { return (x * 5); });

		var strPosLog = strPos.map(function(x) { return Math.log(x); });

		var neoPosLog = neoPos.map(function(x) { return Math.log(x); });

		console.log(penPosMultipliedLog);
		var trace1 = {
			x: strPosLog,
			y: neoPosLog,
			name: 'Positive',
			mode: 'markers',
			marker: {
				color: 'rgb(0, 0, 255)',
				opacity: 0.5,
				size: penPosMultipliedLogMultiplied
			}
		};

		var penNegMultiplied  = penNeg.map(function(x) { return (x * 100000); });
		var penNegMultipliedLog = penNegMultiplied.map(function(x) { return Math.log(x); });
		var penNegMultipliedLogMultiplied = penNegMultipliedLog.map(function(x) { return (x * 5); });

		var strNegLog = strNeg.map(function(x) { return Math.log(x); });

		var neoNegLog = neoNeg.map(function(x) { return Math.log(x); });

		var trace2 = {
			x: strNeg,
			y: neoNeg,
			name: 'Negative',
			mode: 'markers',
			marker: {
				color: 'rgb(255, 0, 0)',
				opacity: 0.5,
				size: penNegMultipliedLogMultiplied
			}
		};

		var data = [trace1, trace2];

		var layout = {
			title: 'Marker Size and Color',
			showlegend: true,
			height: 600,
			width: 600,
			yaxis: {
				title: 'Neomycin MIC (log transformed)',
				autorange: true,
				showgrid: true,
				zeroline: true,
				dtick: 2,
				gridcolor: 'rgb(255, 255, 255)',
				gridwidth: 1,
				zerolinecolor: 'rgb(255, 255, 255)',
				zerolinewidth: 2
			},
			xaxis: {
				title: 'Streptomycin MIC (log transformed)',
				autorange: true,
				showgrid: true,
				zeroline: true,
				dtick: 2,
				gridcolor: 'rgb(255, 255, 255)',
				gridwidth: 1,
				zerolinecolor: 'rgb(255, 255, 255)',
				zerolinewidth: 2
			},
		};

		Plotly.newPlot('graph', data, layout, {staticPlot: true});
		};
	
})();
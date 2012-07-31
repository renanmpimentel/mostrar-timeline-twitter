function twitterTimeline(username, count){
	
    //URL QUE RETORNA A INFORMAÇÃO
	// var url = 'http://search.twitter.com/search.json?callback=?&rpp='+ count +'&q=from:'+ username;
    var url = 'http://search.twitter.com/search.json?callback=?&rpp='+ count +'&q='+ username;
	
    //TELA ANTES DE CARREGAR O APP
	var loading = $("<div class='carregando-sistema'>Carregando...<\/div>");
	
	$("#twitter").append(loading);
	
	$.getJSON(url,function(data){
		$("#twitter").empty();
		$.each(data.results, function(i, obj){
			if(i == 0){
				$("#twitter").prepend('<ul class="tweet-list"><li class="tweet-content-' + i + '">' + obj.profile_image_url.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<div class="float-imagem"><img src="$&" class="imagem-profile" \/> <\/div>'));
			}else{
				$('.tweet-list').append('<li class="tweet-content-' + i + '">' + obj.profile_image_url.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<div class="float-imagem"><img src="$&" class="imagem-profile" \/> <\/div>'));
			}
			$('.tweet-content-' + i + '').append('<p class="tweet-link-' + i + ' texto">' + obj.text.replace(/#(.*?)(\s|$)/g, '<span class="hash">#$1 <\/span>').replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, '<a href="$&">$&<\/a> ').replace(/@(.*?)(\s|\(|\)|$)/g, '<a href="http://twitter.com/$1" class="user-twitter">@$1 <\/a>$2'), '<div class="time">'+H(this.created_at)+'<\/div>');
		});
	});
	
	$("h1").append(' @' + username);
}

var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();
 
var H = function (a) {
    var b = new Date();
    var c = new Date(a);
    if (K.ie) {
        c = Date.parse(a.replace(/( \+)/, ' UTC$1'))
    }
    var d = b - c;
    var e = 1000,
        minute = e * 60,
        hour = minute * 60,
        day = hour * 24,
        week = day * 7;
    if (isNaN(d) || d < 0) {
        return ""
    }
    if (d < e * 7) {
        return "agora"
    }
    if (d < minute) {
        return Math.floor(d / e) + " segundos atrás"
    }
    if (d < minute * 2) {
        return "1 minuto atrás"
    }
    if (d < hour) {
        return Math.floor(d / minute) + " minutos atrás"
    }
    if (d < hour * 2) {
        return "1 hora atrás"
    }
    if (d < day) {
        return Math.floor(d / hour) + " horas atrás"
    }
    if (d > day && d < day * 2) {
        return "ontem"
    }
    if (d < day * 365) {
        return Math.floor(d / day) + " dias atrás"
    } else {
        return "mais de um ano atrás"
    }

};


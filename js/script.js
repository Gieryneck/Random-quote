// Pierwszy link jest standardowym linkiem do wysyłania tweetów na 
// Twittera - jedyne, czego mu brakuje, to samej treści tweeta, którą będziemy dodawać na końcu po znaku =

var tweetLink = 'https://twitter.com/intent/tweet?text=',
	quoteUrl = 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
	$button = $('.trigger');
/* 
$button.click(function() {

	getQuote();
});
*/

$button.click(getQuote);





function getQuote() {

	var prefix = "https://cors-anywhere.herokuapp.com/"; 
	// jakis problem z Cross-Origin Resource Sharing bedzie, jak dodamy do url ten prefix to problem zniknie

	$.ajaxSetup({ cache: false });   // cache : A Boolean value indicating whether the browser should cache the requested pages. Default is 'true'. 
									// Nie chcemy zeby browser zapamietywal odpowiedzi serwera, wiec ustawiamy na 'false'


	$.getJSON(prefix + quoteUrl, createTweet); 

	/* 
		metoda getJSON działa w ten sposób że sama z siebie zwraca odpowiedź serwera do callback function ('createTweet'). 
		odpowiedź serwera będzie parametrem fcji callback, nazwiemy ten parametr 'input'
	*/
}






getQuote(); 







function createTweet(input) {

	var data = input[0];
	/* 
		jak wejdziemy na quoteUrl to w dev tools zobaczymy że odpowiedź serwera jest tablicą 
		posiadajaca tylko jeden indeks  - [0]. ten indeks jest obiektem o atrybutach i wartosciach np.:

		ID: 1154
		content: "<p>Never offend people with style when you can offend them with substance.  </p>↵"
		link: "https://quotesondesign.com/sam-brown/"
		title: "Sam Brown"

		ten własnie obiekt zapisalismy w var = data
	*/

	var quoteText = $(data.content).text().trim();

	/* 
		$(data.content) to <p>Never offend people with style when you can offend them with substance.</p>
		wrapniety w jquery. nie chcemy tagow w tekscie wiec wyciagamy z niego text() oraz przycinamy 
		whitespaces na poczatku i koncu tekstu za pomoca trim()
	*/

	var quoteAuthor = data.title;

	if (!quoteAuthor.length) { 

		quoteAuthor = 'Unknown author';

		/* 

			jesli data.title bedzie pusty to length = 0 bedzie zinterpretowane jako 'false'
			(bo quoteAuthor nie posiada w tym wypadku dlugosci).
			! odwroci 'false' na 'true'.
		
		*/
	}


	var tweetText = 'Quote of the day - ' +  quoteText + ' Author: ' + quoteAuthor;

	if (tweetText.length > 140) {

		getQuote();

	} else {

		var tweet = tweetLink + encodeURIComponent(tweetText); 
		//tweetLink = 'https://twitter.com/intent/tweet?text='

		$('.quote').text(quoteText);
		$('.author').text('Author: ' + quoteAuthor);
		$('.tweet').attr('href', tweet); // przypisujemy atrybutowi href wartosc zmiennej tweet

	}


}
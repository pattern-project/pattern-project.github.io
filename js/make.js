$('.videonav').on('click',function(){
	let url = $(this).attr("href");
	url = url.replace('step=','step=1');
	$(this).attr("href", url);
});
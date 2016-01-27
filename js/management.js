$(function($){

	$(".editableBlock").editable("<?php print $url ?>save.php", {
		//type      : 'input',
		submitdata: {_method: "put"},
		select    : true,
		submit    : 'OK',
		cancel    : 'Cancel',
		cssclass  : "editable"
	});

	$('.newPlaylistBtn').on('click', function(){

		$('.newPlaylist').show();

		return false;
	});

	$('.renameBtn').on('click', function(){
		$(this).closest('tr').find('.editableBlock').click();

		return false;
	});

});

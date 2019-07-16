	function wordCounter(noteID){
		<!-- var text = document.getElementById(noteID).value; -->
		var text = $('#'+visibleID+' > .textarea').val()
		if (text.length == 0){
			return 0;
		}
		else{
			var words = text.match(/\S+/g).length;
			return words;
		}
	}

	function startcounter(){
		visibleID = $('.noteBox:visible').attr('id');
		note = document.getElementById(visibleID);
		
		note.addEventListener("input", function(){
			var count = wordCounter(visibleID);
			$('#'+visibleID+' > .wordcount').text('Words: '+count);
		}, false);
	}
	
	function updateElement(elementID, elementType, update){
		var node = document.createElement(elementType);
		var textnode = document.createTextNode(update);
		node.appendChild(textnode);
		document.getElementById(elementID).appendChild(node);
	}
	
	function openTab(tabName) {
		var i, x;
		x = document.getElementsByClassName("noteBox");
		for (i = 0; i < x.length; i++) {
			x[i].style.display = "none";
			id = x[i].id.substring(4);
			notePreview(id);
		}
		document.getElementById(tabName).style.display = "block";
		startcounter();
	}	
		
	function changeColor(color){
		var noteID = ($('#row1 .column').length - 1);
		$('#column'+noteID +', #note'+noteID).removeClass('pink, blue, yellow, green');
		$('#column'+noteID +', #note'+noteID).addClass(color);
		$('#colorpicker').modal('hide');
	}
	
	function newNote(){
		var noteName = prompt("Please name your note:");
		var noteID = ($('#row1 .column').length);
		if (noteName == null){
				noteName = 'Note ' + noteID;
		}
		else{
			if (noteName == ''){
				noteName = 'Note ' + noteID;
			}
			$('#colorpicker').modal('show');
			
			if(noteName.length > 16){
			noteName = noteName.substring(0,13) + '...';
		}
			
			column_block = '<div id="column'+noteID+'" class="column yellow shadow" onclick="openTab(\'note' + noteID+'\');"> \
								<h3 class="noteTitle" > '+noteName+'</h3> \
								<span onclick="this.parentElement.style.display=\'none\'; deleteNote(\''+noteID+'\')" class="deleteX"><img class="deleteX" src="img\\close.png"></span> \
								<p id="prev'+noteID+'" class="preview"></p> \
							</div>';
				
			$('#row1').append(column_block);
			note_block = '<div id="note'+ noteID +'" class="noteBox yellow shadow sticky" style="display:none;"> \
							<span onclick="this.parentElement.style.display=\'none\'; notePreview(\''+noteID+'\')" class="closebtn"><img class="closeX" src="img\\close.png"></span> \
							<h3 class="textTitle" style="padding-left:10%;">'+noteName+'</h3> \
							<textarea class="textarea" placeholder="Take your note..."></textarea> \
							<p class="wordcount">Words: </p> \
						</div>';
			$('#notes').append(note_block);
		
			<!-- var note = document.getElementById("textarea"); -->
			
		}
	}
	function notePreview(noteID){
		console.log("prev")
		textContents = $('#note'+noteID+' textarea').val();
		if(textContents.length > 75){
			textContents = textContents.substring(0,75) + '...';
		}
		$('#prev'+noteID).text(textContents);		
	}
	
	function deleteNote(noteID){
		columnID = "#column" + noteID
		noteID = "#note"+ noteID
		$(columnID).hide('slow')
		$(noteID).hide('fast')		
		if (!Xclick){
			var Xclick = window.event;
		}
		Xclick.cancelBubble = true;
		if (Xclick.stopPropagation) {
			Xclick.stopPropagation();
		}
	}
	
	function loginModal(){
			$('#loginmodal').modal('show');
			$('#registermodal').modal('hide');
	}
	
	function registerModal(){
			$('#loginmodal').modal('hide');
			$('#registermodal').modal('show');
	}
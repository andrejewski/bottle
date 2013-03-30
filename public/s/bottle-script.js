// bottle-client.js

var Bottle = {
	isAuthed: 	API('get', '/isAuthed'),
	Throw: 		API('post','/throw'),
	Fetch: 		API('get', '/bottles'),

	Render: function(data) {
		var inbox = $('#inbox');
		$.map(data.bottles, function(bottle) {
			var note = "<div class='note'>"+bottle.text+'</div>'
			inbox.prepend(note);
			Note.manage();
		})
	},
	
}

function API($method, $path, $defaultData) {
	return function(data, next) {
		var send = $.extend($defaultData || {}, data)
		console.log('sending to '+$path+':')
		console.log(send);
		$[$method]($path, send, function(res) {
			console.log('returned: ')
			console.log(res)
			if(res.success == true) {
				next(res);
			}
		})
	}
}

var Note = {
	manage: function() {
		$('.note').off().on('click', function(e) {
			Note.lookAt(Note.find(e));
		})
	},
	lookAt: function(note) {
		var on = note.hasClass('on');
		$('.note').removeClass('on');
		if(!on) {
			note.addClass('on');
		}
	},
	find: function(e) {
		return $(e.target).hasClass('note') == true ? $(e.target) : $(e.target).parents('.note');
	}
}

var Form = {
	context: '#paper',
	fields: ['text'],

	compile: function(next) {
		var form = {};
		$.map(Form.fields, function(field) {
			form[field] = $('.'+field, Form.context).val();
		})
		console.log('Form: '+ JSON.stringify(form))
		next(form);
	},
	manage: function() {
		$('.x-throw').off().on('click', function(e) {
			Form.compile(function(form) {
				if(form.text) {

					Bottle.Throw(form, Form.outcome)
				}
			})
		})
	},
	outcome: function(data) {
		if(data.commit == true) {
			Form.flash("It's in the ocean now! Littering is fun, right ladies?");
			Form.clear();
			Form.manage();
		} else {
			Form.flash("Your note didn't make it to the ocean, try again later.")
		}
	},
	flash : function(msg) {
		$('#flash').html(msg)
		t = setTimeout(function() {
			$('#flash').html('');
		}, 5000)
	},
	clear: function() {
		$.map(Form.fields, function(field) {
			$('.'+field, Form.context).val('');
		})
	}
}

// and begin!
Bottle.isAuthed({}, function(data) {
	$('.elastic').elastic();
	if(data.authed == true) {

		$('.authed').toggleClass('hidden');
		$('.noauth').toggleClass('hidden');

		Bottle.isAuthed = true;
		Bottle.Fetch({}, Bottle.Render)

		Form.manage();
	}
})


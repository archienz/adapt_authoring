// LICENCE https://github.com/adaptlearning/adapt_authoring/blob/master/LICENSE
define(function(require) {
	var _ = require('underscore');
	var Origin = require('coreJS/app/origin');
	var SweetAlert = require('sweetalert');

	function getSettings(data) {
		var defaults = {
			title: '',
			animation: "slide-from-bottom",
			confirmButtonColor: "#15a4fa"
		};

		switch(data.type) {
			case "confirm":
				data.type = null;
				defaults.title = app.polyglot.t('app.confirmdefaulttitle');
				defaults.showCancelButton = true;
				defaults.confirmButtonText = app.polyglot.t('app.confirmdefaultyes');
				defaults.cancelButtonText = app.polyglot.t('app.no');
				break;
			case "warning":
        defaults.showCancelButton = true;
        defaults.confirmButtonText = app.polyglot.t('app.confirmdefaultyes');
        defaults.cancelButtonText = app.polyglot.t('app.no');
        defaults.confirmButtonColor = "#DD6B55";
				break;
			case "input":
			case "success":
        defaults.title = app.polyglot.t('app.sucessdefaulttitle');
        break;
			case "info":
        defaults.title = app.polyglot.t('app.infodefaulttitle');
        break;
			case "error":
        defaults.title = app.polyglot.t('app.errordefaulttitle');
				break;
			default:
				if (data.type) {
					Origin.	Notify.console({
						type: "error",
						text: "'" + data.type + "' is not a valid alert type"
					});
				}
				data.type = null;
		}

		// combine settings, overwriting defaults with param
		return _.extend(defaults, data);
	};

	function openPopup(data) {
		SweetAlert(getSettings(data), data.callback);
	}

	var Alert = function(data) {
		// allow for string input
		if(_.isString(data)) {
			data = {
				title: data
			};
		}
		openPopup(data);
	};

	/**
	* NOTE if callback isn't an annonymous function, it won't be called on cancel
	* See: https://github.com/t4t5/sweetalert/issues/431 
	*/
	var Confirm = function(data) {
		// allow for string input
		if(_.isString(data)) {
			data = {
				text: data
			};
		}

		data.type = data.type || "confirm";
		openPopup(data);
	};

	var init = function() {
		Origin.Notify.register('alert', Alert);
		Origin.Notify.register('confirm', Confirm);

		// shortcuts to override window methods
		window.alert = alert = Alert;
		window.confirm = confirm = Confirm;
	};

	return init;
});

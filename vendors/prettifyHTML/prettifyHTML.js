(function ($) {
	/*These are the default options we use internally, which can be overridden by passign option parameter*/
	var defaults = {
		tab: '  ', //String to use as character it can be tab character or multiple spaces
		maxCols: 120, //Max number of character used to break the element in multiple lines in case element has only text
		excludeAttributes: ['^ng-'], //attributes matching given patterns will not be included in the output
		excludeElements: ['#comment'], //elements matching given patterns will not be included in the output
		excludeClasses: ['^ng-'], //elements matching given patterns will not be included in the output
	}
	var settings;

	//Appends content of this element into given element
	$.fn.appendPrettifiedHTML = function (source, destination, options) {
		settings = jQuery.extend(defaults, options);
		return this.each(function (index, element) {
			var html = jQuery(element).find(source).html();
			var elements = jQuery.parseHTML(html);
			html = getPrettyHTML(elements);
			html = jQuery('<div/>').text(html).html();
			jQuery(element).find(destination).append(html);
		});
	}

	var getPrettyHTML = function (elements) {
		var html = '';
		if (elements) {
			jQuery.each(elements, function (index, element) {
				html += getElementHTML(element, 0);
			})
		}
		return html.trim();
	};

	var regexTest = function (text, pattern, modifiers) {
		var matcher = new RegExp(pattern, (modifiers) ? modifiers : "i");
		return matcher.test(text);
	};

	var getElementHTML = function (element, level) {
		var html = '';
		var exclude = false;
		jQuery.each(settings.excludeElements, function (index, value) {
			if (!exclude)
				exclude = regexTest(element.nodeName, value);
		})

		if (exclude)
			return html;

		if (element.nodeName == '#text') {
			var text = element.data.trim();
			if (text) {
				html += '\n';
				for (var iIndex = 0; iIndex < level; ++iIndex) html += settings.tab;
				html += text;
			}
		}
		else if (element.nodeName == '#comment') {
			var text = element.data.trim();
			if (text) {
				html += '\n';
				for (var iIndex = 0; iIndex < level; ++iIndex) html += settings.tab;
				html += '<!-- ' + text + ' -->';
			}
		}
		else {
			html += '\n';
			for (var iIndex = 0; iIndex < level; ++iIndex) html += settings.tab;
			var inline = (element.childNodes.length == 1 && element.childNodes[0].nodeName == '#text');
			html += '<' + element.nodeName.toLowerCase();
			jQuery.each(element.attributes, function (index, node) {
				var exclude = false;
				jQuery.each(settings.excludeAttributes, function (index, value) {
					if (!exclude)
						exclude = regexTest(node.name, value)
				})
				if (!exclude) {
					if (node.name == 'class') {
						
						var classes = node.nodeValue.split(' ');
						var classValue = '';
						jQuery.each(classes, function (indexClass, className) {
							var excludeClass = false;
							jQuery.each(settings.excludeClasses, function (index, value) {
								if (!excludeClass)
									excludeClass = regexTest(className, value)
							})
							if (!excludeClass)
								classValue += className + ' ';
						})
						if( classValue.trim() )
							html += ' ' + node.name + '="' + classValue.trim() + '\"';
					}
					else
						html += ' ' + node.name + '="' + node.nodeValue + '"';
				}
			});
			level += 1;
			if (element.childNodes.length == 0)
				html += ' />'
			else {
				var endTag = '</' + element.nodeName.toLowerCase() + '>';
				var children = '';
				jQuery.each(element.childNodes, function (index, node) {
					children += getElementHTML(node, level);
				});
				html += '>';
				if (inline && (html + children + endTag).length < settings.maxCols) {
					html += children.trim();
				} else {
					html += children;
					html += '\n';
					for (var iIndex = 1; iIndex < level; ++iIndex) html += settings.tab;
				}
				html += endTag;
			}
		}
		return html;
	}
}(jQuery));
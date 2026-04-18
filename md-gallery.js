/*
Markdown Gallery
-- v1.0 2016
-- Created by Lee Penney
-- Released under GPLv3
*/

function md_gallery(config) {
	var config = config || {},
	list_type = config.list_type || 'ul',
	class_name = config.class_name || 'gallery',
	tag_type = config.tag_type || 'div';

	function find_lists(list_type) {
		var lists = document.getElementsByTagName(list_type), matching_lists = [];
		for (var i = 0; i < lists.length; i++) {
			var list_elements = lists[i].children;
			var total_matches = 0;
			for (var c = 0; c < list_elements.length; c++) {
				if (!list_elements[c].textContent.length && (list_elements[c].firstChild.tagName == 'A' || list_elements[c].firstChild.tagName == 'IMG') && (!list_elements[c].firstChild.firstChild || (list_elements[c].firstChild.firstChild && list_elements[c].firstChild.firstChild.tagName == 'IMG') )) {
					total_matches++;
				}
			}
			if (total_matches == list_elements.length) {
				matching_lists[matching_lists.length] = lists[i];
			}
		}
		return matching_lists;
	}

	function prepend_tag(img_lists, list_tag, prepend_tag, class_name) {
		for (var i = 0; i < img_lists.length; i++) {
			add_figure_tags(img_lists[i]);
			wrap_tag(img_lists[i], prepend_tag, class_name);
			strip_tag(img_lists[i], 'li');
			strip_tag(img_lists[i].parentNode, list_tag);
		}
	}

	function append_caption(el) {
		if ((el.tagName == 'A' && el.firstChild.tagName == 'IMG' && el.firstChild.hasAttribute('alt') && el.firstChild.getAttribute('alt').length > 0) || (el.tagName == 'IMG' && el.hasAttribute('alt') && el.getAttribute('alt').length > 0)) {
			var caption = document.createElement('figcaption');
			try {
				caption.textContent = el.firstChild.getAttribute('alt')
				el.appendChild(caption);
			} catch (e) {
				caption.textContent = el.getAttribute('alt');
				el.parentNode.appendChild(caption);
			}
		}
	}

	function strip_tag(el, tag_type) {
		var start_tag_regex = new RegExp('<'+tag_type+'>', 'gi');
		var end_tag_regex = new RegExp('<\/'+tag_type+'>', 'gi');
		el.innerHTML = el.innerHTML.replace(start_tag_regex,'').replace(end_tag_regex,'');
	}

	function add_figure_tags(img_list) {
		var list_elements = img_list.children;
		for (var i = 0; i < list_elements.length; i++) {
			append_caption(list_elements[i].firstChild);
			wrap_tag(list_elements[i], 'figure');
		}
	}

	function wrap_tag(el, tag_type, class_name) {
		var wrap = document.createElement(tag_type);
		if (class_name) {
			class_name += ' gallery-cols-'+el.children.length;
			wrap.setAttribute('class', class_name);
		}
		el.parentNode.replaceChild(wrap, el);
		wrap.appendChild(el);
	}

	function setup_lightbox() {
		if (document.getElementById('md-gallery-lightbox')) return;

		var lb = document.createElement('div');
		lb.id = 'md-gallery-lightbox';
		lb.setAttribute('role', 'dialog');
		lb.setAttribute('aria-modal', 'true');
		lb.setAttribute('aria-label', 'Image viewer');
		lb.style.cssText = [
			'display:none',
			'position:fixed',
			'inset:0',
			'background:rgba(0,0,0,0.82)',
			'z-index:1000',
			'align-items:center',
			'justify-content:center'
		].join(';');

		var closeBtn = document.createElement('button');
		closeBtn.id = 'md-gallery-lightbox-close';
		closeBtn.setAttribute('aria-label', 'Close');
		closeBtn.textContent = '\u00d7';
		closeBtn.style.cssText = [
			'position:absolute',
			'top:1rem',
			'right:1.25rem',
			'background:none',
			'border:none',
			'color:#fff',
			'font-size:2rem',
			'line-height:1',
			'cursor:pointer',
			'padding:0.25rem 0.5rem',
			'opacity:0.8'
		].join(';');
		closeBtn.onmouseenter = function() { closeBtn.style.opacity = '1'; };
		closeBtn.onmouseleave = function() { closeBtn.style.opacity = '0.8'; };

		var img = document.createElement('img');
		img.id = 'md-gallery-lightbox-img';
		img.style.cssText = [
			'max-width:90vw',
			'max-height:88vh',
			'border-radius:6px',
			'box-shadow:0 8px 40px rgba(0,0,0,0.5)',
			'object-fit:contain'
		].join(';');

		lb.appendChild(closeBtn);
		lb.appendChild(img);
		document.body.appendChild(lb);

		function close() {
			lb.style.display = 'none';
			document.body.style.overflow = '';
		}

		closeBtn.addEventListener('click', close);
		lb.addEventListener('click', function(e) {
			if (e.target === lb) close();
		});
		document.addEventListener('keydown', function(e) {
			if (e.key === 'Escape' && lb.style.display === 'flex') close();
		});
	}

	function attach_lightbox_to_images() {
		var galleries = document.querySelectorAll('.' + class_name.split(' ')[0]);
		galleries.forEach(function(gallery) {
			gallery.querySelectorAll('img').forEach(function(img) {
				img.style.cursor = 'zoom-in';
				img.addEventListener('click', function() {
					var lb    = document.getElementById('md-gallery-lightbox');
					var lbImg = document.getElementById('md-gallery-lightbox-img');
					lbImg.src = img.src;
					lbImg.alt = img.alt;
					lb.style.display = 'flex';
					document.body.style.overflow = 'hidden';
					document.getElementById('md-gallery-lightbox-close').focus();
				});
			});
		});
	}

	var found_img_lists = find_lists(list_type);
	if (found_img_lists.length) {
		prepend_tag(found_img_lists, list_type, tag_type, class_name);
	}

	setup_lightbox();
	attach_lightbox_to_images();
}

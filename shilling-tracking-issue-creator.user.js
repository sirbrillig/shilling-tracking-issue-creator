// ==UserScript==
// @name         Shilling Tracking Issue Creator
// @namespace    https://github.com/sirbrillig/shilling-tracking-issue-creator
// @version      1.0.0
// @description  Adds a Shilling Github Tracking issue for a GitHub Enterprise PR
// @author       Payton Swick <payton@foolord.com>
// @match        https://github.a8c.com/Automattic/wpcom/pull/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=a8c.com
// @grant        none
// ==/UserScript==

(function () {
	'use strict';

	// If this PR is already tracked (and has the tracking issue listed like
	// "Tracked by https://github.com/..."), don't do anything.
	const commentBody = document.querySelector('.comment-body');
	if (!commentBody) {
		return;
	}
	const hasTrackedBy = /Tracked \w+:? https:/i.test(commentBody.textContent);
	if (hasTrackedBy) {
		return;
	}

	const titleArea = document.querySelector(
		'.gh-header-title .js-issue-title',
	);
	if (!titleArea) {
		return;
	}
	const titleAreaText = titleArea.innerText;
	if (titleAreaText.length < 2) {
		return;
	}

	// This is the Shilling project board:
	// https://github.com/orgs/Automattic/projects/655/views/1
	const project = 'Automattic/655';
	const githubUrl = `https://github.com/Automattic/payments-shilling/issues/new?title=${encodeURIComponent(
		titleAreaText,
	)}&body=${encodeURIComponent(document.location.href)}&projects=${project}`;

	// Create a button that makes the tracking issue.
	const button = document.createElement('button');
	button.appendChild(document.createTextNode('Create tracking issue'));
	button.addEventListener('click', () => {
		window.open(githubUrl, '_blank');
	});
	button.className = 'flex-md-order-3 Button--secondary Button--small Button';

	// Add the button to the DOM of the current page.
	document.querySelector('.gh-header-actions').appendChild(button);
})();

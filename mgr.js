define(['managerAPI',
		'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'], function(Manager){


	//You can use the commented-out code to get parameters from the URL.
	//const queryString = window.location.search;
    //const urlParams = new URLSearchParams(queryString);
    //const pt = urlParams.get('pt');

	var API    = new Manager();

	// Bump this whenever you ship changes. Shows in the on-screen banner so
	// you can verify a refresh actually loaded the latest build.
	const APP_VERSION = 'v1.0.0';

	// IMPORTANT: init_data_pipe generates its own sessionId and stores it on
	// global.sessionId. We must read it back AFTER calling init_data_pipe so the
	// ID we display to the participant matches the ID stamped on every CSV row
	// and used in the OSF filenames.
	init_data_pipe(API, 'Djsdn7ZyiBgp', {file_type:'csv'});
	const sessionId = API.getGlobal().sessionId;

	// Opt-out handler: posts a small OPTOUT_<id>.csv file to DataPipe
	// so the researcher can identify and remove that session's data.
	window.submitOptOut = function() {
		var input = document.getElementById('optout-session-id');
		var msg = document.getElementById('optout-message');
		var btn = document.getElementById('optout-submit');
		var id = (input && input.value || '').trim();
		if (!id) {
			msg.style.color = '#ef4444';
			msg.textContent = 'Please enter your Session ID.';
			return;
		}
		msg.style.color = '#64748b';
		msg.textContent = 'Submitting your request...';
		btn.disabled = true;
		var safeId = id.replace(/[^a-zA-Z0-9_-]/g, '');
		var csv = 'session_id,opt_out_time\n"' + id.replace(/"/g, '""') + '","' + new Date().toISOString() + '"\n';
		fetch('https://pipe.jspsych.org/api/data/', {
			method: 'POST',
			mode: 'cors',
			headers: {'Content-Type': 'application/json', 'Accept': '*/*'},
			body: JSON.stringify({
				experimentID: 'Djsdn7ZyiBgp',
				filename: 'OPTOUT_' + safeId + '_' + Date.now() + '.csv',
				data: csv
			})
		}).then(function(res) {
			if (res.ok) {
				msg.style.color = '#16a34a';
				msg.innerHTML = '<strong>Your opt-out request has been received.</strong> Your responses will be removed from the study. You may now close this window.';
				input.disabled = true;
			} else {
				throw new Error('Status ' + res.status);
			}
		}).catch(function(err) {
			msg.style.color = '#ef4444';
			msg.innerHTML = 'Submission failed. Please email <a href="mailto:amstemme@students.everettcc.edu" style="color:#4f46e5;">amstemme@students.everettcc.edu</a> with your Session ID.';
			btn.disabled = false;
		});
	};

	// Inject a small persistent banner displaying the session ID on every screen
	function injectSessionIdBanner() {
		if (document.getElementById('session-id-banner')) return;
		const banner = document.createElement('div');
		banner.id = 'session-id-banner';
		banner.innerHTML =
			'<span style="color:#64748b;font-weight:500;margin-right:8px;">Session ID:</span>' +
			'<code style="background:#fff;color:#4f46e5;padding:3px 10px;border-radius:5px;font-weight:600;letter-spacing:0.5px;border:1px solid #c7d2fe;font-size:13px;">' + sessionId + '</code>' +
			'<span style="color:#94a3b8;margin-left:10px;font-size:11px;font-weight:500;letter-spacing:0.3px;">' + APP_VERSION + '</span>';
		banner.style.cssText = 'position:fixed;top:0;right:0;background:#f1f5f9;border-bottom-left-radius:8px;padding:8px 14px;font-family:Inter,system-ui,sans-serif;font-size:13px;color:#64748b;border-left:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;z-index:9999;box-shadow:0 1px 3px rgba(0,0,0,0.05);';
		document.body.appendChild(banner);
	}
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', injectSessionIdBanner);
	} else {
		injectSessionIdBanner();
	}

    API.setName('mgr');
    API.addSettings('skip',true);

    // Randomly assign to video condition (50% chance)
    let videoCondition = API.shuffle([true, false])[0];

    API.addGlobal({
        iat:{},
        appVersion: APP_VERSION,
        baseURL: './images/',
        menLabels: 'Men',
        womenLabels: 'Women',
        videoCondition: videoCondition,
        // Leader and Supporter word sets
        leaderWords : API.shuffle([
            'Leader', 'Boss', 'Executive', 'Manager', 'Supervisor', 'Authority', 'Decisive'
        ]), 
        supporterWords : API.shuffle([
            'Supporter', 'Assistant', 'Helper', 'Passive', 'Subordinate', 'Follower', 'Staff'
        ])
    });

    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Continue'
        }],

        welcome: [{
            inherit: 'instructions',
            name: 'welcome',
            templateUrl: 'welcome.jst',
            title: 'Welcome',
            header: 'Welcome'
        }],

        consent: [{
            inherit: 'instructions',
            name: 'consent',
            templateUrl: 'intro.jst',
            title: 'Informed Consent',
            header: 'Informed Consent'
        }],

        video: [{
            inherit: 'instructions',
            name: 'video',
            templateUrl: 'video.jst',
            title: 'Video',
            header: 'Please watch the following video'
        }],

        iat_instructions: [{
            inherit: 'instructions',
            name: 'iat_instructions',
            templateUrl: 'iat_instructions.jst',
            title: 'IAT Instructions',
            header: 'Implicit Association Test'
        }],

        demographics: [{
            type: 'quest',
            name: 'demographics',
            scriptUrl: 'demographics.js'
        }],

        iat: [{
            type: 'time',
            name: 'iat',
            scriptUrl: 'iat.js'
        }],

        lastpage: [{
            type: 'message',
            name: 'lastpage',
            templateUrl: 'lastpage.jst',
            title: 'End',
            //Uncomment the following if you want to end the study here.
            //last:true, 
            header: 'You have completed the study'
        }], 
        
        //Use if you want to redirect the participants elsewhere at the end of the study
        redirect:
        [{ 
			//Replace with any URL you need to put at the end of your study, or just remove this task from the sequence below
            type:'redirect', name:'redirecting', url: 'exampleiat.html' 
        }],
		
		//This task waits until the data are sent to the server.
        uploading: uploading_task({header: 'just a moment', body:'Please wait, sending data... '})
    });

    API.addSequence([
        { type: 'isTouch' }, //Use Minno's internal touch detection mechanism. 

        // apply touch only styles
        {
            mixer:'branch',
            conditions: {compare:'global.$isTouch', to: true},
            data: [
                {
                    type: 'injectStyle',
                    css: [
                        '[piq-page] {background-color: #fff; border: 1px solid transparent; border-radius: 4px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05); margin-bottom: 20px; border-color: #e2e8f0;}',
                        '[piq-page] > ol {margin: 15px;}',
                        '[piq-page] > .btn-group {margin: 0px 15px 15px 15px;}',
                        '.container {padding:5px; max-width:800px; margin:0 auto;}',
                        '[pi-quest]::before, [pi-quest]::after {content: " ";display: table;}',
                        '[pi-quest]::after {clear: both;}',
                        '[pi-quest] h3 { border-bottom: 1px solid transparent; border-top-left-radius: 8px; border-top-right-radius: 8px; padding: 16px 20px; font-size: 1.5em; margin-bottom: 20px; margin-top: 0; background: linear-gradient(135deg, #4f46e5, #4338ca); color: white;}',
                        '[pi-quest] .form-group > label {font-size:1.2em; font-weight:normal;}',

                        '[pi-quest] .btn-toolbar {margin:15px;float:none !important; text-align:center;position:relative;}',
                        '[pi-quest] [ng-click="decline($event)"] {position:absolute;right:0;bottom:0}',
                        '[pi-quest] [ng-click="submit()"] {width:30%;line-height: 1.3333333;border-radius: 6px;}',
                        // larger screens
                        '@media (min-width: 480px) {',
                        ' [pi-quest] [ng-click="submit()"] {width:30%;padding: 10px 16px;font-size: 1.6em;}',
                        '}',
                        // phones and smaller screens
                        '@media (max-width: 480px) {',
                        ' [pi-quest] [ng-click="submit()"] {padding: 8px 13px;font-size: 1.2em;}',
                        ' [pi-quest] [ng-click="decline($event)"] {font-size: 0.9em;padding:3px 6px;}',
                        '}'
                    ]
                }
            ]
        },
        
        
        {inherit: 'welcome'},
        {inherit: 'consent'},

        // Show video only if videoCondition is true (50% of participants)
        {
            mixer: 'branch',
            conditions: {compare: 'global.videoCondition', to: true},
            data: [
                {inherit: 'video'}
            ]
        },

        // IAT task
        {inherit: 'iat_instructions'},
        {inherit: 'iat'},

        // Demographics at the end
        {inherit: 'demographics'},

		{inherit: 'uploading'},
        {inherit: 'lastpage'},
        {inherit: 'redirect'}
    ]);

    return API.script;
});

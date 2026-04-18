define(['managerAPI',
		'https://cdn.jsdelivr.net/gh/minnojs/minno-datapipe@1.*/datapipe.min.js'], function(Manager){


	//You can use the commented-out code to get parameters from the URL.
	//const queryString = window.location.search;
    //const urlParams = new URLSearchParams(queryString);
    //const pt = urlParams.get('pt');

	var API    = new Manager();
	
	// Generate unique session ID (combines timestamp + random string for uniqueness)
	const sessionId = Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
	
	init_data_pipe(API, 'Djsdn7ZyiBgp',  {file_type:'csv'});

    API.setName('mgr');
    API.addSettings('skip',true);

    // Randomly assign to video condition (50% chance)
    let videoCondition = API.shuffle([true, false])[0];

    API.addGlobal({
        iat:{},
        sessionId: sessionId,
        baseURL: './images/',
        menLabels: 'Men',
        womenLabels: 'Women',
        videoCondition: videoCondition,
        // Leader and Supporter word sets
        leaderWords : API.shuffle([
            'Leader', 'Boss', 'Executive', 'Manager', 'Supervisor', 'Authority', 'Decisive', 'Assertive'
        ]), 
        supporterWords : API.shuffle([
            'Supporter', 'Assistant', 'Helper', 'Worker', 'Passive', 'Subordinate', 'Follower', 'Staff'
        ])
    });

    API.addTasksSet({
        instructions: [{
            type: 'message',
            buttonText: 'Continue'
        }],

        intro: [{
            inherit: 'instructions',
            name: 'intro',
            templateUrl: 'intro.jst',
            title: 'Intro',
            header: 'Welcome'
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
        
        
        {inherit: 'intro'},

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

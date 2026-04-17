define(['questAPI'], function(Quest){
    let API = new Quest();
    let isTouch = API.getGlobal().$isTouch;
	
    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false,
        header: 'Demographics',
        decline: true,
        declineText: isTouch ? 'Decline' : 'Decline to Answer', 
        autoFocus:true, 
        progressBar: 'Page <%= pagesMeta.number %> out of 3'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        decline: 'true',
        required : true, 		
        errorMsg: {
            required: isTouch 
                ? 'Please select an answer, or click \'Decline\'' 
                : 'Please select an answer, or click \'Decline to Answer\''
        },
        autoSubmit:'true',
        numericValues:'true',
        help: '<%= pagesMeta.number < 3 %>',
        helpText: 'Tip: For quick response, click to select your answer, and then click again to submit.'
    });

    API.addQuestionsSet('basicSelect',{
        inherit :'basicQ',
        type: 'selectOne'
    });

    /**
	* Demographic questions
	*/
    API.addQuestionsSet('age',{
        inherit : 'basicSelect',
        name: 'age_range',
        stem: 'What is your age?',
        answers: [
            {text: '18-24', value: 1},
            {text: '25-34', value: 2},
            {text: '35-44', value: 3},
            {text: '45-54', value: 4},
            {text: '55-64', value: 5},
            {text: '65 or older', value: 6}
        ]
    });

    API.addQuestionsSet('gender',{
        inherit : 'basicSelect',
        name: 'gender',
        stem: 'What is your gender?',
        answers: [
            {text: 'Woman', value: 1},
            {text: 'Man', value: 2},
            {text: 'Non-binary', value: 3},
            {text: 'Prefer to self-describe', value: 4},
            {text: 'Prefer not to say', value: 5}
        ]
    });

    API.addQuestionsSet('sexuality',{
        inherit : 'basicSelect',
        name: 'sexuality',
        stem: 'How do you describe your sexual orientation?',
        answers: [
            {text: 'Heterosexual / Straight', value: 1},
            {text: 'Gay / Lesbian', value: 2},
            {text: 'Bisexual', value: 3},
            {text: 'Queer', value: 4},
            {text: 'Asexual', value: 5},
            {text: 'Prefer to self-describe', value: 6},
            {text: 'Prefer not to say', value: 7}
        ]
    });

    API.addSequence([
        {
            inherit:'basicPage', 
            questions: {inherit:'age'}
        },
        {
            inherit:'basicPage', 
            questions: {inherit:'gender'}
        },
        {
            inherit:'basicPage', 
            questions: {inherit:'sexuality'}
        }
    ]);

    return API.script;
});

define(['questAPI'], function(Quest){
    let API = new Quest();
    let global = API.getGlobal();
    let isTouch = global.$isTouch;

    // Add metadata to the data output
    API.addCurrent({
        sessionId: global.sessionId,
        isTouch: global.$isTouch,
        videoCondition: global.videoCondition,
        appVersion: global.appVersion
    });

    /**
	* Page prototype
	*/
    API.addPagesSet('basicPage',{
        noSubmit:false,
        header: 'Demographics',
        decline: false,
        autoFocus:true, 
        progressBar: 'Page <%= pagesMeta.number %> out of 8'
    });
	
    /**
	* Question prototypes
	*/
    API.addQuestionsSet('basicQ',{
        required : true, 		
        errorMsg: {
            required: 'Please select an answer'
        },
        autoSubmit:'true',
        numericValues:'true'
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
            {text: '65 or older', value: 6},
            {text: 'Prefer not to say', value: 0}
        ]
    });

    API.addQuestionsSet('gender',{
        inherit : 'basicSelect',
        name: 'gender',
        stem: 'What is your gender?',
        answers: [
            {text: 'Man', value: 1},
            {text: 'Non-binary', value: 2},
            {text: 'Other', value: 4},
            {text: 'Woman', value: 3},
            {text: 'Prefer not to say', value: 0}
        ]
    });

    API.addQuestionsSet('sexuality',{
        inherit : 'basicSelect',
        name: 'sexual_orientation',
        stem: 'What is your sexual orientation?',
        answers: [
            {text: 'Asexual', value: 1},
            {text: 'Bisexual', value: 2},
            {text: 'Gay', value: 3},
            {text: 'Heterosexual', value: 4},
            {text: 'Lesbian', value: 5},
            {text: 'Other', value: 8},
            {text: 'Pansexual', value: 6},
            {text: 'Queer', value: 7},
            {text: 'Prefer not to say', value: 0}
        ]
    });

    API.addQuestionsSet('education',{
        inherit : 'basicSelect',
        name: 'education_level',
        stem: 'What is your highest level of education?',
        answers: [
            {text: 'Associate degree', value: 1},
            {text: 'Bachelor\'s degree', value: 2},
            {text: 'Doctoral degree', value: 3},
            {text: 'High school diploma or equivalent', value: 4},
            {text: 'Master\'s degree', value: 5},
            {text: 'Professional degree (e.g., MD, JD)', value: 6},
            {text: 'Some college, no degree', value: 7},
            {text: 'Some high school', value: 8},
            {text: 'Trade/vocational training', value: 9},
            {text: 'Prefer not to say', value: 0}
        ]
    });

    API.addQuestionsSet('ethnicity',{
        inherit : 'basicSelect',
        name: 'ethnicity',
        stem: 'What is your ethnicity?',
        answers: [
            {text: 'Asian', value: 1},
            {text: 'Black or African American', value: 2},
            {text: 'Hispanic or Latino', value: 3},
            {text: 'Middle Eastern or North African', value: 4},
            {text: 'Mixed or Multiple ethnicities', value: 5},
            {text: 'Native American or Alaska Native', value: 6},
            {text: 'Native Hawaiian or Pacific Islander', value: 7},
            {text: 'Other', value: 9},
            {text: 'White or Caucasian', value: 8},
            {text: 'Prefer not to say', value: 0}
        ]
    });

    API.addQuestionsSet('religion',{
        inherit : 'basicSelect',
        name: 'religion',
        stem: 'What is your religion?',
        answers: [
            {text: 'Agnostic', value: 1},
            {text: 'Atheist', value: 2},
            {text: 'Buddhist', value: 3},
            {text: 'Christian', value: 4},
            {text: 'Hindu', value: 5},
            {text: 'Jewish', value: 6},
            {text: 'Muslim', value: 7},
            {text: 'Sikh', value: 8},
            {text: 'Spiritual but not religious', value: 9},
            {text: 'Other', value: 10},
            {text: 'Prefer not to say', value: 0}
        ]
    });

    API.addQuestionsSet('country',{
        type: 'text',
        name: 'country',
        stem: 'What country do you currently live in?',
        required: true,
        errorMsg: {required: 'Please enter your country'},
        autoSubmit: false
    });

    API.addQuestionsSet('priorIAT',{
        inherit : 'basicSelect',
        name: 'prior_iat_experience',
        stem: 'How many Implicit Association Tests (IATs) have you completed in the past?',
        answers: [
            {text: 'None', value: 0},
            {text: 'Once or twice', value: 1},
            {text: 'Three times or more', value: 2}
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
        },
        {
            inherit:'basicPage', 
            questions: {inherit:'education'}
        },
        {
            inherit:'basicPage', 
            questions: {inherit:'ethnicity'}
        },
        {
            inherit:'basicPage', 
            questions: {inherit:'religion'}
        },
        {
            inherit:'basicPage', 
            questions: {inherit:'country'}
        },
        {
            inherit:'basicPage', 
            questions: {inherit:'priorIAT'}
        }
    ]);

    return API.script;
});

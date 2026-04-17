define(['pipAPI','https://cdn.jsdelivr.net/gh/baranan/minno-tasks@0.*/IAT/iat10.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
        category1 : {
            name : global.menLabels, //Will appear in the data.
            title : {
                media : {word : global.menLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'm1.jpg'},
                {image: 'm2.jpg'},
                {image: 'm3.jpg'}
            ],
            //Stimulus css (style) - constrain image size
            stimulusCss : {color:'#31940F','font-size':'2.3em', 'max-height':'200px', 'max-width':'200px'}
        },    
        category2 : {
            name : global.womenLabels, //Will appear in the data.
            title : {
                media : {word : global.womenLabels}, //Name of the category presented in the task.
                css : {color:'#31940F','font-size':'1.8em'}, //Style of the category title.
                height : 4 //Used to position the "Or" in the combined block.
            }, 
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {image: 'f1.jpg'},
                {image: 'f2.jpg'},
                {image: 'f3.jpg'}
            ],
            //Stimulus css (style) - constrain image size
            stimulusCss : {color:'#31940F','font-size':'2.3em', 'max-height':'200px', 'max-width':'200px'}
        },
        attribute1 : {
            name : 'Supporter',
            title : {
                media : {word : 'Supporter'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.supporterWords[0]},
                {word: global.supporterWords[1]},
                {word: global.supporterWords[2]},
                {word: global.supporterWords[3]},
                {word: global.supporterWords[4]},
                {word: global.supporterWords[5]}
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        attribute2 : {
            name : 'Leader',
            title : {
                media : {word : 'Leader'},
                css : {color:'#0000FF','font-size':'1.8em'},
                height : 4 //Used to position the "Or" in the combined block.
            },
            stimulusMedia : [ //Stimuli content as PIP's media objects
                {word: global.leaderWords[0]},
                {word: global.leaderWords[1]},
                {word: global.leaderWords[2]},
                {word: global.leaderWords[3]},
                {word: global.leaderWords[4]},
                {word: global.leaderWords[5]}
            ],
            //Stimulus css
            stimulusCss : {color:'#0000FF','font-size':'2.3em'}
        },
        base_url : {//Where are your images at?
            image : global.baseURL
        },
        isTouch : global.$isTouch
    });
});


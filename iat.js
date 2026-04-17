define(['pipAPI','iat10.js'], function(APIConstructor, iatExtension){
    let API = new APIConstructor();
    let global = API.getGlobal();

    return iatExtension({
        category1 : {
            name : global.menLabels,
            title : {
                media : {word : global.menLabels},
                css : {color:'#16a34a','font-size':'1.6em','font-weight':'600','font-family':'Inter, system-ui, sans-serif'},
                height : 4
            }, 
            stimulusMedia : [
                {image: 'm1.jpg'},
                {image: 'm2.jpg'},
                {image: 'm3.jpg'}
            ],
            stimulusCss : {color:'#16a34a','font-size':'2em', 'max-height':'350px', 'max-width':'350px'}
        },    
        category2 : {
            name : global.womenLabels,
            title : {
                media : {word : global.womenLabels},
                css : {color:'#16a34a','font-size':'1.6em','font-weight':'600','font-family':'Inter, system-ui, sans-serif'},
                height : 4
            }, 
            stimulusMedia : [
                {image: 'f1.jpg'},
                {image: 'f2.jpg'},
                {image: 'f3.jpg'}
            ],
            stimulusCss : {color:'#16a34a','font-size':'2em', 'max-height':'350px', 'max-width':'350px'}
        },
        attribute1 : {
            name : 'Supporter',
            title : {
                media : {word : 'Supporter'},
                css : {color:'#4f46e5','font-size':'1.6em','font-weight':'600','font-family':'Inter, system-ui, sans-serif'},
                height : 4
            },
            stimulusMedia : [
                {word: global.supporterWords[0]},
                {word: global.supporterWords[1]},
                {word: global.supporterWords[2]},
                {word: global.supporterWords[3]},
                {word: global.supporterWords[4]},
                {word: global.supporterWords[5]}
            ],
            stimulusCss : {color:'#4f46e5','font-size':'1.8em','font-family':'Inter, system-ui, sans-serif'}
        },
        attribute2 : {
            name : 'Leader',
            title : {
                media : {word : 'Leader'},
                css : {color:'#4f46e5','font-size':'1.6em','font-weight':'600','font-family':'Inter, system-ui, sans-serif'},
                height : 4
            },
            stimulusMedia : [
                {word: global.leaderWords[0]},
                {word: global.leaderWords[1]},
                {word: global.leaderWords[2]},
                {word: global.leaderWords[3]},
                {word: global.leaderWords[4]},
                {word: global.leaderWords[5]}
            ],
            stimulusCss : {color:'#4f46e5','font-size':'1.8em','font-family':'Inter, system-ui, sans-serif'}
        },
        base_url : {//Where are your images at?
            image : global.baseURL
        },
        isTouch : global.$isTouch
    });
});


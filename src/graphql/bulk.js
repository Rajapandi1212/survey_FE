export const bulkImportSurvey = `mutation bulkImportSurvey($surveyID: ID, $surveyPreQuestionnaireId: ID, $surveyMainQuestionnaireId: ID) {
    questionnaire1: createQuestionnaire(input: {
        id: $surveyPreQuestionnaireId
        name: "Simpsons Pre Questionnaire"
        description: "Pre questionnaire that must be completed prior to commencing survey."
        type: PRE
    })
    {
        id
        name
    }
    question1: createQuestion(input: {
        qu: "How strongly do you agree or disagree that the Simpsons was the best TV series ever?"
        type: LIST
        listOptions: [
                "Strongly Agree",
                "Somewhat Agree",
                "Neither agree nor disagree",
                "Somewhat Disagree",
                "Strongly Disagree",
                "Don't Know"
            ]
        order: 0
        questionQuestionnaireId: $surveyPreQuestionnaireId
    })
    {
        id
        qu
    }
    question2: createQuestion(input: {
        qu: "How often do you wish you were able to watch a Simpsons episode right there and then?"
      type: LIST
      listOptions: [
            "Always",
            "Often",
            "Sometimes",
            "Rarely",
            "Never"
        ]
      order: 1
      questionQuestionnaireId: $surveyPreQuestionnaireId
    })
    {
        id
        qu
    }
    question3: createQuestion(input: {
        qu: "What was the name of the racehorse Bett Midler and Krusty the Cloud co-owned?"
      type: TEXT
      order: 2
      questionQuestionnaireId: $surveyPreQuestionnaireId
    })
    {
        id
        qu
    }
    questionnaire2: createQuestionnaire(input: {
        id: $surveyMainQuestionnaireId
        name: "Simpsons Main Survey"
        description: "Main Survey questions."
        type: MAIN
    })
    {
        id
        name
    }
    question4: createQuestion(input: {
        qu: "Activity Start Time"
        type: DATETIME
        order: 1
        questionQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        qu
    }
    question5: createQuestion(input: {
        qu: "Activity Finish Time"
        type: DATETIME
        order: 2
        questionQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        qu
    }
    question6: createQuestion(input: {
        qu: "Where were you?"
        type: TEXT
        order: 3
        questionQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        qu
    }
    question7: createQuestion(input: {
        qu: "What episode did you watch?"
        type: TEXT
        order: 4
        questionQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        qu
    }
    createSurvey(input: {
        id: $surveyID
        name: "The Simpsons Survey"
        description: "This survey tests you on your knowledge of The Simpsons, and you are requested to add entries for each time you watched an episode of the Simpsons during the survey period."
        image: "https://m.media-amazon.com/images/M/MV5BYjc2MzcwMjctNjI2NC00MGQ1LWEwYmEtYWUyN2M2NjZjN2Q4XkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg"
        archived: false
        groups: ["Simpsons"]
        surveyPreQuestionnaireId: $surveyPreQuestionnaireId
        surveyMainQuestionnaireId: $surveyMainQuestionnaireId
    })
    {
        id
        name
    }
}
`;

export const stonemorBulkImport = `mutation stonemorBulkImport($surveyID: ID, $surveyPreQuestionnaireId: ID) {
    questionnaire1: createQuestionnaire(input: {
        id: $surveyPreQuestionnaireId
        name: "StoneMor Pre Questionnaire"
        description: "To check flow of the survey"
        type: PRE
    })
    {
        id
        name
    }
    question1: createQuestion(input: {
        id: "648e13f4-bcea-4db7-81bd-75a80221d893"
        qu: "Are you the individual who was responsible for making your loved one s final arrangements??"
        type: RADIO
        listOptions: [
                {listValue:"Yes"},
                {listValue:"No"}
                    ]
        order: 1
        questionQuestionnaireId: $surveyPreQuestionnaireId
        
    })
    {
        id
        qu
    }
    question2: createQuestion(input: {
        id: "d2687fad-90e9-42da-bb57-b655c4a9926c"
        qu: "Please tell us about your relationship to your loved one :"
        type: RADIO_TEXT
        listOptions: [
            {listValue:"Parent"},
            {listValue:"Spouse/Significant other"},
            {listValue:"Sibling"},
            {listValue:"Other family member"},
            {listValue:"Friend"},
            {listValue:"Other (please specify)",isText:true}
            ]
        isDependent: true
        dependent: {
            id: "648e13f4-bcea-4db7-81bd-75a80221d893"
            options:[
                {dependentValue: "Yes",nextQuestion:"bc5082d8-46b4-4968-99d9-a01aeb02a44c"},
                {dependentValue: "No",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"},
            ]
        }
        order: 2
        questionQuestionnaireId: $surveyPreQuestionnaireId
        
    })
    {
        id
        qu
    }
    question3: createQuestion(input: {
        id: "bc5082d8-46b4-4968-99d9-a01aeb02a44c"
        qu: "Please confirm the type(s) of services you secured for your loved one: (select only one)"
        type: RADIO
        listOptions: [
                {listValue:"Funeral service/cremation services only (standalone funeral home)"},
                {listValue:"Funeral/cremation and cemetery services at the same location (combination funeral home and cemetery location)"},
                {listValue:"Cemetery services only (standalone cemetery)"},
                {listValue:"Cremation only; no funeral services or burial services at all (direct cremation)"}
                    ]
        order: 3
        questionQuestionnaireId: $surveyPreQuestionnaireId
        
    })
    {
        id
        qu
    }
    question4: createQuestion(input: {
        id: "51164f1a-aa66-49ac-b044-53b155c3ce02"
        qu: "Prior to making these arrangements, which of the following most closely describes your level of overall awareness of the FUNERAL AND CEMETERY PROFESSION and its products, services and practices?"
        type: RADIO
        listOptions: [
            {listValue:"I was totally unaware of the profession and its practices"},
            {listValue:"I was somewhat unaware of the profession and its practices"},
            {listValue:"I was neither unaware nor aware of the profession and its practices"},
            {listValue:"I was somewhat aware of the profession and its practices"},
            {listValue:"I was very aware of the profession and its practices"}
            ]
        isDependent: true
        dependent: {
            id: "bc5082d8-46b4-4968-99d9-a01aeb02a44c"
            options:[
                {dependentValue: "Funeral service/cremation services only (standalone funeral home)",
                nextQuestion:"f79b8db4-a8d9-4b68-84ec-6c4b89078627"},
                {dependentValue: "Funeral/cremation and cemetery services at the same location (combination funeral home and cemetery location)",
                nextQuestion:"f79b8db4-a8d9-4b68-84ec-6c4b89078627"},
                {dependentValue: "Cemetery services only (standalone cemetery)",nextQuestion:"b64f0c1a-4d57-4d1a-8e85-2b41833437aa"},
                {dependentValue: "Cremation only; no funeral services or burial services at all (direct cremation)",nextQuestion:"ca681639-7124-47bf-b9ca-29ace158fc59"}
            ]
        }
        order: 4
        questionQuestionnaireId: $surveyPreQuestionnaireId
        
    })
    {
        id
        qu
    }
    question5: createQuestion(input: {
        id: "f79b8db4-a8d9-4b68-84ec-6c4b89078627"
        qu: "Was your initial call to the funeral home answered promptly?"
        type: RADIO
        listOptions: [
                {listValue:"Yes"},
                {listValue:"No"},
                {listValue:"I don t recall"}
                    ]
        order: 5
        questionQuestionnaireId: $surveyPreQuestionnaireId  
    })
    {
        id
        qu
    }
    question6: createQuestion(input: {
        id: "a70034d1-e210-4f7e-9c05-63e7708b6b7a"
        qu: "Did you make your FUNERAL arrangements in person, over the phone or virtually (online)"
        type: RADIO
        isSelf: true
        listOptions: [
                {listValue:"In person",nextQuestion:"515b1e04-6e6c-4c12-a991-99f1b79740ef"},
                {listValue:"Over the phone",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"},
                {listValue:"Virtually (online)",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"}
                    ]
        order: 6
        questionQuestionnaireId: $surveyPreQuestionnaireId  
    })
    {
        id
        qu
    }
    question7: createQuestion(input: {
        id: "515b1e04-6e6c-4c12-a991-99f1b79740ef"
        qu: "Were you offered an opportunity to make online or virtual funeral arrangements?"
        type: RADIO
        isSelf: true
        listOptions: [
                {listValue:"Yes",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"},
                {listValue:"No",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"}
                    ]
        order: 7
        questionQuestionnaireId: $surveyPreQuestionnaireId  
    })
    {
        id
        qu
    }
    question8: createQuestion(input: {
        id: "b64f0c1a-4d57-4d1a-8e85-2b41833437aa"
        qu: "Did you make your CEMETERY arrangements in person, over the phone or virtually (online)?"
        type: RADIO
        isSelf: true
        listOptions: [
                {listValue:"In person",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"},
                {listValue:"Over the phone",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"},
                {listValue:"Virtually (online)",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"}
                    ]
        order: 8
        questionQuestionnaireId: $surveyPreQuestionnaireId  
    })
    {
        id
        qu
    }
    question9: createQuestion(input: {
        id: "ca681639-7124-47bf-b9ca-29ace158fc59"
        qu: "From the time of your initial call to the funeral home, how long did it take representatives to arrive to complete the removal of your loved one into their care?"
        type: RADIO
        isSelf: true
        listOptions: [
                {listValue:"Less than an hour",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"},
                {listValue:"Between one and two hours",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"},
                {listValue:"Between two and three hours",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"}
                {listValue:"Three hours or more",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"}
                {listValue:"I don t recall",nextQuestion:"b6577959-fe9a-47c8-a416-c9ac035e54dd"}
                    ]
        order: 9
        questionQuestionnaireId: $surveyPreQuestionnaireId  
    })
    {
        id
        qu
    }
    question10: createQuestion(input: {
        id: "b6577959-fe9a-47c8-a416-c9ac035e54dd"
        qu: "Care to share your name?"
        type: TEXT
        order: 10
        questionQuestionnaireId: $surveyPreQuestionnaireId  
    })
    {
        id
        qu
    }
    createSurvey(input: {
        id: $surveyID
        name: "The Stonemor Survey"
        description: "This survey tests you on your knowledge of The Stonemor."
        image: "https://dynamix-cdn.s3.amazonaws.com/stonemorcom/stonemorcom_616045937.svg"
        archived: false
        groups: ["Stonemor"]
        surveyPreQuestionnaireId: $surveyPreQuestionnaireId
    })
    {
        id
        name
    }
}
`;

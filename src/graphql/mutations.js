/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($UserPoolId: String, $Username: String) {
    deleteUser(UserPoolId: $UserPoolId, Username: $Username)
  }
`;
export const addUserToGroup = /* GraphQL */ `
  mutation AddUserToGroup(
    $UserPoolId: String
    $Username: String
    $GroupName: String
  ) {
    addUserToGroup(
      UserPoolId: $UserPoolId
      Username: $Username
      GroupName: $GroupName
    )
  }
`;
export const addGroup = /* GraphQL */ `
  mutation AddGroup($UserPoolId: String, $GroupName: String) {
    addGroup(UserPoolId: $UserPoolId, GroupName: $GroupName)
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup($UserPoolId: String, $GroupName: String) {
    deleteGroup(UserPoolId: $UserPoolId, GroupName: $GroupName)
  }
`;
export const createSurvey = /* GraphQL */ `
  mutation CreateSurvey(
    $input: CreateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    createSurvey(input: $input, condition: $condition) {
      id
      name
      description
      image
      preQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      mainQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      postQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      archived
      groups
      createdAt
      updatedAt
    }
  }
`;
export const updateSurvey = /* GraphQL */ `
  mutation UpdateSurvey(
    $input: UpdateSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    updateSurvey(input: $input, condition: $condition) {
      id
      name
      description
      image
      preQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      mainQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      postQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      archived
      groups
      createdAt
      updatedAt
    }
  }
`;
export const deleteSurvey = /* GraphQL */ `
  mutation DeleteSurvey(
    $input: DeleteSurveyInput!
    $condition: ModelSurveyConditionInput
  ) {
    deleteSurvey(input: $input, condition: $condition) {
      id
      name
      description
      image
      preQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      mainQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      postQuestionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      archived
      groups
      createdAt
      updatedAt
    }
  }
`;
export const createQuestionnaire = /* GraphQL */ `
  mutation CreateQuestionnaire(
    $input: CreateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    createQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      type
      question {
        items {
          id
          qu
          type
          isSelf
          isDependent
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateQuestionnaire = /* GraphQL */ `
  mutation UpdateQuestionnaire(
    $input: UpdateQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    updateQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      type
      question {
        items {
          id
          qu
          type
          isSelf
          isDependent
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteQuestionnaire = /* GraphQL */ `
  mutation DeleteQuestionnaire(
    $input: DeleteQuestionnaireInput!
    $condition: ModelQuestionnaireConditionInput
  ) {
    deleteQuestionnaire(input: $input, condition: $condition) {
      id
      name
      description
      type
      question {
        items {
          id
          qu
          type
          isSelf
          isDependent
          order
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createQuestion = /* GraphQL */ `
  mutation CreateQuestion(
    $input: CreateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    createQuestion(input: $input, condition: $condition) {
      id
      qu
      type
      isSelf
      isDependent
      listOptions {
        listValue
        nextQuestion
        isText
        isMultiple
      }
      questionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      order
      dependent {
        id
        options {
          dependentValue
          nextQuestion
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateQuestion = /* GraphQL */ `
  mutation UpdateQuestion(
    $input: UpdateQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    updateQuestion(input: $input, condition: $condition) {
      id
      qu
      type
      isSelf
      isDependent
      listOptions {
        listValue
        nextQuestion
        isText
        isMultiple
      }
      questionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      order
      dependent {
        id
        options {
          dependentValue
          nextQuestion
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteQuestion = /* GraphQL */ `
  mutation DeleteQuestion(
    $input: DeleteQuestionInput!
    $condition: ModelQuestionConditionInput
  ) {
    deleteQuestion(input: $input, condition: $condition) {
      id
      qu
      type
      isSelf
      isDependent
      listOptions {
        listValue
        nextQuestion
        isText
        isMultiple
      }
      questionnaire {
        id
        name
        description
        type
        question {
          nextToken
        }
        createdAt
        updatedAt
      }
      order
      dependent {
        id
        options {
          dependentValue
          nextQuestion
        }
      }
      createdAt
      updatedAt
    }
  }
`;
export const createResponses = /* GraphQL */ `
  mutation CreateResponses(
    $input: CreateResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    createResponses(input: $input, condition: $condition) {
      id
      qu {
        id
        qu
        type
        isSelf
        isDependent
        listOptions {
          listValue
          nextQuestion
          isText
          isMultiple
        }
        questionnaire {
          id
          name
          description
          type
          createdAt
          updatedAt
        }
        order
        dependent {
          id
        }
        createdAt
        updatedAt
      }
      res
      group {
        id
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateResponses = /* GraphQL */ `
  mutation UpdateResponses(
    $input: UpdateResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    updateResponses(input: $input, condition: $condition) {
      id
      qu {
        id
        qu
        type
        isSelf
        isDependent
        listOptions {
          listValue
          nextQuestion
          isText
          isMultiple
        }
        questionnaire {
          id
          name
          description
          type
          createdAt
          updatedAt
        }
        order
        dependent {
          id
        }
        createdAt
        updatedAt
      }
      res
      group {
        id
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteResponses = /* GraphQL */ `
  mutation DeleteResponses(
    $input: DeleteResponsesInput!
    $condition: ModelResponsesConditionInput
  ) {
    deleteResponses(input: $input, condition: $condition) {
      id
      qu {
        id
        qu
        type
        isSelf
        isDependent
        listOptions {
          listValue
          nextQuestion
          isText
          isMultiple
        }
        questionnaire {
          id
          name
          description
          type
          createdAt
          updatedAt
        }
        order
        dependent {
          id
        }
        createdAt
        updatedAt
      }
      res
      group {
        id
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createSurveyEntries = /* GraphQL */ `
  mutation CreateSurveyEntries(
    $input: CreateSurveyEntriesInput!
    $condition: ModelSurveyEntriesConditionInput
  ) {
    createSurveyEntries(input: $input, condition: $condition) {
      id
      responses {
        items {
          id
          res
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateSurveyEntries = /* GraphQL */ `
  mutation UpdateSurveyEntries(
    $input: UpdateSurveyEntriesInput!
    $condition: ModelSurveyEntriesConditionInput
  ) {
    updateSurveyEntries(input: $input, condition: $condition) {
      id
      responses {
        items {
          id
          res
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteSurveyEntries = /* GraphQL */ `
  mutation DeleteSurveyEntries(
    $input: DeleteSurveyEntriesInput!
    $condition: ModelSurveyEntriesConditionInput
  ) {
    deleteSurveyEntries(input: $input, condition: $condition) {
      id
      responses {
        items {
          id
          res
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listUsers = /* GraphQL */ `
  query ListUsers($UserPoolId: String) {
    listUsers(UserPoolId: $UserPoolId)
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups($UserPoolId: String) {
    listGroups(UserPoolId: $UserPoolId)
  }
`;
export const listGroupMembers = /* GraphQL */ `
  query ListGroupMembers($UserPoolId: String, $GroupName: String) {
    listGroupMembers(UserPoolId: $UserPoolId, GroupName: $GroupName)
  }
`;
export const getSurvey = /* GraphQL */ `
  query GetSurvey($id: ID!) {
    getSurvey(id: $id) {
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
export const listSurveys = /* GraphQL */ `
  query ListSurveys(
    $filter: ModelSurveyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        preQuestionnaire {
          id
          name
          description
          type
          createdAt
          updatedAt
        }
        mainQuestionnaire {
          id
          name
          description
          type
          createdAt
          updatedAt
        }
        postQuestionnaire {
          id
          name
          description
          type
          createdAt
          updatedAt
        }
        archived
        groups
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getQuestionnaire = /* GraphQL */ `
  query GetQuestionnaire($id: ID!) {
    getQuestionnaire(id: $id) {
      id
      name
      description
      type
      question(limit: 300) {
        items {
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
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listQuestionnaires = /* GraphQL */ `
  query ListQuestionnaires(
    $filter: ModelQuestionnaireFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestionnaires(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getQuestion = /* GraphQL */ `
  query GetQuestion($id: ID!) {
    getQuestion(id: $id) {
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
export const listQuestions = /* GraphQL */ `
  query ListQuestions(
    $filter: ModelQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getResponses = /* GraphQL */ `
  query GetResponses($id: ID!) {
    getResponses(id: $id) {
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
export const listResponsess = /* GraphQL */ `
  query ListResponsess(
    $filter: ModelResponsesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listResponsess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        qu {
          id
          qu
          type
          isSelf
          isDependent
          order
          createdAt
          updatedAt
        }
        res
        group {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSurveyEntries = /* GraphQL */ `
  query GetSurveyEntries($id: ID!) {
    getSurveyEntries(id: $id) {
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
export const listSurveyEntriess = /* GraphQL */ `
  query ListSurveyEntriess(
    $filter: ModelSurveyEntriesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSurveyEntriess(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        responses {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

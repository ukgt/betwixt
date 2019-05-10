//Set up amazon cognito Pool Data

const poolData = {
    UserPoolId: 'us-east-2_FktT3cGei',
    ClientId: '3dkan40tuel0d1r88ntc3384cr'
};

//Initialize Amazon Cognito Identity
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const log = console.log;
/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk'),
      catFacts = require('cat-facts');

const CAT = {
  SKILL_NAME: 'Cat Facts',
  GET_FACT_MESSAGE: "Cat Fact: ",
  HELP_MESSAGE: 'You can say tell me a cat fact, or, you can say exit... What can I help you with?',
  HELP_REPROMPT: 'What can I help you with?',
  STOP_MESSAGE: 'Goodbye!',
};

const handlers = {
  'LaunchRequest': function () {
      this.emit('GetFact');
  },
  'GetNewFactIntent': function () {
      this.emit('GetFact');
  },
  'GetFact': function () {
      const randomFact = catFacts.random();
      const speechOutput = `${CAT.GET_FACT_MESSAGE}${randomFact}`;
      this.emit(':tellWithCard', speechOutput, CAT.SKILL_NAME, randomFact);
  },
  'AMAZON.HelpIntent': function () {
      const speechOutput = HELP.HELP_MESSAGE;
      const reprompt = CAT.HELP_REPROMPT;
      this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
      this.emit(':tell', CAT.STOP_MESSAGE);
  },
  'AMAZON.StopIntent': function () {
      this.emit(':tell', CAT.STOP_MESSAGE);
  },
};

exports.handler = function (event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.registerHandlers(handlers);
  alexa.execute();
};

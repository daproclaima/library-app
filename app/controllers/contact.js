import Controller from '@ember/controller';
import {computed, observer} from '@ember/object';
import {match, not, gte, and, empty} from '@ember/object/computed';

export default Controller.extend({

    emailAddress: '',
    message: '',
    responseMessage: '',


    isValid: and('isLongEnough', 'isEmailAddressMatch'),
    isDisabled: not('isValid'),

    isEmailEmpty: empty('emailAddress'),
    isMessageEmpty: empty('message'),
    isLongEnough: gte('message.length', 5),

    isEmailAddressMatch: match('emailAddress', /^.+@.+\..+$/),


    actualEmailAddress: computed('emailAddress', function () {
        console.log('actualEmailAddress function is called: ', this.get('emailAddress'));

    }),

    emailAddressChanged: observer('emailAddress', function () {
        console.log('observer is called', this.get('emailAddress'));
    }),

    actualMessage: computed('message', function () {
        console.log('actualMessage function is called: ', this.get('message'));
    }),

    messageChanged: observer('message', function () {
        console.log('observer is called', this.get('message'));
        this.actions.emailAddressMatch();
    }),



    actions: {

        emailAddressMatch() {
            Contact.get('isEmailAddressMatch')
        },
        longEnough() {
            Contact.get('isLongEnough')
        },

        sendMessage() {
            alert(`Saving of the following message is in progress...`);
            Contact.set('responseMessage', `Thank you! Here is the message. From ${Contact.get('emailAddress')}; Content: ${Contact.get('message')}`);
            Contact.set('message', ``);
            Contact.get('isLongEnough');
            Contact.set('emailAddress', ``);
            Contact.get('isEmailAddressMatch');
            alert(`We got your message and we’ll get in touch soon`);
        },
    },

});

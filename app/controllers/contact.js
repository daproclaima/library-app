import Controller from '@ember/controller';
import {computed, observer} from '@ember/object';
import {match, not, gte, and} from '@ember/object/computed';


export default Controller.extend({

    emailAddress: '',
    message: '',
    responseMessage: '',
    emailAddressMatch: match('emailAddress', /^.+@.+\..+$/),
    isLongEnough: gte('message.length', '5'),
    isValid:  and('isLongEnough', 'emailAddressMatch'),
    isDisabled: not('isValid'),


    actualEmailAddress: computed('emailAddress', function () {
        console.log('actualEmailAddress function is called: ', this.get('emailAddress'));

    }),

    emailAddressChanged: observer('emailAddress', function () {
        console.log('observer is called', this.get('emailAddress'));
        // console.log('mail matches ', this.get('emailAddressMatch'));
        // console.log('isValid status ', this.get('isValid'));
    }),

    actualMessage: computed('message', function () {
        console.log('actualMessage function is called: ', this.get('message'));
    }),

    messageChanged: observer('message', function () {
        console.log('observer is called', this.get('message'));
        // console.log('long enough ', this.get('isLongEnough'));
        // console.log('isValid status ', this.get('isValid'));
    }),


    actions: {

        sendMessage() {
            alert(`Saving of the following message is in progress...`);
            this.set('responseMessage', `Thank you! Here is the message. From ${this.get('emailAddress')}; Content: ${this.get('message')}`);
            this.set('message', ``);
            this.set('emailAddress', '');
            alert(`We got your message and we’ll get in touch soon`);
        },
    },

});

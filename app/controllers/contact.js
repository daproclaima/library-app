import Controller from '@ember/controller';
import {computed, observer} from '@ember/object';
import {match, not, gte, and, empty} from '@ember/object/computed';


export default Controller.extend({

    emailAddress: '',
    message: '',
    responseMessage: '',


    isValid:  and('isLongEnough', 'isEmailAddressMatch'),
    isDisabled: not('isValid'),

    isLongEnough:'',
    isEmailAddressMatch:'',


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
        this.actions.emailAddressMatch();
        // console.log('long enough ', this.get('isLongEnough'));
        // console.log('isValid status ', this.get('isValid'));
    }),

    actualEmailAddressMatch: computed('isEmailAddressMatch', function () {
        console.log('actualEmailAddressMatch function is called: ', this.get('isEmailAddressMatch'));
    }),

    emailAddressMatchChanged: observer('isEmailAddressMatch', function () {
        console.log('observer is called', this.get('isEmailAddressMatch'));
        this.actions.emailAddressMatch();
        // console.log('mail matches ', this.get('emailAddressMatch'));
        // console.log('isValid status ', this.get('isValid'));
    }),

    actualIsLongEnough: computed('isLongEnough', function () {
        console.log('actualIsLongEnough function is called: ', this.get('isLongEnough'));
        actions.longEnough();

    }),

    isLongEnoughChanged: observer('isLongEnough', function () {
        console.log('observer is called', this.get('isLongEnough'));

        // console.log('mail matches ', this.get('emailAddressMatch'));
        // console.log('isValid status ', this.get('isValid'));
    }),


    actions: {

        emailAddressMatch(){
                this.set('isEmailAddressMatch', match('emailAddress', /^.+@.+\..+$/));
        },
        longEnough(){
                this.set('isLongEnough', gte('message.length', 5));
        },
        sendMessage() {
            alert(`Saving of the following message is in progress...`);
            this.set('responseMessage', `Thank you! Here is the message. From ${this.get('emailAddress')}; Content: ${this.get('message')}`);
            this.set('message', ``);
            this.set('emailAddress', ``);
            alert(`We got your message and we’ll get in touch soon`);
        },
    },

});

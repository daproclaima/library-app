import { computed, observer } from '@ember/object';
// import { empty } from '@ember/object/computed';
import { match, not } from '@ember/object/computed';
import Controller from '@ember/controller';


export default Controller.extend({

    headerMessage: 'Heey, welcome on my first ember test app!',


    emailAddress: '',
    firstName: '',
    lastName: '',
    birthday: '',
    male: 'Male',
    female: 'Female',

    /*isDisabled: computed('emailAddress', function() {
        return this.get('emailAddress') === '';
    }),*/
    //short-hand
    // isDisabled: empty('emailAddress'),
    //replaced by this
    isValid: match('emailAddress', /^.+@.+\..+$/),
    isDisabled: not('isValid'),

    responseMessage: '',


    actualEmailAddress: computed('emailAddress', function() {
        console.log('actualEmailAddress function is called: ', this.get('emailAddress'));
    }),

    emailAddressChanged: observer('emailAddress', function() {
        console.log('observer is called', this.get('emailAddress'));
    }),


    ActualFirstName: computed('firstName', function() {
        console.log('actualFirstName function is called: ', this.get('firstName'));
    }),

    firstNameChanged: observer('firstName', function() {
        console.log('observer is called', this.get('firstName'));
    }),


    ActualLastName: computed('lastName', function() {
        console.log('actualLastName function is called: ', this.get('lastName'));
    }),

    lastNameChanged: observer('lastName', function() {
        console.log('observer is called', this.get('lastName'));
    }),


    ActualBirthday: computed('birthday', function() {
        console.log('actualBirthday function is called: ', this.get('birthday'));
    }),

    birhtdayChanged: observer('birthday', function() {
        console.log('observer is called', this.get('birthday'));
    }),


    actions: {

        // saveInvitation() {
        //     alert(`Saving of the following email address is in progress: ${this.get('emailAddress')}`);
        //     this.set('responseMessage', `Thank you! We've just saved your email address: ${this.get('emailAddress')}`);
        //     this.set('emailAddress', '');
        // },
        saveInvitation() {
            const email = this.get('emailAddress');

            const newInvitation = this.store.createRecord('invitation', { email: email });
            newInvitation.save();

            this.set('responseMessage', `Thank you! We have just saved your email address: ${this.get('emailAddress')}`);
            this.set('emailAddress', '');
        }
    },

});
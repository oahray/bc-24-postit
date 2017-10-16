import mockery from 'mockery';
import nodemailerMock from 'nodemailer-mock';

const startMockNodemailer = () => {
  // Enable mockery to mock objects
  mockery.enable({
    warnOnUnregistered: false,
  });
  
  /* Once mocked, any code that calls require('nodemailer') 
  will get our nodemailerMock */
  mockery.registerMock('nodemailer', nodemailerMock)
}

startMockNodemailer();
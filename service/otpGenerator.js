const otpGenerator = require('otp-generator');
const { OTP_CONFIG } = require('../config/otp.config');


exports.generateOTP = () => {
    const OTP = otpGenerator.generate(OTP_CONFIG.length, {
        specialChars: OTP_CONFIG.specialChars,
        upperCaseAlphabets: OTP_CONFIG.upperCaseAlphabets
    });
    return OTP;
};

import validator from 'validator';
import moment from 'moment-timezone';
import _ from 'lodash';

export const customValidation = {
    validateEmail: (val) => {
        return validator.isEmail(val) ? true : false;
    },

    validateMobile: (val) => {
        return validator.isMobilePhone(val, 'en-IN') ? true : false;
    },

    validateName: (val) => {
        return validator.isAlpha(val, 'en-US') ? true : false;
    },

    validateDOB: (val, flag = true) => {
        try {
            moment.suppressDeprecationWarnings = true;
            const current = moment(new Date());
            const duration = moment.duration(current.diff(val));
            let yeardiffrence = Math.round(duration.asYears());
            if (validator.isDate(val) == false) {
              return false;
            } else {
            /* else if (yeardiffrence < 13 && flag) {
                return false;
            }*/
              return true;
            }
        } catch (error) {
            return false;
        }
    },

    checkDiffInDate: (initial: Date, final: Date = new Date()) => {
        const from = moment(initial, 'DD/MM/YYYY');
        const to = moment(final, 'DD/MM/YYYY');
        return to.diff(from, 'years');
    },

    validateGrade: (grade: string) => {
        const gradeENUM = ["Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12", "Diploma", "Graduate", "Post Graduate", "Doctrate"];
        return gradeENUM.includes(grade);
    },

    mobileRegexTest: (val) => {
        return new RegExp(/^\+91([0-9]{10})$/).test(val);
    },

    dateFormatter: (date: string, format: string = "DD/MM/YYYY") => {
        try {
            return moment(date).format(format);
        } catch (err) {
            throw new Error(err);
        }
    },

    sheetColumnValidation: function (sheetRow: Object, columnsToMatch: string[]) {
        try {
            // if (!sheetRow) return true;

            // for (const col of columnsToMatch) {
            //     if (!sheetRow[col]) throw new Error('Invalid template.' + col + ' column does not exist.')
            // }

            return _.isEqual(sheetRow, columnsToMatch);
        } catch (err) {
            throw new Error(err);
        }
    },
}
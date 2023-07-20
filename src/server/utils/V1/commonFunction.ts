import moment from "moment-timezone";
import crypto from "crypto";

export const commonFunction = {
    getCurrentDate: () => {
        return moment().tz("UTC").format('YYYY-MM-DD HH:mm:ss');
    },
    getDefaultChildDOB: () => {
        return moment().format("DD/MM/yyyy")
    },
    getChildDOBFormat: (date) => {
        return moment(date,"DD-MM-YYYY").format("DD/MM/yyyy")
    },
    getUniqueReferralCode: () => {
        const head = Date.now().toString(36);
        const tail = Math.random().toString(36).substring(2);
        return `${tail}${head}`.substring(2, 10).toLocaleLowerCase();
    },

    randomString: (length = 8) => {
        let result = '';
        let chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
        let data = result.toLocaleLowerCase().toString();
        return data;
    },

    getTemporaryUniquePass: () => {
        let password = Array(8).fill("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
        if (!/\d/.test(password)) {
            password = `${password}3`;
        }
        if (!password.match(/^[A-Z]*$/)) {
            // matches
            password = `${password}A`;
        }
        if (!password.match(/^[a-z]*$/)) {
            // matches
            password = `${password}a`;
        }
        return password;
    },

    splitName: (name: string) => {
        const UserAttributes = [],
          attributesParam: { FAMILY_NAME?: string; GIVEN_NAME: string; MIDDLE_NAME?: string } = {
            GIVEN_NAME: ''
          };
        const nameArr = name.split(" ");
        let given_name, middle_name, family_name = "";
        if (nameArr.length === 1) {
            given_name = nameArr[nameArr.length - 1];
            attributesParam["GIVEN_NAME"] = given_name;
            UserAttributes.push({ Name: 'given_name', Value: given_name });
        } else if (nameArr.length === 2) {
            given_name = nameArr[0];
            family_name = nameArr[1];
            attributesParam["GIVEN_NAME"] = given_name;
            attributesParam["FAMILY_NAME"] = family_name;
            UserAttributes.push({ Name: 'given_name', Value: given_name });
            UserAttributes.push({ Name: 'family_name', Value: family_name });
        } else {
            given_name = nameArr[0];
            middle_name = nameArr[1];
            family_name = nameArr.slice(2).join(" ");
            attributesParam["GIVEN_NAME"] = given_name;
            attributesParam["MIDDLE_NAME"] = middle_name;
            attributesParam["FAMILY_NAME"] = family_name;
            UserAttributes.push({ Name: 'given_name', Value: given_name });
            UserAttributes.push({ Name: 'middle_name', Value: middle_name });
            UserAttributes.push({ Name: 'family_name', Value: family_name });
        }

        return { UserAttributes, attributesParam };
    },
    generateId: () => {
        return crypto.randomBytes(14).toString("hex") + '' + crypto.randomBytes(2).toString("hex");
    },

    filterDataByKey: (key: string | number, data: Object[], removeKeyValues: string[]): Object[] => {
        return data.filter((attribute: []) => !removeKeyValues.includes(attribute[key]))
    },
    /**
     * bytes: number (should be less than 1GB in equivalent number)
     */
    formatBytes: (bytes) => {
        const k = 1024
        const decimal = 2
        const sizes = ['bytes', 'kb', 'mb']
        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimal))}${sizes[i]}`
    },
    validateDOB: (val: string, flag = true) => {
      moment.suppressDeprecationWarnings = true;
      //const current = moment(new Date());
      //const duration = moment.duration(current.diff(val));
      //const yeardiffrence = Math.round(duration.asYears());
      //const { USER_AGE } = APP_CONSTANT;

      //if (/*yeardiffrence < USER_AGE && */ flag) return false;
      if (moment(val, 'DD/MM/YYYY') > moment.tz('UTC')) return false;
      else return true;
    },
    segregateSubscription: (packages: {}[]) => {
        const studyAboardPlans = [];
        const liveCounsellingPlans = [];
        packages.forEach(function (packageDetail: {
            UserCheckoutSubscription: { ZOHOPLAN_ID: string };
        }) {
            const planId = packageDetail?.UserCheckoutSubscription?.ZOHOPLAN_ID;
            planId.includes('PREMIUM-SA')
                ? studyAboardPlans.push(packageDetail)
                : liveCounsellingPlans.push(packageDetail);
        });
        return {
            studyAboardPlans,
            liveCounsellingPlans
        }
    }
}
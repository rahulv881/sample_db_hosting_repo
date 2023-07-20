interface STATUS {
  CONFIRMED: string;
  UNCONFIRMED: string;
  PENDING: string;
  COMPLETED: string;
  FAILED: string;
}
interface USERTYPE {
  COUNSELOR: string;
  CHILD_B2B: string;
  CHILD_B2C: string;
  CORP_ADMIN: string;
  CORP_USER: string;
  GENERAL_USER: string;
  GROUP_SCHOOL_ADMIN: string;
  SCHOOL_ADMIN: string;
  PARENT: string;
  STUDENT: string;
}

interface MESSAGE {
  SKIP_ROW_MSG: string;
}

interface USER_ATTRIBUTES {
  IS_PREFERENCE_MOBILE: string;
  IS_PREFERENCE_EMAIL: string;
  DB_COLUMN_QUALIFICATION: string;
  GRADE_BUCKET: string;
}

interface JOI_VALIDATION_TYPE {
  ANY_ONLY: string;
  STRING_LENGTH: string;
  STRING_PATTERN: string;
  STRING_EMAIL: string;
  STRING_BASE: string;
  ARRAY_INCLUDE_REQUIRED: string;
  REQUIRED: string;
}

interface GRADE_BUCKET {
  PRIMARY: string;
  SECONDARY: string;
  GRADUATE: string;
  PRIMARY_SUB_GRADE: string[];
  SECONDARY_SUB_GRADE: string[];
  GRADUATE_SUB_GRADE: string[];
  OLD_GRADE: string[];
}

interface COGNITO_USER_ATTRIBUTES {
  givenName: string;
  familyName: string;
  middleName: string;
  phoneNo: string;
  subGrade: string;
  email: string;
  gender: string;
  birthdate: string;
  address: string;
  pin: string;
  question: string;
  answer: string;
}

interface USER_INPUT_KEYS {
  subGrade?: string;
  gradeBucket?: string;
  isPreferenceMobile?: string;
  isPreferenceEmail?: string;
}

interface CHILD_ATTRIBUTES {
  firstName?: string;
  lastName?: string;
  gender?: string;
  birthdate?: string;
  subGrade?: string;
  gradeBucket?: string;
  email?: string;
  phoneNo?: string;
  schoolCode?: string;
  pin?: string;
  sendStatus?: string;
}

interface SUBSCRIPTION_PACKAGE {
  CSMP: string;
  PURSUIT: string;
  PERSONIFY: string;
  PATHWAY: string;
  LMC: string;
  IGNITOR: string;
}

interface IAppConstant {
  USER_AGE: number;
  USER_IMPORT_KEYS: string[];
  NAME_KEYS: string[];
  STATUS: STATUS;
  USERTYPE: USERTYPE;
  MESSAGE: MESSAGE;
  ENTITYREQUEST: string[];
  JOI_VALIDATION_TYPE: JOI_VALIDATION_TYPE;
  GRADE_BUCKET: GRADE_BUCKET;
  COGNITO_USER_ATTRIBUTES: COGNITO_USER_ATTRIBUTES;
  USER_INPUT_KEYS: USER_INPUT_KEYS;
  COGNITO_NAME_KEYS: string[];
  ADDITIONAL_USER_ATTRIBUTES: string[];
  ADDITIONAL_USERDATA: string[];
  CHILD_ATTRIBUTES: CHILD_ATTRIBUTES;
  AC: string;
  SET_PIN_ATTRIBUTES: string[];
  SUBSCRIPTION_PACKAGE: SUBSCRIPTION_PACKAGE;
  LICENSE_VALID_ORDER_COLUMNS: string[];
  SCHEDULED_STATUS: string[];
  STUDENT_VALID_ORDER_COLUMNS: string[];
  DB_ATTRIBUTES: string[];
  COMMON_PARENT_CHILD_ATTRIBUTES: string[];
  CUSTOM_PARENT_ATTRIBUTES: string[];
  CUSTOM_CHILD_ATTRIBUTES: string[];
}

const COMMON_PARENT_CHILD_ATTRIBUTES = [
  'USER_SID',
  'FAMILY_NAME',
  'GIVEN_NAME',
  'MIDDLE_NAME',
  'EMAIL',
  'PHONE_NUMBER',
  'GENDER'
];
export const APP_CONSTANT: IAppConstant = Object.freeze({
  AC: 'AC',
  USER_AGE: 13,
  USER_IMPORT_KEYS: [
    'Parent First Name',
    'Parent Last Name',
    'Parent Phone Number',
    'Parent Email Id',
    'Child First Name',
    'Child Last Name',
    'Child Grade',
    'Child DOB(DD/MM/YYYY)'
  ],
  NAME_KEYS: ['GIVEN_NAME', 'FAMILY_NAME', 'MIDDLE_NAME'],
  STATUS: {
    CONFIRMED: 'CONFIRMED',
    UNCONFIRMED: 'UNCONFIRMED',
    PENDING: 'Pending',
    COMPLETED: 'Completed',
    FAILED: 'Failed'
  },
  USERTYPE: {
    COUNSELOR: 'CCB',
    CHILD_B2B: 'CHB',
    CHILD_B2C: 'CHC',
    CORP_ADMIN: 'COA',
    CORP_USER: 'COP',
    GENERAL_USER: 'GNU',
    GROUP_SCHOOL_ADMIN: 'GSA',
    SCHOOL_ADMIN: 'SAB',
    PARENT: 'PRC',
    STUDENT: 'SNB'
  },
  MESSAGE: {
    SKIP_ROW_MSG:
      'One of the following column value is invalid! (Parent Phone Number, Child Grade, Child DOB)'
  },
  ENTITYREQUEST: [
    'entity_name',
    'entity_street_address',
    'entity_locality',
    'entity_region',
    'entity_country',
    'entity_postal_code',
    'entity_web_address'
  ],
  JOI_VALIDATION_TYPE: {
    ANY_ONLY: 'any.only',
    STRING_LENGTH: 'string.length',
    STRING_PATTERN: 'string.pattern.base',
    STRING_EMAIL: 'string.email',
    STRING_BASE: 'string.base',
    ARRAY_INCLUDE_REQUIRED: 'array.includesRequiredUnknowns',
    REQUIRED: 'any.required'
  },
  GRADE_BUCKET: {
    PRIMARY: '3-8',
    SECONDARY: '9-12',
    GRADUATE: 'UG/PG',
    PRIMARY_SUB_GRADE: [
      'Grade 3rd',
      'Grade 4th',
      'Grade 5th',
      'Grade 6th',
      'Grade 7th',
      'Grade 8th'
    ],
    SECONDARY_SUB_GRADE: ['Grade 9th', 'Grade 10th', 'Grade 11th', 'Grade 12th'],
    GRADUATE_SUB_GRADE: ['Undergraduate', 'Postgraduate'],
    OLD_GRADE: [
      'Grade 5',
      'Grade 6',
      'Grade 7',
      'Grade 8',
      'Grade 9',
      'Grade 10',
      'Grade 11',
      'Grade 12',
      'Diploma',
      'Graduate',
      'Post Graduate',
      'Doctrate'
    ]
  },
  COGNITO_USER_ATTRIBUTES: {
    givenName: 'given_name',
    familyName: 'family_name',
    middleName: 'middle_name',
    phoneNo: 'phone_number',
    subGrade: 'custom:qualification',
    email: 'email',
    gender: 'gender',
    birthdate: 'birthdate',
    address: 'address',
    pin: 'custom:pin',
    question: 'custom:security_question',
    answer: 'custom:answer'
  },
  USER_INPUT_KEYS: {
    subGrade: 'QUALIFICATION',
    gradeBucket: 'GRADE_BUCKET',
    isPreferenceMobile: 'IS_PREFERENCE_MOBILE',
    isPreferenceEmail: 'IS_PREFERENCE_EMAIL'
  },
  COGNITO_NAME_KEYS: [
    'address',
    'email_verified',
    'phone_number_verified',
    'custom:security_question'
  ],
  DB_ATTRIBUTES: [
    'PROFILE',
    'REFERRAL_CODE',
    'IS_PROFILE_UPDATE',
    'VT_USER_OID',
    'USED_CODE',
    'IS_PREFERENCE_MOBILE',
    'IS_PREFERENCE_EMAIL',
    'AUTH_TOKEN',
    'SALT',
    'NATIONALITY'
  ],
  ADDITIONAL_USERDATA: ['custom:pin', 'custom:security_question', 'custom:answer', 'profile'],
  SET_PIN_ATTRIBUTES: ['pin', 'security_question', 'answer'],
  ADDITIONAL_USER_ATTRIBUTES: [
    'address',
    'custom:qualification',
    'custom:pin',
    'custom:security_question',
    'custom:answer'
  ],
  CHILD_ATTRIBUTES: {
    firstName: 'GIVEN_NAME',
    lastName: 'FAMILY_NAME',
    gender: 'GENDER',
    birthdate: 'DOB',
    subGrade: 'QUALIFICATION',
    gradeBucket: 'GRADE_BUCKET',
    email: 'EMAIL',
    phoneNo: 'PHONE_NUMBER',
    pin: 'SECURITY_PIN',
    sendStatus: 'SEND_STATUS'
  },
  SUBSCRIPTION_PACKAGE: {
    CSMP: 'CSMP',
    PURSUIT: 'PURSUIT',
    PERSONIFY: 'PERSONIFY',
    PATHWAY: 'PATHWAY',
    LMC: 'LMC',
    IGNITOR: 'IGNITOR'
  },
  LICENSE_VALID_ORDER_COLUMNS: [
    'CREATED_ON',
    'ZOHOPLAN_ID',
    'NUM_USER',
    'END_DATE',
    'USER_COUNT',
    'AVAILABLE_SEAT'
  ],
  SCHEDULED_STATUS: ['SCHEDULED', 'RESCHEDULED'],
  STUDENT_VALID_ORDER_COLUMNS: ['given_name', 'gender', 'qualification', 'parent_name'],
  COMMON_PARENT_CHILD_ATTRIBUTES,
  CUSTOM_PARENT_ATTRIBUTES: [
    ...COMMON_PARENT_CHILD_ATTRIBUTES,
    'BIRTHDATE',
    'QUALIFICATION',
    'PROFILE'
  ],
  CUSTOM_CHILD_ATTRIBUTES: [
    ...COMMON_PARENT_CHILD_ATTRIBUTES,
    'DOB',
    'CREATED_BY',
    'QUALIFICATION',
    'PROFILE'
  ]
});

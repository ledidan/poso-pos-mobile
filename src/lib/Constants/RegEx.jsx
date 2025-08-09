// Poso Reserved
/* eslint-disable */

// Regular expressions can be found here: http://regexlib.com/Search.aspx?k=phone

const DATE_OF_BIRTH = /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/;
const DATE_OF_BIRTH_VN = /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/;
const US_PHONE_NUMBER = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
const VN_PHONE_NUMBER =  /^(0[3|5|7|8|9])+([0-9]{8})$/; 
const EMAIL = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
const POSTAL_CODE = /^[0-9]{5}([- /]?[0-9]{4})?$/;
const US_STATES = /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/;
const LAST_FOUR_DIGITS_OF_SSN = /^[0-9]{4}$/;
const NINE_DIGITS_OF_US_SSN = /^[0-9]{9}$/;
const WEBSITE = /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const FIVE_DIGITS_NUMBER = /^\d{5}$/;
////////////////////////////////////////////////////////////
// Social Media

const FACEBOOK_LINK = /(?:(?:http|https):\/\/)?(?:www\.)?(facebook).*?\..*?$/;
const GOOGLE_LINK = /(?:(?:http|https):\/\/)?(?:www\.)?google.*?\..*?$|http(s?):\/\/(www\.)?g\.page\/[a-zA-Z0-9_-]+\/(review)?/;
const IG_LINK = /(?:(?:http|https):\/\/)?(?:www\.)?(instagram).*?\..*?$/;
const TRIP_ADVISOR_LINK = /^(?:(?:http|https):\/\/)?(?:www\.)?(tripadvisor).*?\..*?$/;
const YELP_LINK = /(?:(?:http|https):\/\/)?(?:www\.)?(yelp).*?\..*?$/;

const REGEX = {
  DATE_OF_BIRTH,
  EMAIL,
  FACEBOOK_LINK,
  FIVE_DIGITS_NUMBER,
  GOOGLE_LINK,
  VN_PHONE_NUMBER,
  IG_LINK,
  LAST_FOUR_DIGITS_OF_SSN,
  NINE_DIGITS_OF_US_SSN,
  POSTAL_CODE,
  TRIP_ADVISOR_LINK,
  US_PHONE_NUMBER,
  US_STATES,
  WEBSITE,
  YELP_LINK,
};

export default REGEX;

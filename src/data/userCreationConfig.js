/* On top of this, the user will get from ther register form:
FULL NAME,
EMAIL,
PASSWORD

&
from the supabase.auth.signUp
email_verified: false
 phone_verified: false,


*/

const defaultUserData = {
  setup_finished: false,
  subscribed: false,
  subscription_start_date: null,
  subscription_end_date: null,
  cover_url: null,
  display_name: "",
};

export default defaultUserData;

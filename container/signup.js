import React, { Fragment } from "react";
import Auth from "../components/auth";

const SignUpPage = () => {
  return (
    <Fragment>
      <Auth
        image="https://picsum.photos/1100/1100"
        header="Sign-up"
        suHeader="Already have an account?    "
        href="/signin"
        isSignUp={true}
      />
    </Fragment>
  );
};
export default SignUpPage;

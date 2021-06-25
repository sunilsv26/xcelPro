import React, { Fragment, useEffect, useState } from "react";
import Auth from "../components/auth";

const SignIn = () => {
    return (
      <Fragment>
        <Auth
          image="https://picsum.photos/1100/1100"
          header="Sign-In"
          suHeader="Dont  have an account?    "
          href="/signup"
          isSignUp={false}
        />
      </Fragment>
    );
};

export default SignIn;

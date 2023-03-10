import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import axios from 'axios';

const SignUp1 = (props) => {
  const initialState = {
    isLoading: false,
    isSignUpSuccessful: false,
    email: '',
    password: '',
    companyName: ''
  };

  let isSignUpSuccessful = false;
  const sweetAlertHandler = (alert) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: alert.title,
      text: alert.text,
      type: alert.type
    });
  };

  const changeData = (e, input) => {
    initialState[input] = e.target.value;
    console.log(initialState);
  };

  // name: Sørens Test System 3
  // email: sr@eqs.dk
  // password: 123456
  const submitData = () => {
    console.log('submit');
    fetchNewUserAxios();
  };
  const fetchNewUserAxios = async () => {
    await axios
      .post('https://framework.exotech.dk/framework/client/create?apikey=x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+M', {
        frameworkGUID: '{AE2536CD-3067-4346-ABDF-37FC17233C8E}',
        client: {
          name: initialState.companyName
        },
        user: {
          email: initialState.email,
          password: initialState.password
        }
      })

      .then((res) => {
        if (initialState.isSignUpSuccessful) {
          sweetAlertHandler({
            title: 'Check your email!',
            type: 'success',
            text: 'You should have received a confirmation link that will allow you to create new Company User!'
          });
        }
        props.history.push('/sign-up-confirm');
      })
      .catch((err) => {
        sweetAlertHandler({
          title: 'Error',
          type: 'success',
          text: err.message
        });
        console.log('err', err.message);
      });
  };
  //Thank you.
  // We have sent you an activation link by email.
  // Please click the link to active your account.
  // You can then proceed to login to your account.

  //Didn't receive a link?
  //Check your spam folder or click here to send the activation email again.
  console.log(isSignUpSuccessful);
  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="auth-bg">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless">
            <Row className="align-items-center">
              <Col>
                <>
                  <Card.Body className="text-center">
                    <div className="mb-4">
                      <i className="feather icon-user-plus auth-icon" />
                    </div>
                    <h3 className="mb-4">Sign up</h3>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company Name"
                        onChange={(e) => changeData(e, 'companyName')}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <input type="email" className="form-control" placeholder="Email address" onChange={(e) => changeData(e, 'email')} />
                    </div>
                    <div className="input-group mb-4">
                      <input type="password" className="form-control" placeholder="Password" onChange={(e) => changeData(e, 'password')} />
                    </div>
                    <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
                      <input type="checkbox" className="custom-control-input" id="customCheck1" defaultChecked={false} />
                      <label className="custom-control-label" htmlFor="customCheck1">
                        Send me the <Link to="#"> Newsletter</Link> weekly.
                      </label>
                    </div>
                    <button className="btn btn-primary mb-4" onClick={submitData}>
                      Company Sign Up
                    </button>
                    <p className="mb-2">
                      Already have an account?{' '}
                      <NavLink to="/auth/signin-4" className="f-w-400">
                        Login
                      </NavLink>
                    </p>
                  </Card.Body>
                </>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUp1;

import React from 'react';
import axios from 'axios';

import { Card, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';

const ResetPassword1 = () => {
  const initialState = {
    isLoading: false,
    email: ''
  };

  const changeData = (e, input) => {
    initialState[input] = e.target.value;

    console.log(initialState);
  };
  const fetchUserAxios = async () => {
    await axios
      .post('https://framework.exotech.dk/framework/auth/resetPassword?apikey=x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+M', {
        frameworkGUID: '{AE2536CD-3067-4346-ABDF-37FC17233C8E}',
        email: initialState.email
      })

      .then((res) => {
        console.log('res', res);
        // const user = res.value;
        // props.fetchLoginSuccess(user);
      })
      .catch((err) => {
        console.log('err', err.message);
        // props.fetchLoginFailure(err.message);
      });
  };
  const submitData = () => {
    console.log('submit');
    fetchUserAxios();
    // console.log(props.error);
  };

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
            <Row className="align-items-center text-center">
              <Col>
                <Card.Body className="card-body">
                  <div className="mb-4">
                    <i className="feather icon-mail auth-icon" />
                  </div>
                  <h3 className="mb-3 f-w-400">Reset Password</h3>
                  <div className="input-group mb-4">
                    <input type="email" className="form-control" placeholder="Email address" onChange={(e) => changeData(e, 'email')} />
                  </div>
                  <button className="btn btn-primary mb-4" onClick={submitData}>
                    Reset password
                  </button>
                  <p className="mb-0 text-muted">
                    Don’t have an account?{' '}
                    <NavLink to="/auth/signup-1" className="f-w-400">
                      Signup
                    </NavLink>
                  </p>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ResetPassword1;

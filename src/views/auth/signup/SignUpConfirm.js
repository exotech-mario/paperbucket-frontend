import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import axios from 'axios';

const SignUpConfirm = (props) => {
  const initialState = {
    isLoading: false,
    email: '',
    password: '',
    companyName: ''
  };

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
        sweetAlertHandler({
          title: 'Check your email!',
          type: 'success',
          text: 'You should have received a confirmation link that will allow you to create new Company User!'
        });
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
                <div className="py-3 px-2">
                  <Card.Body className="text-center">
                    <div className="mb-4">
                      <i className="feather icon-user-plus auth-icon" />
                    </div>
                    <h3 className="my-4">Thank you!</h3>

                    <h6 className="mb-3">We have sent you an activation link by email.</h6>
                    <h6 className="mb-3">Please click the link to active your account.</h6>
                    <h6 className="mb-3">You can then proceed to login to your account.</h6>
                    <p className="mt-5">
                      Didn't receive a link? <br /> Check your spam folder or <Link onClick={submitData}>click here</Link> to send the
                      activation email again
                    </p>
                  </Card.Body>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUpConfirm;

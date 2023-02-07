import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Breadcrumb from '../../../layouts/AdminLayout/Breadcrumb';
import lock from '../../../assets/images/user/lock.png';
import { fetchLogin, fetchLoginSuccess, fetchLoginFailure } from '../../../redux/login/actions';

const Signin4 = (props) => {
  console.log(props);
  const initialState = {
    isLoading: false,
    email: '',
    password: '',
    error: '',
    user: ''
  };

  // mario@exotech.dk
  // 1234567

  const fetchUserAxios = async () => {
    props.fetchLogin();
    await axios
      .post('https://framework.exotech.dk/framework/auth/login?apikey=x!A%D*G-KaPdSgVkYp3s6v9y/B?E(H+M', {
        frameworkGUID: '{AE2536CD-3067-4346-ABDF-37FC17233C8E}',
        email: initialState.email,
        password: initialState.password
      })

      .then((res) => {
        const user = res.data.value;
        initialState.user = user;
        props.fetchLoginSuccess(user, initialState.email);

        props.history.push('/');
      })
      .catch((err) => {
        initialState.error = err.message;
        console.log('err', err.message);
        props.fetchLoginFailure(err.message);
      });
  };

  const changeData = (e, input) => {
    initialState[input] = e.target.value;
    console.log(initialState);
  };

  const submitData = () => {
    fetchUserAxios();
  };

  return (
    <React.Fragment>
      <Breadcrumb />
      <div className="auth-wrapper">
        <div className="auth-content subscribe">
          <div className="card">
            <div className="row no-gutters">
              <div className="col-md-4 col-lg-6 d-none d-md-flex d-lg-flex theme-bg align-items-center justify-content-center">
                <img src={lock} alt="lock images" className="img-fluid" />
              </div>
              <div className="col-md-8 col-lg-6">
                <div className="card-body text-center">
                  <div className="row justify-content-center">
                    <div className="col-sm-10">
                      <h3 className="mb-4">Login</h3>
                      <div className="input-group mb-3">
                        <input type="email" className="form-control" placeholder="Email" onChange={(e) => changeData(e, 'email')} />
                      </div>
                      <div className="input-group mb-4">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="password"
                          onChange={(e) => changeData(e, 'password')}
                        />
                      </div>
                      <div className="form-group text-left">
                        <div className="checkbox checkbox-fill d-inline">
                          <input
                            type="checkbox"
                            name="checkbox-fill-1"
                            id="checkbox-fill-a1"
                            onChange={(e) => changeData(e, 'credentials')}
                          />
                          <label htmlFor="checkbox-fill-a1" className="cr">
                            Save credentials
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-primary shadow-2 mb-4" onClick={submitData}>
                        Login
                      </button>

                      <p className="mb-2 text-muted">
                        Forgot password? <NavLink to="/auth/reset-password-4">Reset</NavLink>
                      </p>
                      <p className="mb-0 text-muted">
                        Don’t have an account? <NavLink to="/auth/signup-4">Signup</NavLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    email: state.email,
    password: state.password,
    error: state.error,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchLogin: () => dispatch(fetchLogin()),
    fetchLoginSuccess: (user, email) => dispatch(fetchLoginSuccess(user, email)),
    fetchLoginFailure: (err) => dispatch(fetchLoginFailure(err))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin4);

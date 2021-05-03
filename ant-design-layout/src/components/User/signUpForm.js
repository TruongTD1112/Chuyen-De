import React from "react";
import userApi from "../../api/userApi";

class SignUpForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email : '',
            password : '',
            confirmPassword : '',
            firstName : '',
            lastName : '',
            birthday : '',
            class : '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        userApi.signUp(this.state);
    }

    render() {
        return (
            <div class="container">
                <form onSubmit={this.handleSubmit}>
                    <div class="row">
                        <h1 class="text-center">Đăng ký tài khoản</h1>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-sm-3">
                            <h3>Email:</h3>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-control" name='email' value={this.state.email} onChange={this.handleInputChange} placeholder='Email' required="required"/>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-sm-3">
                            <h3>Mật khẩu:</h3>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-control" type='password' name='password' value={this.state.password} onChange={this.handleInputChange} placeholder='Password' required="required"/>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-sm-3">
                            <h3>Nhập lại mật khẩu:</h3>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-control" type='password' name='confirmPassword' value={this.state.confirmPassword} onChange={this.handleInputChange} placeholder='Password' required="required"/>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-sm-3">
                            <h3>Họ và tên đệm:</h3>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-control" name='firstName' value={this.state.firstName} onChange={this.handleInputChange} placeholder='Họ và tên đệm' required="required"/>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-sm-3">
                            <h3>Tên:</h3>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-control" name='lastName' value={this.state.lastName} onChange={this.handleInputChange} placeholder='Tên' required="required"/>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-sm-3">
                            <h3>Ngày sinh:</h3>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-control" type='date' name='birthday' value={this.state.birthday} onChange={this.handleInputChange} required="required"/>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <div class="col-sm-3">
                            <h3>Lớp:</h3>
                        </div>
                        <div class="col-sm-9">
                            <input class="form-control" name='class' value={this.state.class} onChange={this.handleInputChange} placeholder='Lớp' required="required"/>
                        </div>
                    </div>
                    <br></br>
                    <div class="row">
                        <button type="submit" class="btn btn-primary my-1 center-block">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignUpForm;
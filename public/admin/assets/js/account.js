
// validate login form
const loginForm = document.querySelector('#loginForm');
if(loginForm){
  const validator = new JustValidate('#loginForm');
  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập email"
        
     },
      {
        rule: 'email',
        errorMessage:"Vui lòng nhập email đúng định dạng"
     },
    ])
    .addField('#Password', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập mật khẩu"
        
     },
    ])
    
  .onSuccess((event) => {
    const email = event.target.email.value;
    const PassWord = event.target.Password.value;
    const rememberPassword = event.target.rememberPassword.checked;

    const dataFinal = {
      email: email,
      PassWord: PassWord,
      rememberPassword:rememberPassword
    };
    fetch(`/${pathAdmin}/account/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })

      .then(res => res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          notify.success(data.message);
          drawNotify(data.code,data.message);
          window.location.href = `/${pathAdmin}/dashboard`;
        }
       })
  })
}
// validate login form

// validate register form
const registerForm = document.querySelector('#registerForm');
if(registerForm){
  const validator = new JustValidate('#registerForm');
  validator
    .addField('#fullname', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập Họ tên"
        
     },
      {
        validator: (value) => {
          const words = value.trim().split(/\s+/);
          const regex = /^[a-zA-ZÀ-ỹ]+$/i; 
          // tên có ít nhất 2 chữ cái, chỉ chứa chữ cái và khoảng trắng
          return words.length >= 2 && words.every(word => regex.test(word));
        },
        errorMessage: "Họ tên không hợp lệ ( ít nhất 2 chữ cái)"
      },
    ])
    .addField('#email', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập email"
     },
     {
        rule: 'email',
        errorMessage:"Vui lòng nhập email đúng định dạng"
     },
    ])
     .addField('#Password', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập mật khẩu, mật khẩu ít nhất 8 ký tự bao gồm chữ in hoa, chữ thường, kí tự đặc biệt và số"
     },
     {
        rule: 'customRegexp',
        value:/^.{8,}$/,
        errorMessage:"Mật khẩu cần ít nhất 8 kí tự"
     },
      {
        rule: 'customRegexp',
        value:/^(?=.*[A-Z])/,
        errorMessage:"Mật khẩu cần ít nhất một chữ in hoa"
     },
      {
        rule: 'customRegexp',
        value:/^(?=.*[a-z])/,
        errorMessage:"Mật khẩu cần ít nhất một chữ thường"
     },
      {
        rule: 'customRegexp',
        value:/^(?=.*\d)/,
        errorMessage:"Mật khẩu cần ít nhất một chữ số"
     },
     
    ])
     .addField('#agree', [
      {
        rule: 'required',
        errorMessage:"Vui lòng chấp nhận để đăng ký tài khoản"
     },
    ])
  .onSuccess((event) => {
    const fullname = event.target.fullname.value;
    const email = event.target.email.value;
    const Password = event.target.Password.value;
    const dataFinal = {
      fullname: fullname,
      email: email,
      Password:Password
    };
    console.log(dataFinal)
    fetch(`/${pathAdmin}/account/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })

      .then(res => res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          drawNotify(data.code,data.message);
          window.location.href = `/${pathAdmin}/account/register-initial`;
        }
       })
  })
}
// validate register form

// validate forget password
const forgetPassword = document.querySelector('#forgetPassword');
if(forgetPassword){
  const validator = new JustValidate('#forgetPassword');
  validator
    .addField('#email', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập email"
        
     },
      {
        rule: 'email',
        errorMessage:"Vui lòng nhập email đúng định dạng"
     },
    ])
  .onSuccess((event) => {
    const email = event.target.email.value;
    const dataFinal = {
      email: email,
    };
    fetch(`/${pathAdmin}/account/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })

      .then(res => res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          notify.success(data.message);
          drawNotify(data.code,data.message);
          window.location.href = `/${pathAdmin}/account/OTP?email=${email}`;
        }
      })
  })
}
// validate forget password

// validate OTP
const formOTP = document.querySelector('#formOTP');
if(formOTP){
  const validator = new JustValidate('#formOTP');
  validator
    .addField('#otp', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập OTP"
        
     },
       {
        rule: 'customRegexp',
        value:/^\d{4}$/,
        errorMessage:"mã OTP không đúng định dạng"
     },
    ])
  .onSuccess((event) => {
    const otp = event.target.otp.value;
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const dataFinal = {
      email: email,
      otp:otp
    };

    fetch(`/${pathAdmin}/account/otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })

      .then(res => res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          drawNotify(data.code,data.message);
          window.location.href = `/${pathAdmin}/account/reset-password`;
        }
       })
  })
}
// validate OTP

// validate change password
const resetPassword = document.querySelector('#resetPassword');
if (resetPassword) {
  const validator = new JustValidate('#resetPassword');

  validator
    .addField('#password', [
      {
        rule: 'required',
        errorMessage: "Vui lòng nhập mật khẩu",
      },
      {
        rule: 'customRegexp',
        value: /^.{8,}$/,
        errorMessage: "Mật khẩu cần ít nhất 8 ký tự",
      },
      {
        rule: 'customRegexp',
        value: /^(?=.*[A-Z]).+$/,
        errorMessage: "Mật khẩu cần ít nhất một chữ in hoa",
      },
      {
        rule: 'customRegexp',
        value: /^(?=.*[a-z]).+$/,
        errorMessage: "Mật khẩu cần ít nhất một chữ thường",
      },
      {
        rule: 'customRegexp',
        value: /^(?=.*\d).+$/,
        errorMessage: "Mật khẩu cần ít nhất một chữ số",
      },
      {
        rule: 'customRegexp',
        value: /^(?=.*[^A-Za-z0-9]).+$/,
        errorMessage: "Mật khẩu cần ít nhất một ký tự đặc biệt",
      },
    ])

    .addField('#ConfirmPassword', [
      {
        rule: 'required',
        errorMessage: "Vui lòng xác nhận mật khẩu",
      },
      {
        validator: (value, context) => {
          const password = context['#password'].elem.value;
          return value === password;
        },
        errorMessage: "Mật khẩu xác nhận không trùng khớp",
      },
    ])

    .onSuccess((event) => {
      const password = event.target.password.value;

      const dataFinal = {
      password:password
    };

    fetch(`/${pathAdmin}/account/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataFinal)
      })

      .then(res => res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          drawNotify(data.code,data.message);
          window.location.href = `/${pathAdmin}/dashboard`;
        }
       })
    });
}

// validate change password
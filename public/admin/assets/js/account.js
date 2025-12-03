// Khởi tạo Notyf
var notify = new Notyf({
  duration: 3000,
  position: {
    x:'right',
    y:'top'
  },
  dismissible: true
});

// Hiển thị thông báo trong sessionStorage
let notifySession = sessionStorage.getItem("notify");
if(notifySession) {
  notifySession = JSON.parse(notifySession);
  if(notifySession.code == "error") {
    notify.error(notifySession.message);
  }
  if(notifySession.code == "success") {
    notify.success(notifySession.message);
  }
  sessionStorage.removeItem("notify");
}

// Vẽ thông báo
const drawNotify = (code, message) => {
  const data = {
    code: code,
    message: message
  };
  sessionStorage.setItem("notify", JSON.stringify(data));
}
// End Khởi tạo Notyf



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
    const passWord = event.target.Password.value;
    const rememberPassword = event.target.rememberPassword.checked;
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
        value:/^\d{6}$/,
        errorMessage:"mã OTP không đúng định dạng"
     },
    ])
  .onSuccess((event) => {
    const otp = event.target.otp.value;
  })
}
// validate OTP

// validate change password
const resetPassword = document.querySelector('#resetPassword');
if (resetPassword) {
  const validator = new JustValidate('#resetPassword');

  validator
    .addField('#NewPassword', [
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
          const password = context['#NewPassword'].elem.value;
          return value === password;
        },
        errorMessage: "Mật khẩu xác nhận không trùng khớp",
      },
    ])

    .onSuccess((event) => {
      const NewPassword = event.target.NewPassword.value;
    });
}

// validate change password
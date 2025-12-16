//  TinyMCE
const initTinyMce = (selector)=>{
   tinymce.init({
    selector: selector,
    plugins: ["anchor", "link", "charmap", "image", "lists", "media"],
    toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | link anchor charmap image numlist bullist media',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' },
    ],
    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
    uploadcare_public_key: 'be3930604db362b11b27',
  });
}
initTinyMce('textarea[textarea_mce]');


// menu mobile 
const buttonMenuMobile = document.querySelector(".header .inner-button i");
if(buttonMenuMobile){
  const sider = document.querySelector(".sider")
  const overlay = document.querySelector(".overlay")
  buttonMenuMobile.addEventListener("click",()=>{
    sider.classList.toggle("active");
    overlay.classList.toggle("active");
  })
  overlay.addEventListener("click", ()=>{
    sider.classList.remove("active");
    overlay.classList.remove("active");
  })
}
// menu mobile 




// FilePond for image upload
const filePondImage = document.querySelectorAll("[filepondImage]");
const filePond = {}
if (filePondImage.length > 0) {
  FilePond.registerPlugin(FilePondPluginImagePreview);
  FilePond.registerPlugin(FilePondPluginFileValidateType);
  filePondImage.forEach(item => {
    const imageDefault = item.getAttribute("image-default");
    let files = null
    if(imageDefault){
      files = [
        {
          source:imageDefault
        }
      ]
    }
    filePond[item.name]=FilePond.create(item, {
      labelIdle: "+",
      acceptedFileTypes: ["image/*"],
      files:files
    });
  });
}

// chart dashBoard
const ctx = document.getElementById('revenue-chart');
if(ctx){
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['01', '02', '03', '04', '05', '06'],
      datasets: [{
        label: 'Tháng 10/2025',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1.5,
        borderColor: "#36A1EA"
      }, 
      {
        label: 'Tháng 9/2025',
        data: [10, 12, 4, 7, 5, 1],
        borderWidth: 1.5,
        borderColor: "#FE6383"
      }, 
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      maintainAspectRatio: false,
    }
  });
}
  

// validate category-create form
const categoryForm = document.querySelector('#categoryForm');
if(categoryForm){
  const validator = new JustValidate('#categoryForm');
  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập tên danh mục"
        
     },
    ])
  .onSuccess((event) => {
    const name = event.target.name.value;
    const parent = event.target.parent.value;
    const position = event.target.position.value;
    const status = event.target.status.value;
    const avatar = filePond.avatar.getFile()?.file;
    const desc = tinymce.get("desc").getContent();

    // tạo FormData
    const formData = new FormData();
    formData.append("name",name);
    formData.append("parent",parent);
    formData.append("position",position);
    formData.append("status",status);
    formData.append("avatar",avatar);
    formData.append("desc",desc);

    fetch(`/${pathAdmin}/category/create`,{
      method:"POST",
      body:formData
    })
      .then(res=> res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          drawNotify(data.code,data.message);
          window.location.reload(); 
        }
       })
  })
}
// validate category-create form 

// edit category
const categoryEditForm = document.querySelector('#categoryEditForm');
if(categoryEditForm){
  const validator = new JustValidate('#categoryEditForm');
  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập tên danh mục"
        
     },
    ])
  .onSuccess((event) => {
    const id = event.target.id.value;
    const name = event.target.name.value;
    const parent = event.target.parent.value;
    const position = event.target.position.value;
    const status = event.target.status.value;
    const avatar = filePond.avatar.getFile()?.file;
    const desc = tinymce.get("desc").getContent();

    // tạo FormData
    const formData = new FormData();
    formData.append("name",name);
    formData.append("parent",parent);
    formData.append("position",position);
    formData.append("status",status);
    formData.append("avatar",avatar);
    formData.append("desc",desc);
    console.log(formData)

    fetch(`/${pathAdmin}/category/edit/${id}`,{
      method:"PATCH",
      body:formData
    })
      .then(res=> res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          notify.success(data.message);
        }
       })
  })
}
// validate category-edit form 


// validate book-create form d
const formCreateProduct = document.querySelector("#formCreateProduct");
if(formCreateProduct){
  const validator = new JustValidate('#formCreateProduct');
  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập tên Sản phẩm"
     },
    ])
   
    .onSuccess((event) => {
    const name = event.target.name.value;
    const parent = event.target.parent.value;
    const position = event.target.position.value;
    const status = event.target.status.value;
    const avatar = filePond.avatar.getFile()?.file;
    const time = event.target.time.value;
    const amount = event.target.amount.value;
    const priceOld = event.target.priceOld.value;
    const priceNew = event.target.priceNew.value;
    const author = event.target.author.value;
    const infor = tinymce.get("infor").getContent();

    // tạo FormData
    const formData = new FormData();
    formData.append("name",name);
    formData.append("parent",parent);
    formData.append("position",position);
    formData.append("status",status);
    formData.append("avatar",avatar);
    formData.append("time",time);
    formData.append("amount",amount);
    formData.append("priceOld",priceOld);
    formData.append("priceNew",priceNew);
    formData.append("author",author);
    formData.append("infor",infor);

    fetch(`/${pathAdmin}/books/create`,{
      method:"POST",
      body:formData
    })
      .then(res=> res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          drawNotify(data.code,data.message);
          window.location.reload();
        }
      })
  })

}
// validate book-create form 


// edit book
const formEditProduct = document.querySelector("#formEditProduct");
if(formEditProduct){
  const validator = new JustValidate('#formEditProduct');
  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập tên Sản phẩm"
     },
    ])
   
    .onSuccess((event) => {
    const id = event.target.id.value;
    const name = event.target.name.value;
    const parent = event.target.parent.value;
    const position = event.target.position.value;
    const status = event.target.status.value;
    const avatar = filePond.avatar.getFile()?.file;
    const time = event.target.time.value;
    const amount = event.target.amount.value;
    const priceOld = event.target.priceOld.value;
    const priceNew = event.target.priceNew.value;
    const author = event.target.author.value;
    const infor = tinymce.get("infor").getContent();

    // tạo FormData
    const formData = new FormData();
    formData.append("name",name);
    formData.append("parent",parent);
    formData.append("position",position);
    formData.append("status",status);
    formData.append("avatar",avatar);
    formData.append("time",time);
    formData.append("amount",amount);
    formData.append("priceOld",priceOld);
    formData.append("priceNew",priceNew);
    formData.append("author",author);
    formData.append("infor",infor);

    fetch(`/${pathAdmin}/books/edit/${id}`,{
      method:"PATCH",
      body:formData
    })
      .then(res=> res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          notify.success(data.message);
        }
      })
  })

}
// validate order form
const orderEdit = document.querySelector("#orderEdit");
if(orderEdit){
  const validator = new JustValidate('#orderEdit');

  validator 
    .addField("#name", [
      {
        rule: "required", 
        errorMessage: "Vui lòng nhập Họ tên"
      },
        {
        rule: "minLength", 
        value: 3,
        errorMessage: "Vui lòng nhập ít nhất 3 ký tự!"
      },
    ])
     .addField("#numberPhone", [
      {
        rule: "required", 
        errorMessage: "Vui lòng nhập số điện thoại"
      },
       {
        rule: "customRegexp", 
        value:/^(?:\+84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-9]|9[0-9])[0-9]{7}$/,
        errorMessage: "Vui lòng nhập số điện thoại đúng định dạng"
      },
    ])
    .addField("#email", [
      {
        rule: "required", 
        errorMessage: "Vui lòng nhập Email"
      },
        {
        rule: "email", 
        errorMessage: "Vui lòng nhập Email đúng định dạng"
      },
    ])
    .onSuccess((event)=>{
      const name = event.target.name.value;
      const email = event.target.email.value;
      const numberPhone = event.target.numberPhone.value;
      const note = event.target.note.value;
      const paymentMethod = event.target.paymentMethod.value;
      const paymentStatus = event.target.paymentStatus.value;
      const status = event.target.status.value;

    })
}
// validate order form

// validate information user form
const formInfomationUser = document.querySelector("#formInfomationUser");
if(formInfomationUser){
  const validator = new JustValidate('#formInfomationUser');
   validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập Họ tên"
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
  .onSuccess((event) => {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const numberPhone = event.target.numberPhone.value;
    const avatar = filePond.avatar.getFile()?.file;
  })
}
// validate information form

// validate change passWord
const changePasswordManger = document.querySelector('#changePasswordManger');
if (changePasswordManger) {
  const validator = new JustValidate('#changePasswordManger');

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
// validate change passWord

// validate form website information
const formWebsiteInformation = document.querySelector('#formWebsiteInformation');
if(formWebsiteInformation){
  const validator = new JustValidate('#formWebsiteInformation');
  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập tên website"
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
     }
    ])
    .addField('#numberPhone', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập số điện thoại"
     },
    ])
     .onSuccess((event) => {
    const name = event.target.name.value;
    const email = event.target.email.value;
    const numberPhone = event.target.numberPhone.value;
    const place = event.target.place.value;
    const logo = filePond.logo.getFile()?.file;
    const favicon = filePond.favicon.getFile()?.file;
    
    const formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("numberPhone",numberPhone);
    formData.append("place",place);
    formData.append("logo",logo);
    formData.append("favicon",favicon);
    fetch(`/${pathAdmin}/settings/info`,{
      method:"PATCH",
      body:formData
    })
      .then(res=> res.json())
      .then(data => {
        if(data.code=="error"){
          notify.error(data.message);
        }
        if(data.code=="success"){
          drawNotify(data.code,data.message);
          window.location.reload();
        }
      })
    
  })
}
// validate form website information

// validate form website account manager
const settingAccountManager = document.querySelector('#settingAccountManager');
if(settingAccountManager){
  const validator = new JustValidate('#settingAccountManager');
  validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập Họ tên"
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
     }
    ])
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
    .addField('#level', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập chức vụ"
     },
    ])
     .onSuccess((event) => {
      const name = event.target.name.value;
      const email = event.target.email.value;
      const numberPhone = event.target.numberPhone.value;
      const role = event.target.role.value;
      const level = event.target.level.value;
      const status = event.target.status.value;
      const password = event.target.password.value;
      const avatar = filePond.avatar.getFile()?.file;
  })
}
// validate form website account manager

// validate role
const settingRoleForm = document.querySelector("#settingRoleForm");
if(settingRoleForm){
  const validator = new JustValidate('#settingRoleForm');
   validator
    .addField('#name', [
      {
        rule: 'required',
        errorMessage:"Vui lòng nhập tên quyền"
     },
    ])
  .onSuccess((event) => {
    const name = event.target.name.value;
    const desc = event.target.desc.value;
    const permissions = [];
    // permissions
    const ListPermissionsCheck = document.querySelectorAll(`[name="permissions"]:checked`);
    ListPermissionsCheck.forEach(item=>{
      permissions.push(item.value);
    })
    // permissions
    const dataFinal = {
      name:name,
      desc:desc,
      permissions:permissions
    }
    fetch(`/${pathAdmin}/settings/createRole`, {
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
          window.location.reload();
        }
       })
  })
}
// validate role

// edit role
const settingEditRoleForm = document.querySelector("#settingEditRoleForm");
if(settingEditRoleForm) {
  const validator = new JustValidate('#settingEditRoleForm');

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Vui lòng nhập tên nhóm quyền!"
      },
    ])
    .onSuccess((event) => {
      const id = event.target.id.value;
      const name = event.target.name.value;
      const desc = event.target.desc.value;
      const permissions = [];

      // permissions
      const listPermissionChecked = document.querySelectorAll(`[name="permissions"]:checked`);
      listPermissionChecked.forEach(input => {
        permissions.push(input.value);
      })
      // End permissions

      const dataFinal = {
        name: name,
        desc: desc,
        permissions: permissions,
      };

      fetch(`/${pathAdmin}/settings/roleEdit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFinal),
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            notify.error(data.message);
          }

          if(data.code == "success") {
            notify.success(data.message);
          }
        })
    })
}

// edit role






// sider
const sider = document.querySelector(".sider");
if(sider){
  const pathNameCurrent = window.location.pathname;
  const pathNameCurrentSplit = pathNameCurrent.split("/");
  const menuList = sider.querySelectorAll("a");
  menuList.forEach(item =>{
    const pathName = item.getAttribute("href");
    const pathNameSplit = pathName.split("/");
    if(pathNameCurrentSplit[1] == pathNameSplit[1] && pathNameCurrentSplit[2] == pathNameSplit[2]){
      item.classList.add("active");
    }
  })
}
// sider

// button undo
const listButtonUndo = document.querySelectorAll("[buttonUndo]");
if(listButtonUndo.length > 0) {
  listButtonUndo.forEach(button => {
    button.addEventListener("click", () => {
      const dataApi = button.getAttribute("data-api");
      fetch(dataApi, {
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            notify.error(data.message);
          }

          if(data.code == "success") {
            drawNotify(data.code, data.message);
            window.location.reload();
          }
        })
    })
  })
}
// button undo


// button delete
const listButtonDelete = document.querySelectorAll("[buttonDelete]");
if(listButtonDelete.length > 0) {
  listButtonDelete.forEach(button => {
    button.addEventListener("click", () => {
      const dataApi = button.getAttribute("data-api");
      fetch(dataApi, {
        method: "PATCH"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            notify.error(data.message);
          }

          if(data.code == "success") {
            drawNotify(data.code, data.message);
            window.location.reload();
          }
        })
    })
  })
}
// button delete
// button remove
const listButtonRemove = document.querySelectorAll("[buttonRemove]");
if(listButtonRemove.length > 0) {
  listButtonRemove.forEach(button => {
    button.addEventListener("click", () => {
      window.confirmDialog(
        "Bạn có chắc chắn muốn xóa vĩnh viễn bản ghi này khỏi cơ sở dữ liệu? Hành động này không thể hoàn tác!",
        function() {
          const dataApi = button.getAttribute("data-api");
          fetch(dataApi, {
            method: "DELETE"
          })
            .then(res => res.json())
            .then(data => {
              if(data.code == "error") {
                notify.error(data.message);
              }
              if(data.code == "success") {
                drawNotify(data.code, data.message);
                window.location.reload();
              }
            })
        }
      );
    })
  })
}
// button remove

//filter-status
const filterStatus = document.querySelector("[filter-status]");
if(filterStatus){
  const url = new URL(window.location.href);
  filterStatus.addEventListener("change", () => {
    const value = filterStatus.value;
    if(value){
      url.searchParams.set("status",value);
    }else{
       url.searchParams.delete("status");
    }
    window.location.href=url.href
  })
  // hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("status");
  if(valueCurrent){
    filterStatus.value=valueCurrent 
  }
}
//filter-status
// filter-createdBy
const filterCreatedBy = document.querySelector("[filter-created-by]");
if(filterCreatedBy){
  const url = new URL(window.location.href);
  filterCreatedBy.addEventListener("change", () => {
    const value = filterCreatedBy.value;
    if(value){
      url.searchParams.set("createdBy",value);
    }else{
       url.searchParams.delete("createdBy");
    }
    window.location.href=url.href
  })
  // hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("createdBy");
  if(valueCurrent){
    filterCreatedBy.value=valueCurrent 
  }
}
// filter-createdBy

// filter start-date
const filterStartDate = document.querySelector("[filter-start-date]");
if(filterStartDate){
  const url = new URL(window.location.href);
  filterStartDate.addEventListener("change", () => {
    const value = filterStartDate.value;
    if(value){
      url.searchParams.set("startDate",value);
    }else{
       url.searchParams.delete("startDate");
    }
    window.location.href=url.href
  })
  // hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("startDate");
  if(valueCurrent){
    filterStartDate.value=valueCurrent 
  }
}
// filter start-date
// filter end-date
const filterEndtDate = document.querySelector("[filter-end-date]");
if(filterEndtDate){
  const url = new URL(window.location.href);
  filterEndtDate.addEventListener("change", () => {
    const value = filterEndtDate.value;
    if(value){
      url.searchParams.set("endDate",value);
    }else{
       url.searchParams.delete("endDate");
    }
    window.location.href=url.href
  })
  // hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("endDate");
  if(valueCurrent){
    filterEndtDate.value=valueCurrent 
  }
}
// filter end-date




// check all
const inputCheckAll = document.querySelector(`input[name="checkAll"]`);
if(inputCheckAll){
  inputCheckAll.addEventListener("click", () => {
    const listInputChecked = document.querySelectorAll(`input[name="checkItem"]`)
    listInputChecked.forEach(input => {
      input.checked = inputCheckAll.checked;
    })
  })
  
}
// check all

// changeMulti
const changeMulti = document.querySelector("[change-multi]");
if(changeMulti) {
  const button = changeMulti.querySelector("button");
  const select = changeMulti.querySelector("select");
  const dataApi = changeMulti.getAttribute("data-api");

  button.addEventListener("click", () => {
    const listInputChecked = document.querySelectorAll(`input[name="checkItem"]:checked`);
    const listId = [];
    listInputChecked.forEach(input => {
      listId.push(input.value);
    });
    const option = select.value;

    if(listId.length == 0) {
      notify.error("Vui lòng chọn ít nhất 1 bản ghi!");
      return;
    }

    if(!option) {
      notify.error("Vui lòng chọn hành động để áp dụng!");
      return;
    }

    const dataFinal = {
      listId: listId,
      option: option
    };

    // Xác nhận trước khi xóa vĩnh viễn
    if(option === 'remove') {
      window.confirmDialog(
        "Bạn có chắc chắn muốn xóa vĩnh viễn các bản ghi đã chọn? Hành động này không thể hoàn tác!",
        function() {
          fetch(dataApi, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(dataFinal)
          })
            .then(res => res.json())
            .then(data => {
              if(data.code == "error") {
                notify.error(data.message);
              }
              if(data.code == "success") {
                drawNotify(data.code, data.message);
                window.location.reload();
              }
            })
        }
      );
      return;
    }

    // Các thao tác khác gửi req luôn
    fetch(dataApi, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataFinal)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error") {
          notify.error(data.message);
        }
        if(data.code == "success") {
          drawNotify(data.code, data.message);
          window.location.reload();
        }
      })
  })
}
// changeMulti

// input search 
const inputSearch = document.querySelector("[search]");
if(inputSearch){
  const url = new URL ( window.location.href);
  inputSearch.addEventListener("keyup", (event)=>{
    if(event.code=="Enter"){
      const value = inputSearch.value;
      if(value){
        url.searchParams.set("keyword",value);
      }else{
        url.searchParams.delete("keyword");
      }
      window.location.href=url.href
    }
  })
  const valueCurrent = url.searchParams.get("keyword");
  if(valueCurrent){
    inputSearch.value=valueCurrent 
  }
}
// input search 
// filter reset
const filterReset =  document.querySelector("[filter-reset]")
if(filterReset){
  const url = new URL ( window.location.href)
  filterReset.addEventListener("click", () => {
    url.searchParams.delete("status");
    url.searchParams.delete("createdBy");
    url.searchParams.delete("startDate");
    url.searchParams.delete("endDate");
    url.searchParams.delete("keyword");
    window.location.href=url.href
  })
}
// filter reset

//box-pagination
const boxPagination = document.querySelector("[box-pagination]");
if(boxPagination){
  const url = new URL(window.location.href);
  boxPagination.addEventListener("change", () => {
    const value = boxPagination.value;
    if(value){
      url.searchParams.set("page",value);
    }else{
      url.searchParams.delete("page");
    }
    window.location.href=url.href
  })
  // hiển thị lựa chọn mặc định
  const valueCurrent = url.searchParams.get("page");
  if(valueCurrent){
    boxPagination.value=valueCurrent 
  }
}
//box-pagination



module.exports.pathAdmin = "admin";

module.exports.permissions = [
  {
    label:"Xem trang tổng quan",
    value:"dashboard-view"
  },
  {
    label:"Xem danh mục",
    value:"category-view"
  },
  {
    label:"Tạo danh mục",
    value:"category-create"
  },
  {
    label:"Chỉnh sửa danh mục",
    value:"category-edit"
  },
  {
    label:"Xóa danh mục",
    value:"category-trash"
  },
  {
    label:"Xem trang sách",
    value:"book-view"
  },
  {
    label:"Tạo sản phẩm",
    value:"book-create"
  },
  {
    label:"Chỉnh sửa sản phẩm",
    value:"book-edit"
  },
  {
    label:"thùng rác sách",
    value:"book-trash"
  },
  {
    label:"Xem trang đơn hàng",
    value:"order-view"
  },
  {
    label:"Chỉnh sửa đơn hàng",
    value:"order-edit"
  },
  {
    label:"Xóa đơn hàng",
    value:"order-delete"
  },
  {
    label:"Xem trang người dùng",
    value:"user-view"
  },
  {
    label:"Chỉnh sửa người dùng",
    value:"order-edit"
  },
  {
    label:"Xóa người dùng",
    value:"order-delete"
  },
  {
    label:"Xem trang thông tin liên hệ",
    value:"contact-view"
  },
  {
    label:"Xóa thông tin liên hệ",
    value:"contact-delete"
  },
  {
    label:"Chỉnh sửa thông tin website",
    value:"website-edit"
  },
  {
    label:"Quản lý tài khoản quản trị",
    value:"adminAccount"
  },
  {
    label:"Quản lý nhóm quyền",
    value:"role"
  },
 
]


module.exports.paymentMethodList = [
  {
    label: 'Tiền Mặt',
    value: 'money',
  },
  {
    label: 'Chuyển khoản',
    value: 'bank',
  },
  {
    label: 'Zalo pay',
    value: 'zalopay',
  },
  {
    label: 'VNPay',
    value: 'vnpay',
  },
];

module.exports.paymentStatusList = [
  {
    label: 'Chưa thanh toán!',
    value: 'unpaid',
  },
  {
    label: 'Đã thanh toán',
    value: 'paid',
  },
];

module.exports.statusList = [
  {
    label: 'Khởi tạo',
    value: 'initial',
    color: 'orange',
  },
  {
    label: 'Xác nhận',
    value: 'confirm',
    color: 'green',
  },
  {
    label: 'Hoàn thành',
    value: 'done',
    color: 'green',
  },
  {
    label: 'Đã Hủy',
    value: 'cancel',
    color: 'red',
  },
];

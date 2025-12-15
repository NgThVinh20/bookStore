// Hiển thị hộp thoại xác nhận đẹp bằng Notyf
window.confirmDialog = function(message, onConfirm) {
  // Tạo overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100vw';
  overlay.style.height = '100vh';
  overlay.style.background = 'rgba(0,0,0,0.3)';
  overlay.style.zIndex = 9999;

  // Tạo hộp thoại
  const dialog = document.createElement('div');
  dialog.style.position = 'fixed';
  dialog.style.top = '50%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, -50%)';
  dialog.style.background = '#fff';
  dialog.style.borderRadius = '8px';
  dialog.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2)';
  dialog.style.padding = '32px 24px 16px 24px';
  dialog.style.minWidth = '320px';
  dialog.style.textAlign = 'center';

  // Nội dung
  const msg = document.createElement('div');
  msg.style.fontSize = '1.1rem';
  msg.style.marginBottom = '24px';
  msg.innerText = message;
  dialog.appendChild(msg);

  // Nút

  const btnYes = document.createElement('button');
  btnYes.innerText = 'Xác nhận';
  btnYes.style.background = '#e74c3c';
  btnYes.style.color = '#fff';
  btnYes.style.border = 'none';
  btnYes.style.padding = '8px 20px';
  btnYes.style.marginRight = '12px';
  btnYes.style.borderRadius = '4px';
  btnYes.style.cursor = 'pointer';
  btnYes.style.fontWeight = 'bold';
  btnYes.addEventListener('mouseenter', () => {
    btnYes.style.background = '#c0392b';
  });
  btnYes.addEventListener('mouseleave', () => {
    btnYes.style.background = '#e74c3c';
  });

  const btnNo = document.createElement('button');
  btnNo.innerText = 'Hủy';
  btnNo.style.background = '#eee';
  btnNo.style.color = '#333';
  btnNo.style.border = 'none';
  btnNo.style.padding = '8px 20px';
  btnNo.style.borderRadius = '4px';
  btnNo.style.cursor = 'pointer';
  btnNo.style.fontWeight = 'bold';;
  btnNo.addEventListener('mouseenter', () => {
    btnNo.style.background = '#ddd';
  });
  btnNo.addEventListener('mouseleave', () => {
    btnNo.style.background = '#eee';
  }
  );

  btnYes.onclick = function() {
    document.body.removeChild(overlay);
    onConfirm();
  };
  btnNo.onclick = function() {
    document.body.removeChild(overlay);
  };

  dialog.appendChild(btnYes);
  dialog.appendChild(btnNo);
  overlay.appendChild(dialog);
  document.body.appendChild(overlay);
};

const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
  const formData = new URLSearchParams(event.body);

  const name = formData.get('name');
  const phone = formData.get('phone');
  const product = formData.get('product');
  const price = formData.get('totalPrice');
  const qty = formData.get('qty');
  const division = formData.get('division');
  const district = formData.get('district');
  const thana = formData.get('thana');
  const village = formData.get('village');
  const pickup = formData.get('pickup');

  const content = `
নতুন অর্ডার এসেছে:
---------------------
🛍 প্রোডাক্ট: ${product}
💰 দাম: ${price}
🔢 পরিমাণ: ${qty}

👤 নাম: ${name}
📞 মোবাইল: ${phone}
🏡 ঠিকানা: ${village}, ${thana}, ${district}, ${division}
📍 সংগ্রহ স্থান: ${pickup}
`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: `"Order Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: 'নতুন অর্ডার এসেছে',
      text: content
    });

    return {
      statusCode: 200,
      body: 'অর্ডার সফলভাবে পাঠানো হয়েছে'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'ইমেইল পাঠাতে সমস্যা হয়েছে'
    };
  }
};

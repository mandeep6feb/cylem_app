import RazorpayCheckout from 'react-native-razorpay';
import {COLORS, getCurrentDate} from '@app/utils/helper';
import {commonService} from '@app/services/commonService';

export const paymentHandler = (
  amount,
  userid,
  user_name,
  email,
  phone,
  success_callback,
  failed_callback,
) => {
  commonService('POST', 'api/razorpay/order', {
    amount: amount + '00',
    currency: 'INR',
    receipt: userid,
  })
    .then(data => {
      var options = {
        description: 'Secure payment processing powered by Razorpay. Thank you for choosing Cylem!',
        currency: `${data.currency}`,
        amount: `${data.amount + '00'}`,
        image: 'https://www.cylem.in/favicon.ico',
        key: `${process.env.RAZORPAY_KEY}`,
        name: 'CYLEM',
        order_id: `${data.order_id}`,
        prefill: {
          name: user_name,
          email: email,
          contact: phone,
        },
        theme: {color: COLORS.APP_GREEN},
      };

      RazorpayCheckout.open(options)
        .then(response => {
          commonService(
            'POST',
            'api/razorpay/paymentCapture',
            {
              signature: 'cylem_payment',
            },
            '113ca09e417d479123545db93c66165fdd34f219cdc0ff8efac37885462b118a',
          )
            .then(res => {
              if (res.status == 'ok') {
                const current_date = getCurrentDate();
                commonService('POST', 'api/payment/create-new-payment', {
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  transaction_status: 1,
                  amount: parseInt(amount),
                  subscription_id: 1,
                  subscription_date: current_date,
                })
                  .then(paymentData => {
                    success_callback(paymentData);
                  })
                  .catch(error => {;
                    failed_callback('Failed to create new payment!');
                  });
              } else {
                failed_callback('Failed to verify payment!');
              }
            })
            .catch(error => {
              failed_callback('Failed to verify payment!');
            });
        })
        .catch(error => {
          failed_callback('You cencel the payment !');
        });
    })
    .catch(error => {
      failed_callback('Failed to create order');
    });
};

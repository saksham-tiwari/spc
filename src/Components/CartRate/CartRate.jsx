import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { BaseUrl } from '../../server/services/BaseUrl';
import { createOrder, getCart, verifyOrder } from '../../server/services/user/user.service';
import styles from "./styles.module.css"
const CartRate = (props) => {
    const [price,setPrice] = useState(0);
    const [discount] = useState(10);
    const [total,setTotal] = useState(0);
    const [data,setData] = useState([]);
    const navigate = useNavigate();
    const getRate = ()=>{
        let y=0;
        data.forEach(x=>{y+=x.quantity*x.product.price})
        setPrice(y)
    }

    // <button id="rzp-button1">Pay</button>

const checkout = async function(e){
    e.preventDefault();
    console.log("here i am");
    let options;
    // const data = await fetch("/api/razorpay", { method: "POST" }).then((t) =>
    //   t.json()
    // );
    console.log(data);
    await createOrder(total*100)
    .then((res)=>{
        console.log(res.data.razorpay.id);
        options = {
            "key": "rzp_test_OJiQYnuFVOUynK", // Enter the Key ID generated from the Dashboard
            "amount": total*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "SPC Soap",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": res.data.razorpay.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            // "callback_url":BaseUrl+"payment/verify",
            // "redirect": true,
            "prefill": {
                "name": "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#247F70"
            },
            handler: function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                console.log(response);
                response['id'] = res.data._id;
                verifyOrder(response)
                .then((res)=>{
                    console.log(res)
                    // navigate("/order-success")
                    navigate("/order-success", { state: { redirect: true } })
                })
                .catch((err)=>{console.log(err)})
              },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    })
    .catch((err)=>{console.log(err);})
    

}


    useEffect(()=>{
        getRate()
    },[data])
    useEffect(()=>{
        setTotal(price-discount)
    },[discount,price])
    useEffect(()=>{
        getCart()
        .then(res=>{
            setData(res.data.cart)})
        .catch(err=>{console.log(err);})
    },[props.change])
  return (
    <div className={styles.cartRate}>
        <Container className={styles.container}>
            <Row className={styles.row}>
                <Col>Total Price</Col>
                <Col className={styles.second}>Rs.{price}</Col>
            </Row>
            <Row className={styles.row}>
                <Col>Discount</Col>
                <Col className={styles.second}>-Rs.{discount}</Col>
            </Row>
            <Row className={styles.row}>
                <Col>Tax</Col>
                <Col className={styles.second}>Rs.0</Col>
            </Row>
            <Row className={styles.row}>
                <Col>Convenience Fees</Col>
                <Col className={styles.second}>Free</Col>
            </Row>
            <hr className={styles.dashed}></hr>
            <Row className={styles.row}>
                <Col>Total Payable</Col>
                <Col className={styles.second}>Rs.{total}</Col>
            </Row>

        </Container>
        <button className='prim-btn' id="rzp-button1" onClick={checkout}>Proceed to Checkout</button>
    </div>
  )
}

export default CartRate
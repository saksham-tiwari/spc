import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { getCart } from '../../server/services/user/user.service';
import styles from "./styles.module.css"
const CartRate = (props) => {
    const [price,setPrice] = useState(0);
    const [discount] = useState(10);
    const [total,setTotal] = useState(0);
    const [data,setData] = useState([]);
    const getRate = ()=>{
        let y=0;
        data.forEach(x=>{y+=x.quantity*x.product.price})
        setPrice(y)
    }

    useEffect(()=>{
        getRate()
    },[data])
    useEffect(()=>{
        setTotal(price-discount)
    },[discount,price])
    useEffect(()=>{
        console.log("called me?");
        getCart()
        .then(res=>{
            console.log(res,1);
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
        <button className='prim-btn'>Proceed to Checkout</button>
    </div>
  )
}

export default CartRate
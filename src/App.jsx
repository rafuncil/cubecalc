import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Input from './components/Input';
import data from '&/data/products_full.json'
import { customSeletcStyles } from '@/scripts'
import { label, max } from 'three/tsl';




const App = () => {

  const selectOps = data.map(el => ({value: el.price, label: el.model + ` —  ${el.price.toLocaleString('ru-RU')}₽`}))

  const [price, setPrice] = useState(null);
  const [productName, setProductName] = useState(null);
  const [payment, setPayment] = useState(null);
  const [time, setTime] = useState(6);
  
  const [monthlyPrice, setMonthlyPrice] =useState('');
  const [totalPrice, setTotalPrice] =useState('');
  const [overPrice, setOverPrice] =useState('');

  const [valid, setValid] = useState([]);

  const sendReq = (e) => {
    e.preventDefault(); // чтобы страница не перзагружалась после каждого сабмита
   
    if (!price || !payment || !productName || !time || valid.find(el => el.valid == false )) 
      return alert('Все поля должны быть заполнены корректно');

    
    const message = `Ас саламу алайкум! Хочу оформить рассрочку:
      📱 Товар: ${productName}
      💰 Первый взнос: ${payment} ₽
      📆 Срок: ${time} мес.
      📤 Платёж в месяц: ${monthlyPrice} ₽
      💳 Общая стоимость: ${totalPrice} ₽`;
    
    const link = document.createElement('a')

    link.href = `https://wa.me/79627721490?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.click()
    
  }
  
  const selectChange = (e) => {
    setPrice(e.value);
    setPayment(e.value * 0.3)
    setProductName(e.label)
  }

  useEffect(() => {
    let rate = Number(time) <= 6 ? 0.06 : 0.07;
    let credit = Number(price) - Number(payment); // сумма выдаваемая в кредит без наценки
    let overCredit = Math.round(credit * (1 + rate * Number(time))/ 100) * 100; // сумма выдаваемая в кредит с наценкой 
    let monthlyPayment = Math.round(overCredit / time / 10)*10;

   
    setMonthlyPrice((monthlyPayment).toLocaleString('ru-RU') + '₽'); // ежемесячный платеж
    setTotalPrice(Math.round(monthlyPayment * time + Number(payment)).toLocaleString('ru-RU') + '₽'); // общая стоимость
    setOverPrice(Math.round(monthlyPayment * time - credit).toLocaleString('ru-RU')  + '₽') // тороговая наценка

  }, [time, payment, price])
  
  const rangePaymentOps = {
    step: 1000,
    name: 'downPayment',
    max: Math.ceil(price/1000)*1000,
    min: Math.floor(price * 0.3/1000)*1000,
    value: payment,
  
    onChange: (e) => {
      let value = e.target.value;
      const maxVal = price;
      const minVal = price * 0.3

      
      if ((value - price < 1000) && (value - price > 0)) setPayment(maxVal)
        else if ((value - price * 0.3 < 1000) && (value - price * 0.3 < 0)) setPayment(minVal)
          else setPayment(value)

    }
      
  }

  const rangeMonthOps = {
    step: 1,
    name: 'monthCount',
    min: 1,
    max: 12,
    defaultValue: 6,
    value: time,
    onChange: e => setTime(e.target.value)
  }
  
  return (<>
    <div className='form-block'>
      <img src="images/Logo.PNG" alt="logo" />
      <form className="form" onSubmit={sendReq}>
        <Select onChange={selectChange} styles={customSeletcStyles}  options={selectOps} />
        <Input name='price' onValid={setValid} title="Стоимость товара (₽)" value={price ? price : ''} type='number' readOnly/>

        <Input name='payment' onValid={setValid} title="Первоначальный взнос (₽)" min={Number(price) * 0.3} max={Number(price)} type='number' value={payment ? payment : ''} setter={setPayment} />
        <input type="range" {...rangePaymentOps} />

        <Input name='months' onValid={setValid} title="Срок рассрочки (мес.)" min={1} max={12}  type='number' value={time} setter={setTime} />
        <input type="range"  {...rangeMonthOps} />

        <div className="final-info"> 
          <p>Жемесячный платеж: <span>{monthlyPrice}</span></p>
          <p>Общая стоимость: <span>{totalPrice}</span></p>
          <p>Торговая наценка: <span>{overPrice}</span></p>
        </div>

        <button type='submit' className='btn'>Оставить заявку</button>
      </form>
    </div>
  </>
  );
};

export default App;

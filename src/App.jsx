import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Input from './components/Input';
import data from '&/data/products_full.json'
import { customSeletcStyles } from '@/scripts'
import { label, max } from 'three/tsl';




const App = () => {

  const selectOps = data.map(el => ({value: el.price, label: el.model + ` —  ${el.price.toLocaleString('ru-RU')}₽`}))
  const [selectedOption, setSelectedOption] = useState(null);

  const [price, setPrice] = useState(null);
  const [productName, setProductName] = useState(null);
  const [payment, setPayment] = useState(null);
  const [time, setTime] = useState(6);
  const [showInfo, setShowInfo] = useState(false);
  
  const [monthlyPrice, setMonthlyPrice] =useState('');
  const [totalPrice, setTotalPrice] =useState('');
  const [overPrice, setOverPrice] =useState('');

  const [valid, setValid] = useState([]);

  

  const sendReq = (e) => {
    e.preventDefault(); // чтобы страница не перзагружалась после каждого сабмита
   
    if (!price || !payment || !productName || !time || valid.find(el => el.valid == false )) 
      return alert('Все поля должны быть заполнены корректно');

    
    const message = `Ас саламу алайкум! Хочу оформить рассрочку:

      • Товар: ${productName}
      • Первый взнос: ${Number(payment).toLocaleString('ru-RU') + ' ₽'} 
      • Срок: ${time} мес.
      • Платёж в месяц: ${monthlyPrice} 
      • Общая стоимость: ${totalPrice}`;
    
    const link = document.createElement('a')

    link.href = `https://wa.me/79627721490?text=${encodeURIComponent(message)}`;
    link.target = '_blank';
    link.click()
    
  }
  
  const selectChange = (e) => {
    setPrice(e.value);
    setPayment(e.value * 0.3)
    setProductName(e.label)
    setSelectedOption(e.label)
    setShowInfo(true); // показываем блок
  }

  const isOptionSelected = (option) => {
    return selectedOption ? selectedOption === option.label : false
  }
  useEffect(() => {
    let rate = Number(time) <= 6 ? 0.06 : 0.07;
    let credit = Number(price) - Number(payment); // сумма выдаваемая в кредит без наценки
    let overCredit = Math.round(credit * (1 + rate * Number(time))/ 100) * 100; // сумма выдаваемая в кредит с наценкой 
    let monthlyPayment = Math.round(overCredit / time / 10)*10;

   
    setMonthlyPrice((monthlyPayment).toLocaleString('ru-RU') + ' ₽'); // ежемесячный платеж
    setTotalPrice(Math.round(monthlyPayment * time + Number(payment)).toLocaleString('ru-RU') + ' ₽'); // общая стоимость
    setOverPrice(Math.round(monthlyPayment * time - credit).toLocaleString('ru-RU')  + ' ₽') // тороговая наценка

  }, [time, payment, price])
  
  const rangePaymentOps = {
    step: 1000,
    name: 'downPayment',
    max: Math.ceil(price/1000)*1000,
    min: Math.round(price * 0.3/1000)*1000,
    value: payment,
  
    onChange: (e) => {
      let step = 1000;
      let value = e.target.value;
      const maxVal = price;
      const minVal = price * 0.3

      
      if ((value - price < step) && (value - price > 0)) setPayment(maxVal)
        else if ((value - price * 0.3 < step) && ((value - price * 0.3 < 0) || (value - price * 0.3 < step))) setPayment(minVal)
          else setPayment(value)

    }
      
  }

  const rangeMonthOps = {
    step: 1,
    name: 'monthCount',
    min: 1,
    max: 12,
    defaultValue: 1,
    value: time,
    onChange: e => setTime(e.target.value)
  }
  
  return (<>
    <div className='form-block'>
      <form className="form" onSubmit={sendReq}>
        <h1>Калькулятор рассрочки</h1>
        <Select 
          onChange={selectChange} 
          styles={customSeletcStyles}  
          options={selectOps} 
          isOptionSelected={isOptionSelected}
          placeholder="— Выберите —"
        />
        <Input name='price' onValid={setValid} title="Стоимость товара (₽)" value={price ? price : ''} type='number' readOnly/>

        <Input name='payment' onValid={setValid} title="Первоначальный взнос (₽)" min={Number(price) * 0.3} max={Number(price)} 
          type='number' value={payment ? payment : ''} setter={setPayment} 
        />
        <input type="range" {...rangePaymentOps} />

        <Input name='months' onValid={setValid} title="Срок рассрочки (мес.)" min={1} max={12}  placeholder= '' type='number' value={time} setter={setTime} />
        <input type="range"  {...rangeMonthOps} />

        <div className={`final-info ${showInfo ? 'visible' : 'hidden'}`}> 
          <p>Ежемесячный платеж: <span>{monthlyPrice}</span></p>
          <p>Общая стоимость: <span>{totalPrice}</span></p>
          <p>Торговая наценка: <span>{overPrice}</span></p>
        </div>
      
        <button type='submit' className='btn'>Оставить заявку
        <img src="images/WhatsApp.svg" />
        </button>
                
      </form>
    </div>
  </>
  );
};

export default App;

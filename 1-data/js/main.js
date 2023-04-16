//import products from "../../db.json" assert { type: 'json'}  
import products from "https://my-json-server.typicode.com/depechedepeche/data/data" assert { type: 'json'}  
//assert { type: 'json'}  -파일이 json이라고 확실하게 명시
//import products from "../../db.json" //js는 따로 명시할 필요 없음
//console.log(../../db.json)
const button = document.querySelector('button')


const createItem = (product)=>{  //구조분해를 해버려도 됨 {id,price,name,img}
  const ul =document.querySelector('ul');  //원래있는거 선택
  const li =document.createElement('li');
  const img =document.createElement('img');
  const p =document.createElement('p');
  const span =document.createElement('span');

  const price = new Intl.NumberFormat('ko-KR', {  //나중에 추가)각국에 맞는 숫자서식 지원하는 객체 생성자
    style: 'currency',      //통화단위
    currency: 'KRW',        //원화
  }).format(product.price); //포맷을 바꿀 데이터


  img.setAttribute('src',product.img);

  li.id = product.id;
  p.className = 'name';
  p.innerText = product.name;

  span.className = 'price';
  span.innerText = price;

  li.append(img,p,span)
  ul.append(li);
}


const importData = ()=> {
  products.map((product)=> {
    //createItem(product);
    if (!document.getElementById(product.id)) {   //나중에추가)계속 추가되는거 방지
      createItem(product);
    }
  })
}

button.addEventListener('click',importData);
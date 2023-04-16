//import products from "../../db.json" assert { type: 'json'}    로컬에서만 할때
import products from "https://my-json-server.typicode.com/depechedepeche/data/data" assert { type: 'json'} 
const button = document.querySelector('button')
const select = document.querySelector('select')
let aa;  //나중에 추가; 데이타를 검사하고 가져오기 위해,상품을 불러온 상태에서만 필터링하기 위해

const selectCategory = (event)=>{

  if(!aa){ return; }  //나중에 추가 -불러온 상품이 없는 상태에서는 필터링X

  //console.log(event)  //목록아이템 어떻게 가져오는지 찍어봄 target ... options  selectedIndex:머찍었는지 나옴
  const {selectedIndex} = event.target.options;   //구조분해
  // console.log(event.target.options[selectedIndex])  //선택한 요소를 특정하게 됨(단계별로 콘솔로찍어보자)
  const {value} = event.target.options[selectedIndex]  //구조분해 value(key)의 값(value)
  //console.log(value)

  const filterd = products.filter((product)=>{
    return product.category === value;
  })
  //console.log( filterd)
  removeItems();
  filterd.forEach((product) => {
    createItem(product);
  });      

}

const removeItems = () => {  //sort꺼 그대로 가져옴
  const items = document.querySelectorAll('li');
  items.forEach((item) => {
    item.remove();
  });
};


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
  aa = products; 

  select.selectedIndex = 0;  //셀렉트 초기화 추가
  products.map((product)=> {
    //createItem(product);
    if (!document.getElementById(product.id)) {   //나중에추가)계속 추가되는거 방지
      createItem(product);
    }
  })  
}

button.addEventListener('click',importData);
select.addEventListener('change',selectCategory);
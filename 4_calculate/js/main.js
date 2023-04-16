//import products from "../../db.json" assert { type: 'json'}    로컬에서만 할때
import products from "https://my-json-server.typicode.com/depechedepeche/data/data" assert { type: 'json'} 

let selected = []; //체크된 아이템들 저장할 배열


//계산값 화면에 보여주는 함수 정의
const updateTotal = (price) => {
  const spanResult = document.querySelector('.total-price');

  const fommatted = new Intl.NumberFormat('ko-KR', {  
    style: 'currency',      
    currency: 'KRW',        
  }).format(price); //받아오는 값 price로
  spanResult.innerHTML = fommatted;
}

//계산 함수 정의
const calculate = () => {
  // const reducer = (acc, current) => acc + current.price;
  // const result = selected.reduce(reducer,0)
  const result = selected.reduce((acc, current) => {
    return acc + current.price;
  }, 0);
  console.log('result ', result)

  updateTotal(result); //화면에 보여주는 함수 호출
};
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce


//체크박스 체크하면 실행될 함수
const addCart = (event) => {
 // console.log(event)  //target- checked:(트루/폴스) 
  //console.log(event.target.checked)
  // li.id = product.id;   -이걸 이용해서 어떤 아이템이 체크 되었는지 알아보자
  //console.log(event.target.parentElement.id)

  //위에꺼 구조분해
  const { id } = event.target.parentElement;
  const { checked } = event.target;
  console.log(id, checked)

  if(checked) {
    products.forEach(product => {
      if (product.id === parseInt(id)) {   //html에서 뽑아온 거라 id가 문자열, 숫자열로 바꿔주자(아님 ==)
        selected.push(product);
      }
    });
  } else {
    selected = selected.filter((product) => {
      return product.id !== parseInt(id);
    })
  }
  console.log(selected)

  //계산해주는 함수호출
  calculate();
}


//li만들때 체크박스 추가
const createItem = (product)=>{  //구조분해를 해버려도 됨 {id,price,name,img}
  const ul =document.querySelector('ul');  //원래있는거 선택
  const li =document.createElement('li');
  const img =document.createElement('img');
  const p =document.createElement('p');
  const span =document.createElement('span');
  const check =document.createElement('input');

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

  //check에 타입 추가, 이벤트리스너 추가
  check.setAttribute('type','checkbox');
  check.addEventListener('change', addCart); //체크박스체크 되었을때 addCart함수 실행

  li.append(check, img,p,span) //check추가
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

//button.addEventListener('click',importData);
importData()    //화면이 열리면 자동 실행

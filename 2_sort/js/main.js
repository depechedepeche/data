import products from "https://my-json-server.typicode.com/depechedepeche/data/data" assert { type: 'json'} 

const button = document.querySelector('button')
const asceBtn = document.querySelector('.ascending')
const descBtn = document.querySelector('.descending')


const removeItems = () => {  //소트된 아이템을 뿌려주기 위해 먼저 지우는 함수
  const items = document.querySelectorAll('li');
  items.forEach((item) => {
    item.remove();
  });
};

const sortAsce=()=>{ 
  const myProducts = products.sort((a,b)=>{   
    return  a.price - b.price; //가격을 비교하는거니까 price붙여줌
  });
  //console.log(myProducts)
  removeItems();
  myProducts.forEach((product)=>{
    createItem(product);
  })
};

const sortDesc=()=>{
  const myProducts = products.sort((a,b)=>{  
    return  b.price - a.price;
  });
  //console.log(myProducts)
  removeItems();
  myProducts.forEach((product)=>{
    createItem(product);
  })
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
  products.map((product)=> {
    //createItem(product);
    if (!document.getElementById(product.id)) {   //나중에추가)계속 추가되는거 방지
      createItem(product);
    }
  })
}

button.addEventListener('click',importData);
asceBtn.addEventListener('click',sortAsce);
descBtn.addEventListener('click',sortDesc);
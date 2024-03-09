let allProducts = [] ;
const PRODUCTS_PER_PAGE = 6 ;
let currentPage = 1 ;
let start = 0 , end = 0 ;
let totalPages = 0 ;

function getData(){
    $.ajax('../data/products.json',{
       success : (data) =>{
         allProducts = data ;
       },
       error : (xhr,textmsg,errorMessage) =>{
         console.log(errorMessage);
       }
    });
}
function displayData(data){
    let products = '' ;
    data.forEach(element => {
         products += `<div class='product col-12 col-md-6 col-lg-4'>
         <div class="card">
           <img src="${element.thumbnail}" class="card-img-top">
           <div class="card-body d-flex flex-column justify-content-between">
             <div>
               <h5 class="card-title">${element.title}</h5>
               <p class='card-price m-0'><span class="fs-4 text-primary">$${element.price}</span> / piece</p>
               <p class="text-muted">${element.description}</p>
             </div>
             <button href="#" class="btn btn-primary w-100 add-to-cart">Add to cart</button>
           </div>
         </div>
       </div>`
    });
    $('.products').append(products);
}
function initializePagination(){
  totalPages = Math.ceil(allProducts.length / PRODUCTS_PER_PAGE );
  let paginationItems = '' ;
  for(let i = 1 ; i <= totalPages ; i++){
      paginationItems += `<div class="pagination__btn pagination__page" data-id="${i}">${i}</div>`;
  }
  $('.pagination__pages').append(paginationItems);
}
function displayCurPage(){
  $('.products').html("");
  start = (currentPage - 1) * PRODUCTS_PER_PAGE ;
  end = start + PRODUCTS_PER_PAGE - 1 ;
  $('.pagination__page').removeClass("active");
  $(`.pagination__page[data-id="${currentPage}"]`).addClass("active");
  currentPage === 1 ? $('.pagination__left').addClass("disabled") : $('.pagination__left').removeClass("disabled");
  currentPage === totalPages ? $('.pagination__right').addClass("disabled") : $('.pagination__right').removeClass("disabled");
  displayData(allProducts.slice(start,end+1));
  /*for(start ; start <= end ; start++){
      displayData([allProducts[start]]);
  }*/
}
function initializeApp(){
    getData();
    $(document).on('ajaxComplete' , () =>{
        initializePagination();
        displayCurPage();
        $('.pagination__page').on('click', (e) =>{
          $(e.target).addClass("active");
          currentPage = +$(e.target).text();
          displayCurPage();
        });
        $('.pagination__left').on('click',() =>{
          currentPage-- ;
          displayCurPage();
        });
        $('.pagination__right').on('click',() =>{
          currentPage++ ;
          displayCurPage();
        });
    });
}



initializeApp();
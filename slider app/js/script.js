let currentSlide = 1 ; 
const imgsLenght = $(".slider__img").length ;
$(".total-counter").text(imgsLenght);


for(let i = 0 ; i < imgsLenght ; i++){
    $(".slider__pagination").append(`<div class="slider__pagination-item" data-target="${i+1}"></div>`);
}

activePagination();

$(".slider__pagination-item").on('click',(e)=>{
    currentSlide = +e.target.dataset.target ;
    showCurrentSlide();
});

$(".slider__right").on('click',()=>{
     currentSlide++ ;
     if(currentSlide === imgsLenght+1){
        currentSlide = 1 ;
     }
    showCurrentSlide();
});

$(".slider__left").on('click',()=>{
    currentSlide-- ;
    if(currentSlide === 0){
        currentSlide = imgsLenght ;
    }
    showCurrentSlide();
});


function showCurrentSlide(){
    $(".slider-wrapper").animate({
        translate : `${-(currentSlide-1) * 100}%` 
    },500);
    $(".current-counter").text(currentSlide);
    activePagination();
}

function activePagination(){
    $(".slider__pagination-item").removeClass("active");
    $(`.slider__pagination-item[data-target=${currentSlide}]`).addClass("active");
}
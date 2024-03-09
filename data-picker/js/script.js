const months = ["Januray","Feburary","March","April","May","June","Jully","August","September"
,"October","Novemeber","December"];

const dateNow = new Date();
const dateObj = {
    year : dateNow.getFullYear() ,
    month : dateNow.getMonth() ,
    day : dateNow.getDate()
}
let dateChooseObj =  {
    year : dateNow.getFullYear() ,
    month : dateNow.getMonth() ,
    day : dateNow.getDate()
}; 
renderChooseDay(dateObj.day,dateObj.month,dateObj.year);
renderDatePicker();
addInitialEvents();

function renderChooseDay(day,month,year){
    $(".curr-picked__text").text(`${day < 10 ? "0" +day:day}/${month+1 < 10 ? "0"+(month+1):(month+1)}/${year}`);
}
function addClickEvent(){
    $(".datepicker__days li").on('click', (e) =>{
        $(".datepicker__days li").removeClass("active");
        $(e.target).addClass("active");
        dateChooseObj = {
            year : dateObj.year ,
            month : dateObj.month ,
            day : +$(e.target).text()
        }
        renderChooseDay(dateChooseObj.day,dateChooseObj.month,dateChooseObj.year);
    });
}

function renderDatePicker(){
    $(".datepicker__year-text").text(dateObj.year);
    $(".datepicker__month-text").text(months[dateObj.month]);
    const CurrentDays = new Date(dateObj.year,dateObj.month+1,0).getDate();
    let daysLi = '' ;
    for(let i = 1 ; i <= CurrentDays ; i++){
        if(dateObj.year === dateChooseObj.year && dateObj.month === dateChooseObj.month && dateChooseObj.day === i){
            daysLi += `<li class="active">${i}</li>` ;
        }else{
            daysLi += `<li>${i}</li>` ;
        }
    }
    $(".datepicker__days").html(daysLi);
    addClickEvent();
}

function addInitialEvents(){
    $("#datepicker__year-prev").on('click',() =>{
        dateObj.year-- ;
        renderDatePicker();
    });
    $("#datepicker__year-next").on('click',() =>{
        dateObj.year++ ;
        renderDatePicker();
    });
    $("#datepicker__month-prev").on('click',() =>{
        dateObj.month-- ;
        if(dateObj.month < 0){
            dateObj.year-- ;
            dateObj.month = 11 ;
        }
        renderDatePicker();
    });
    $("#datepicker__month-next").on('click',() =>{
        dateObj.month++ ;
        if(dateObj.month > 11){
            dateObj.year++ ;
            dateObj.month = 0 ;
        }
        renderDatePicker();
    });
}


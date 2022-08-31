	var mySubjData=allSubject['bio ss1']

const card = document.querySelectorAll('.card-header');
  for (var index=0;index<card.length;index++){
card[index].addEventListener('click', event => {
    event.target.firstElementChild.click()
  })}

//functionn to append the data on elements
function appendD(data) {
  const questDiv = document.createElement("div");
  questDiv.setAttribute('class', `question container`);
  const h3 = document.createElement("p");
  h3.setAttribute('class', `question-item`);
  h3.setAttribute('data-key', data.id);
  h3.innerHTML = data.Question+'<br>'
  questDiv.appendChild(h3)
  optionsBox=document.createElement('div')
  optionsBox.setAttribute('class', `optionBorder`);
  var options=['a','b','c','d']
  counter.answers[counter.questIndex-1]=data.Answer
  for(let property of options){
  radioOption=data.Option[property]
  input = document.createElement("input");
  input.setAttribute('class', `form-check-input`);
  input.setAttribute('type', `radio`);
  input.setAttribute('name', counter.questIndex);
  input.setAttribute('value', radioOption);
  input.setAttribute('data-key', property)

  div=document.createElement('div')
  div.setAttribute('class', `form-check`)
  input.setAttribute('class', `form-check-input`)
  label=document.createElement('label')
  labelText=document.createTextNode(property.toUpperCase()+'. '+radioOption)
  label.appendChild(labelText)
  div.appendChild(input)
  div.appendChild(label)
  optionsBox.appendChild(div)
  questDiv.appendChild(optionsBox)
  document.getElementById('questions').appendChild(questDiv)

}
counter.questIndex+=1
}

//function to display active question on screen
function active_question(activeQuestion=0){
    var questElements=document.getElementsByClassName('question')
    k=questElements.length-1
  activeQuestion=activeQuestion<0?0:activeQuestion>k?k:activeQuestion
  //this is to make sure that the user see the last quest when reaching the first and still clickiing previous

          for(var i=0;i<questElements.length;i++){
            questElements[i].style.display='none'}
           questElements[activeQuestion].style.display='block';
            document.getElementById('questNo').innerHTML='Question '+ eval(activeQuestion+1)
           counter.gotoIndex=activeQuestion }


//function for next button
function nextQuest(argument) {
  counter.gotoIndex++
  active_question(counter.gotoIndex)
}
// function for previous button
function previous(argument) {
  counter.gotoIndex--
  active_question(counter.gotoIndex)
}


//functions to keep the user answers
    function user_answer() {  
  for (var i = 0; i < all_radio.length; i++) {
    if (all_radio[i].checked) {
      UserQuest_no=all_radio[i].name-1;
      user_answer=all_radio[i].dataset.key;
      counter.userAnswers[UserQuest_no]=user_answer;
      counter.answers[UserQuest_no]=data[UserQuest_no].answer;
      //changing background color of pagination to green
      li=document.getElementsByClassName('page-link');
      li[UserQuest_no].style.backgroundColor='#333399';
      li[UserQuest_no].style.color='white';
    }
  }}

//function to create pagination buttons to goto respective question.
function createPagination() {
    var paginationLength=mySubjData.length+1
    var ul=document.getElementById('goto')
    ul.innerHTML=''//clear all initial elements
    for(var i=1;i<paginationLength;i++){
      
    li=document.createElement('li');
    li.setAttribute('class',"page-item col-sm-1 text-center");
    a=document.createElement('a');
    a.setAttribute('class',"page-link text-center");
    a.setAttribute('href',"#");
    start=eval(i-1);//function of each pagination
    go='active_question('+start+')';
    a.setAttribute('onclick',go)
    number=document.createTextNode(i);
    a.appendChild(number);//
    li.appendChild(a);
    ul.appendChild(li)}
    }
 
 
//function to show the wrong and correct option
function show_wrong() {  
   
  for (var i = 0; i < all_radio.length; i++) {
    num=all_radio[i].name-1;
    option=  all_radio[i].parentNode
     if(all_radio[i].checked&&counter.answers[num]!=all_radio[i].dataset.key)
        {option.style.background='red';
         option.style.color='white';}
    if(counter.answers[num]==all_radio[i].dataset.key)
      {   
      option.style.backgroundColor='#223399';
      option.style.color='white';
      }
    if(counter.answers[num]==all_radio[i].dataset.key&&all_radio[i].checked)
      {   
        option.style.backgroundColor='#223399';
        option.style.color='white';
        counter.correct+=1
      }
    }
    document.getElementById('yourScore').innerHTML='You scored <br>'+counter.correct+'/40';
    document.getElementById('submitbtn').style.display='none';
    }


var counter={questIndex:1,gotoIndex:0,
userAnswers:new Array(),answers:new Array(),
correct:0,subject:'english'}

var all_radio =document.getElementsByClassName('form-check-input')

function quiz(subject) {
  subject=subject
   //change the subject first character to Uppercase
   subjHead=subject.charAt(0).toUpperCase()+subject.slice(1)
   document.getElementById('currentSubject').innerHTML=subjHead+'-Jamb CBT'
  data=allSubject[subject]
  console.log(data)
  start(data)

}        



//starting the quiz
function start(data){
document.getElementById('questions').innerHTML=''
data.forEach((question)=>appendD(question))
active_question()
createPagination()  
timeDisplay=setInterval(timer,1000)
document.body.addEventListener('click',user_answer)
element=document.getElementById('submitbtn')
element.addEventListener('click',()=>{clearInterval(timeDisplay)})
 }
 
//Time keeping codes
 function timer(){
  //getting the minutes and seconds 
  var minute=Number(document.getElementById('minute').value)
  var seconds=Number(document.getElementById('seconds').value)
  //check wether time is over
  if(minute==0&&seconds==1){document.getElementById('submitbtn').click();
 document.getElementById('modalTitle').innerHTML='Your Time is Up'}
 // calculating the width bar with respect to time left
  width=100*(minute*60+seconds)/1800
    //convert minute to seconds
    if(seconds==0){var minute=minute-1;
    document.getElementById('seconds').value=59
    if(String(minute).length==1){minute='0'+String(minute)}
    document.getElementById('minute').value=minute}
    else{seconds-=1
      if(seconds<10){seconds='0'+String(seconds)}
      document.getElementById('seconds').value=seconds}
    progressBar=document.getElementsByClassName('progress-bar')[0];
    progressBar.style.width=width+'%'
    progressBar.style.backgroundColor=width<10?'red':'blue'
      } 


function swapSubject(subject){
  counter.subject=subject
  document.getElementsByClassName('home')[0].style.display='none'
  document.getElementsByClassName('subject')[0].style.display='block'
  quiz(counter.subject)
}

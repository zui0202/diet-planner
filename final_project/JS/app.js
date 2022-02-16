// fuction definition start
// use google chart
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawAxisTickColors);

var curID;
// accounts information Array
// accounts = [['ID', 'password', 'nickname', 'gender', 'age', 'height', 'weight'], ...
var accounts = [];
// accounts data Array
// accountData = [['curID', breList, lunList, dinList], ...]
var accountData = [];
// meal & workout breList
// [['date', 'food1', 'intake1', 'cal1'], ...]
var breList = [];
var lunList = [];
var dinList = [];
// [['date', 'workout1', 'des1', 'link1', 'cal1'], ...]
var workList = [];

// [['date', 'memo'], ...]
var memoList = [];

// [['date', 'weight', 'waistliine', 'thight'], ...]
var bodyList  = [];

// InputIs is a flag that checks whether input already has a value.
var breInputIs = false;
var lunInputIs = false;
var dinInputIs = false;
var workInputIs = false;
// NewNumber is the array order of values to be newly added to the array.
var breNewArrNum;
var lunNewArrNum;
var dinNewArrNum;
var workNewArrNum;
var memoNewArrNum;

// menu start
// menu open function
function menuOpen(){
  $('.menu-wrapper').show();
  document.querySelector('.menu').classList.add('on');
}

function menuClose(){
  document.querySelector('.menu').classList.remove('on');
  setTimeout(function(){
    $('.menu-wrapper').hide();
  }, 300);
}

// initial page start
// go to initial page (logout)
function goToIni(){
  $('.login-wrapper').hide();
  $('.register-wrapper').hide();
  $('.daily-wrapper').hide();
  $('.chart-wrapper').hide();
  $('.mypage-wrapper').hide();
  $('.bestday-wrapper').hide();
  $('.calendar-wrapper').hide();
  $('.initial-wrapper').show();
}

// go to login
function goToLogin(){
  $('.initial-wrapper').hide();
  $('.login-wrapper').show();
}

// go to register
function goToRegister(){
  $('.initial-wrapper').hide();
  $('.register-wrapper').show();
}

function logout(){
  $('.mainHeader').hide();
  goToIni();
}

// ---------------------------
// login page start
// click login button
function login(){
  var loginIs = false;
  // check ID
  if ($('.loginID').val() == ''){
    $('.loginBox #IDWarning').text('Please enter your ID');
    $('.loginBox #IDWarning').show();
  }
  // check password
  if ($('.loginPW').val() == ''){
    $('.loginBox #PwWarning').text('Please enter your password');
    $('.loginBox #PwWarning').show();
  }
  // login check
  var id = $('.loginID').val();
  var password = $('.loginPW').val();
  for (let i=0; i<accounts.length; i++){
    if ((accounts[i][0] == id) && (accounts[i][1] == password)){
      loginIs = true;
    }
  }
  if (loginIs == true){
    curID = id;
    goToCal();
    $('.loginInstruction').text('Please enter your ID and password.');
    $('input').val('');
  } else {
    $('.loginInstruction').css('color', 'red');
    $('.loginInstruction').text('ID or Password is wrong. Please retry.');
  }
}

// go to register from login
function toRegiFromLogin(){
  $('.login-wrapper').hide();
  $('.register-wrapper').show();
}

// ---------------------------
// register page start
// click register button
function checkPW(password){
  var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
  if (!reg.test(password)){
    return false;
  } else {
    return true;
  }
}

function register(){
  var accountID;
  var accountPw;
  var accountNick;
  var accountGender;
  var accountAge;
  var accountHeight;
  var accountWeight;
  var flag = true;
  // ['ID', 'pw', 'nickname', 'gender', 'age', ' height', 'weight']
  // ID check
  // if user doesn't enter ID
  if ($('.registerID').val() == ''){
    $('.registerBox #IDWarning').text('Please enter your ID');
    $('.registerBox #IDWarning').show();
    flag = false;
  } else {
    var id = $('.registerID').val();
    for (let i=0; i<accounts.length; i++){
      if (accounts[i][0] == id){
        $('.registerBox #IDWarning').text('The same ID already exists.');
        $('.registerBox #IDWarning').show();
        flag = false;
      }
    }
    if (flag == true){
      $('.registerBox #IDWarning').hide();
    }
  }
  // password check
  // if user doesn't enter password
  if ($('.registerPW').val() == ''){
    $('.registerBox #PwWarning').text('Please enter your password');
    $('.registerBox #PwWarning').show();
    flag = false;
  } else {
    var password = $('.registerPW').val();
    if (!checkPW(password)){
      $('.registerBox #PwWarning').text('Please enter at least 6 characters, including at least 1 uppercase/lowercase letter, at least 1 number, and at least 1 special character.');
      $('.registerBox #PwWarning').show();
      flag = false;
    } else {
      $('.registerBox #PwWarning').hide();
    }
  }
  // nickname check
  // if user doesn't enter nickname
  if ($('.registerNick').val() == ''){
    $('#NickWarning').text('Please enter your nickname');
    $('#NickWarning').show();
    flag = false;
  } else{
    $('#NickWarning').hide();
  }
  // gender check
  // if user doesn't select gender
  if ($('.registerGender').is(':checked') == false){
    $('#GenderWarning').text('Please select your gender');
    $('#GenderWarning').show();
    flag = false;
  } else{
    $('#GenderWarning').hide();
  }
  // age check
  if ($('.registerAge').val() == ''){
    $('#AgeWarning').text('Please enter your age');
    $('#AgeWarning').show();
    flag = false;
  } else{
      $('#AgeWarning').hide();
  }
  // height check
  if ($('.registerH').val() == ''){
    $('#HeightWarning').text('Please enter your height');
    $('#HeightWarning').show();
    flag = false;
  } else{
    $('#HeightWarning').hide();
  }
  // weight check
  if ($('.registerW').val() == ''){
    $('#WeightWarning').text('Please enter your weight');
    $('#WeightWarning').show();
    flag = false;
  } else{
    $('#WeightWarning').hide();
  }

  // if user fill in all register form
  if (flag == true){
    accountID = $('.registerID').val();
    accountPw = $('.registerPW').val();
    accountNick = $('.registerNick').val();
    accountGender = $('.registerGender:checked').val();
    accountAge = $('.registerAge').val();
    accountHeight = $('.registerH').val();
    accountWeight = $('.registerW').val();
    var newArr = [accountID, accountPw, accountNick, accountGender, accountAge, accountHeight, accountWeight];
    var len = accounts.length;
    accounts[len] = newArr;
    // register success
    alert('You are registered.');
    $('input').val('');
    $('.registerGender').prop('checked', false);
    $('#IDWarning').text('');
    $('#PwWarning').text('');
    $('#NickWarning').text('');
    $('#GenderWarning').text('');
    $('#AgeWarning').text('');
    $('#HeightWarning').text('');
    $('#WeightWarning').text('');
  }
}

// go to login from register
function toLoginFromRegi(){
  $('.register-wrapper').hide();
  $('.login-wrapper').show();
}

// ---------------------------
// calendar page start
// go to calendar function
function goToCal(){
  $('.mainHeader').show();
  $('.login-wrapper').hide();
  $('.daily-wrapper').hide();
  $('.chart-wrapper').hide();
  $('.mypage-wrapper').hide();
  $('.bestday-wrapper').hide();
  $('.calendar-wrapper').show();
}

// render calendar function
let date = new Date();
function renderCalendar(){
  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();


  var month;
  switch (viewMonth){
    case 0: month = 'Jan'; break;
    case 1: month = 'Feb'; break;
    case 2: month = 'Mar'; break;
    case 3: month = 'Apr'; break;
    case 4: month = 'May'; break;
    case 5: month = 'Jun'; break;
    case 6: month = 'Jul'; break;
    case 7: month = 'Aug'; break;
    case 8: month = 'Sep'; break;
    case 9: month = 'Oct'; break;
    case 10: month = 'Nov'; break;
    case 11: month = 'Dec'; break;
  }

  // fill in year-month
  document.querySelector('.year-month').textContent = `${month} ${viewYear}`;

  // prevLast => last date of previous month
  // thisLast => last date of this month
  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  // Dates array => Dates of previous month, this month, and next month
  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  // calculate prevDates
  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }

  // calculate nextDates
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i)
  }

  // combine Dates of previous month, this month, and next month
  const dates = prevDates.concat(thisDates, nextDates);

  // arrange Dates
  const firstDateIndex = dates.indexOf(1);
  const lastDateIndex = dates.lastIndexOf(TLDate);
  dates.forEach((date, i) => {
    const condition = i >= firstDateIndex && i < lastDateIndex + 1
                      ? 'this'
                      : 'other';

    dates[i] = `<div class="date" onclick="goToDaily(this)"><span class="${condition}">${date}</span></div>`;
  })

  // show Dates
  document.querySelector('.dates').innerHTML = dates.join('');

  const today = new Date();
  if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
    for (let date of document.querySelectorAll('.this')) {
      if (+date.innerText === today.getDate()) {
        date.classList.add('today');
        break;
      }
    }
  }
}

// go to previous month function
// if click '<' button, show previous month
const prevMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
}

// go to next month function
// if click '>' button, show next month
const nextMonth = () => {
  date.setDate(1);
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
}

// go to today function
// if click 'Today' button, show this month
const goToday = () => {
  date = new Date();
  renderCalendar();
}

// ---------------------------
// chart page start
// go to chart function
function goToChart(){
  $('.daily-wrapper').hide();
  $('.calendar-wrapper').hide();
  $('.mypage-wrapper').hide();
  $('.bestday-wrapper').hide();
  $('.chart-wrapper').show();
}

// draw chart function
function drawAxisTickColors() {
  var data = new google.visualization.DataTable();
  data.addColumn('number', 'X');
  data.addColumn('number', 'Dogs');
  data.addColumn('number', 'Cats');

  data.addRows([
    [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
    [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24]
  ]);

  var options = {
    hAxis: {
      title: 'Time',
      textStyle: {
        color: '#01579b',
        fontSize: 20,
        fontName: 'Arial',
        bold: true,
        italic: true
      },
      titleTextStyle: {
        color: '#01579b',
        fontSize: 16,
        fontName: 'Arial',
        bold: false,
        italic: true
      }
    },
    vAxis: {
      title: 'Popularity',
      textStyle: {
        color: '#1a237e',
        fontSize: 20,
        bold: true
      },
      titleTextStyle: {
        color: '#1a237e',
        fontSize: 24,
        bold: true
      }
    },
    colors: ['#a52714', '#097138']
  };
  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}

// -------------------------
// daily page
// go to daily function
function goToDaily(day){
  // user cannot click the day of previous month or next month
  if (day.children[0].classList.contains('other')){
    return;
  }
  // before showing daily page, remove all input created at previous try
  removeRow(document.querySelector('.breakAddBtn'));
  removeRow(document.querySelector('.lunchAddBtn'));
  removeRow(document.querySelector('.dinnerAddBtn'));
  removeRow(document.querySelector('.workoutAddBtn'));

  // fill in daily page
  var date = day.innerText;
  var yearMonth = document.querySelector('.year-month').innerHTML;
  var yearMonthArray = yearMonth.split(' ');
  var month;
  switch (yearMonthArray[0]) {
    case 'Jan': month = 1; break;
    case 'Feb': month = 2; break;
    case 'Mar': month = 3; break;
    case 'Apr': month = 4; break;
    case 'May': month = 5; break;
    case 'Jun': month = 6; break;
    case 'Jul': month = 7; break;
    case 'Aug': month = 8; break;
    case 'Sep': month = 9; break;
    case 'Oct': month = 10; break;
    case 'Nov': month = 11; break;
    case 'Dec': month = 12; break;
  }

  // show daily page and hide calendar page
  $('.calendar-wrapper').hide();
  $('.daily-wrapper').show();

  document.querySelector('.dateDaily').innerText = yearMonthArray[1] + '.' + month + '.' + date;

  getTable('breakfast');
  getTable('lunch');
  getTable('dinner');
  getTable('workout');

  addRow(document.querySelector('.breakAddBtn'));
  addRow(document.querySelector('.lunchAddBtn'));
  addRow(document.querySelector('.dinnerAddBtn'));
  addRow(document.querySelector('.workoutAddBtn'));

  removeMemo();
  getMemo();

  removeBody();
  getBody();
}

// like function
function like(){
  $('.like-img').attr('src', 'asset/like_red.png');

  // calculate calories intake
  var calIntake = 0
  for (let i=0; i<breList.length; i++){
    if (getArr('breakfast', i, 0) === $('.dateDaily').text()){
      calIntake += parseInt(getArr('breakfast', i, 3));
    }
  }
  for (let i=0; i<lunList.length; i++){
    if (getArr('lunch', i, 0) === $('.dateDaily').text()){
      calIntake += parseInt(getArr('lunch', i, 3));
    }
  }
  for (let i=0; i<dinList.length; i++){
    if (getArr('dinner', i, 0) === $('.dateDaily').text()){
      calIntake += parseInt(getArr('dinner', i, 3));
    }
  }

  // calculate calories burn
  var calBurn = 0;
  for (let i=0; i<workList.length; i++){
    if (getArr('workout', i, 0) === $('.dateDaily').text()){
      calBurn += parseInt(getArr('workout', i, 4));
    }
  }

  var weight = 0;
  var waist = 0;
  for (let i=0; i<bodyList.length; i++){
    if (getArr('body', i, 0) === $('.dateDaily').text()){
      weight = getArr('body', i, 1);
      waist = getArr('body', i, 2);
    }
  }
  var date = $('.dateDaily').text();


  var newTable = document.createElement('table');

  var newTBody = document.createElement('tbody');

  var newTr1 = document.createElement('tr');
  var newTr2 = document.createElement('tr');
  var newTr3 = document.createElement('tr');

  var newTh = document.createElement('th');
  newTh.setAttribute('colspan', '4');
  newTh.innerText = date;

  var newTd1 = document.createElement('td');
  newTd1.setAttribute('style', 'width: calc(300%/8)');
  newTd1.innerText = 'calories intake';
  var newTd2 = document.createElement('td');
  newTd2.setAttribute('style', 'width: calc(100%/8)');
  newTd2.innerText = calIntake + '';
  var newTd3 = document.createElement('td');
  newTd3.setAttribute('style', 'width: calc(300%/8)');
  newTd3.innerText = 'calories burn';
  var newTd4 = document.createElement('td');
  newTd4.innerText = calBurn + '';

  var newTd5 = document.createElement('td');
  newTd5.innerText = 'weight';
  var newTd6 = document.createElement('td');
  newTd6.innerText = weight + '';
  var newTd7 = document.createElement('td');
  newTd7.innerText = 'waist';
  var newTd8 = document.createElement('td');
  newTd8.innerText = waist + '';



  newTr1.appendChild(newTh);
  newTr2.appendChild(newTd1);
  newTr2.appendChild(newTd2);
  newTr2.appendChild(newTd3);
  newTr2.appendChild(newTd4);
  newTr3.appendChild(newTd5);
  newTr3.appendChild(newTd6);
  newTr3.appendChild(newTd7);
  newTr3.appendChild(newTd8);

  newTBody.appendChild(newTr1);
  newTBody.appendChild(newTr2);
  newTBody.appendChild(newTr3);

  newTable.appendChild(newTBody);

  document.querySelector('.bestdayBox').appendChild(newTable);
}

// get table function
function getTable(target){
  var targetTBody;
  switch (target){
    case 'breakfast':
      targetTBody = document.querySelector('.breakfast-table').children[1];
      break;
    case 'lunch':
      targetTBody = document.querySelector('.lunch-table').children[1];
      break;
    case 'dinner':
      targetTBody = document.querySelector('.dinner-table').children[1];
      break;
    case 'workout':
      targetTBody = document.querySelector('.workout-table').children[1];
      break;
  }
  for (let i=0; i<getArr(target).length; i++){
    // case 1: workout table
    if (target == 'workout'){
      if (getArr(target, i, 0) === $('.dateDaily').text()){
        var newTr = document.createElement('tr');

        var newTypeTd = document.createElement('td');
        var newDesTd = document.createElement('td');
        var newLiTd = document.createElement('td');
        var newCalTd = document.createElement('td');

        var newTypeInput = document.createElement('input');
        newTypeInput.setAttribute('type', 'text');
        newTypeInput.setAttribute('onclick', 'clickInput(this)');
        newTypeInput.setAttribute('onchange', 'changeInput(this)');
        newTypeInput.classList.add('typeInput');
        newTypeInput.value = getArr(target, i, 1);
        var newDesInput = document.createElement('input');
        newDesInput.setAttribute('type', 'text');
        newDesInput.setAttribute('onclick', 'clickInput(this)');
        newDesInput.setAttribute('onchange', 'changeInput(this)');
        newDesInput.classList.add('desInput');
        newDesInput.value = getArr(target, i, 2);
        var newLiInput = document.createElement('textarea');
        newLiInput.setAttribute('cols', '80');
        newLiInput.setAttribute('onclick', 'clickInput(this)');
        newLiInput.setAttribute('onchange', 'resize(this); changeInput(this)');
        newLiInput.classList.add('linkInput');
        newLiInput.value = getArr(target, i, 3);
        var newCalInput = document.createElement('input');
        newCalInput.setAttribute('type', 'number');
        newCalInput.setAttribute('onclick', 'clickInput(this)');
        newCalInput.setAttribute('onchange', 'changeInput(this)');
        newCalInput.classList.add('calInput');
        newCalInput.value = getArr(target, i, 4);

        newTypeTd.appendChild(newTypeInput);
        newDesTd.appendChild(newDesInput);
        newLiTd.appendChild(newLiInput);
        newCalTd.appendChild(newCalInput);

        newTr.appendChild(newTypeTd);
        newTr.appendChild(newDesTd);
        newTr.appendChild(newLiTd);
        newTr.appendChild(newCalTd);

        targetTBody.appendChild(newTr);
      }
    }
    // case 2: breakfast/lunch/dinner table
    else {
      if (getArr(target, i, 0) === $('.dateDaily').text()){
        var newTr = document.createElement('tr');

        var newFoodTd = document.createElement('td');
        var newIntakeTd = document.createElement('td');
        var newCalTd = document.createElement('td');

        var newFoodInput = document.createElement('input');
        newFoodInput.setAttribute('type', 'text');
        newFoodInput.setAttribute('onclick', 'clickInput(this)');
        newFoodInput.setAttribute('onchange', 'changeInput(this)');
        newFoodInput.classList.add('foodInput');
        newFoodInput.value = getArr(target, i, 1);
        var newIntakeInput = document.createElement('input');
        newIntakeInput.setAttribute('type', 'text');
        newIntakeInput.setAttribute('onclick', 'clickInput(this)');
        newIntakeInput.setAttribute('onchange', 'changeInput(this)');
        newIntakeInput.classList.add('intakeInput');
        newIntakeInput.value = getArr(target, i, 2);
        var newCalInput = document.createElement('input');
        newCalInput.setAttribute('type', 'number');
        newCalInput.setAttribute('onclick', 'clickInput(this)');
        newCalInput.setAttribute('onchange', 'changeInput(this)');
        newCalInput.classList.add('calInput');
        newCalInput.value = getArr(target, i, 3);

        newFoodTd.appendChild(newFoodInput);
        newIntakeTd.appendChild(newIntakeInput);
        newCalTd.appendChild(newCalInput);

        newTr.appendChild(newFoodTd);
        newTr.appendChild(newIntakeTd);
        newTr.appendChild(newCalTd);

        targetTBody.appendChild(newTr);
      }
    }
  }
}

function removeMemo(){
  $('.memoText').val('');
}

function getMemo(){
  for (let i=0; i<memoList.length; i++){
    if (memoList[i][0] == $('.dateDaily').text()){
      document.querySelector('.memoText').value = getArr('memo', i, 1);
    }
  }
}

function removeBody(){
  $('.weightInput').val('');
  $('.waistInput').val('');
  $('.thighInput').val('');
}

function getBody(){
  for (let i=0; i<bodyList.length; i++){
    if (bodyList[i][0] == $('.dateDaily').text()){
      document.querySelector('.weightInput').value = getArr('body', i, 1);
      document.querySelector('.waistInput').value = getArr('body', i, 2);
      document.querySelector('.thighInput').value = getArr('body', i, 3);
    }
  }
}

// set array function
function setArr(){
  // 3 arguments
  // arr[i] = input
  if (arguments.length == 3){
    var i = arguments[1];
    var input = arguments[2];
    switch (arguments[0]){
      case 'breakfast':
        breList[i] = input;
        break;
      case 'lunch':
        lunList[i] = input;
        break;
      case 'dinner':
        dinList[i] = input;
        break;
      case 'workout':
        workList[i] = input;
        break;
      case 'memo':
        memoList[i] = input;
      case 'body':
        bodyList[i] = input;
    }
  }
}

// get array function
function getArr(){
  // 1 argument
  // getArr(target)
  // return only array
  if (arguments.length == 1){
    switch (arguments[0]) {
      case 'breakfast':
        return breList;
      case 'lunch':
        return lunList;
      case 'dinner':
        return dinList;
      case 'workout':
        return workList;
      case 'memo':
        return memoList;
      case 'body':
        return bodyList;
    }
  }
  // 2 arguments
  // getArr(target, i)
  // return arr[i]
  else if (arguments.length == 2){
    var i = arguments[1];
    switch (arguments[0]) {
      case 'breakfast':
        return breList[i];
      case 'lunch':
        return lunList[i];
      case 'dinner':
        return dinList[i];
      case 'workout':
        return workList[i];
      case 'memo':
        return memoList[i];
      case 'body':
        return bodyList[i];
    }
  }
  // 3 arguments
  // getArr(target, i, j)
  // return arr[i][j]
  else if (arguments.length == 3){
    var i = arguments[1];
    var j = arguments[2];
    switch (arguments[0]) {
      case 'breakfast':
        return breList[i][j];
      case 'lunch':
        return lunList[i][j];
      case 'dinner':
        return dinList[i][j];
      case 'workout':
        return workList[i][j];
      case 'memo':
        return memoList[i][j];
      case 'body':
        return bodyList[i][j];
    }
  }
}

//set inputIs (breInputIs, lunInputIs, dinInputIs)
function setInputIs(target, bool){
  switch (target){
    case 'breakfast':
      breInputIs = bool;
      break;
    case 'lunch':
      lunInputIs = bool;
      break;
    case 'dinner':
      dinInputIs = bool;
      break;
    case 'workout':
      workInputIs = bool;
      break;
  }
}

// get inputis
function getInputIs(target){
  switch (target){
    case 'breakfast':
      return breInputIs;
    case 'lunch':
      return lunInputIs;
    case 'dinner':
      return dinInputIs;
    case 'workout':
      return workInputIs;
  }
}

// set array length num
function setNewArrNum(target, i){
  switch (target){
    case 'breakfast':
      breNewArrNum = i;
      break;
    case 'lunch':
      lunNewArrNum = i;
      break;
    case 'dinner':
      dinNewArrNum = i;
      break;
    case 'workout':
      workNewArrNum = i;
      break;
    case 'memo':
      memoNewArrNum = i;
  }
}

// get array length num
function getNewArrNum(target){
  switch (target){
    case 'breakfast':
      return breNewArrNum;
    case 'lunch':
      return lunNewArrNum;
    case 'dinner':
      return dinNewArrNum;
    case 'workout':
      return workNewArrNum;
    case 'memo':
      return memoNewArrNum;
  }
}

// onclick function
function clickInput(e){
  var table = e.parentElement.parentElement.parentElement.parentElement;
  var target;
  var targetInputIs;
  if (table.classList.contains('breakfast-table')){
    target = 'breakfast';
    tagetArr = breList;
  } else if (table.classList.contains('lunch-table')){
    target = 'lunch';
    tagetArr = lunList;
  } else if (table.classList.contains('dinner-table')){
    target = 'dinner';
    tagetArr = dinList;
  } else if (table.classList.contains('workout-table')){
    target = 'workout';
    tagetArr = workList;
  }

  if ((e.className == 'typeInput') || (e.className == 'foodInput')){
    for (let i=0; i<getArr(target).length; i++){
      if ((getArr(target, i, 0) === $('.dateDaily').text()) && (getArr(target, i, 1) === e.value)){
        setInputIs(target, true);
        setNewArrNum(target, i);
        return;
      }
    }
    setInputIs(target, false);
  }
  // click intakeInput, desInput, linkInput, and calInput
  else {
    var thisType = e.parentElement.parentElement.children[0].children[0];
    for (let i=0; i<getArr(target).length; i++){
      if ((getArr(target, i, 0) === $('.dateDaily').text()) && (getArr(target, i, 1) === thisType.value)){
        setInputIs(target, true);
        setNewArrNum(target, i);
        return;
      }
    }
    setInputIs(target, false);
  }
}

// onchange function
function changeInput(e){
  // set target and targetInputIs
  var table = e.parentElement.parentElement.parentElement.parentElement;
  var target;
  var targetInputIs;
  if (table.classList.contains('breakfast-table')){
    target = 'breakfast';
    tagetArr = breList;
  } else if (table.classList.contains('lunch-table')){
    target = 'lunch';
    tagetArr = lunList;
  } else if (table.classList.contains('dinner-table')){
    target = 'dinner';
    tagetArr = dinList;
  } else if (table.classList.contains('workout-table')){
    target = 'workout';
    tagetArr = workList;
  }

  // change typeinput
  if (e.className == 'foodInput'){
    // thisCal => calInput in same row
    var thisIntake = e.parentElement.parentElement.children[1].children[0];
    var thisCal = e.parentElement.parentElement.children[2].children[0];
    // fill in new row
    var newArrDate = $('.dateDaily').text();
    var newArrFood = e.value;
    var newArrIntake = thisIntake.value;
    var newArrCal = thisCal.value;
    var newArr = [newArrDate, newArrFood, newArrIntake, newArrCal];
    // if input is alreday exist in array
    if (getInputIs(target) == false){
      // if both type input and calories input aren't empty
      if (thisCal.value.trim() !== ''){
        setNewArrNum(target, getArr(target).length);
        setArr(target, getNewArrNum(target), newArr);
      }
    } else if (getInputIs(target) == true){
      if (e.value.trim() === ''){
        getArr(target).splice(getNewArrNum(target), 1);
        return;
      }
      setArr(target, getNewArrNum(target), newArr);
    }
  }
  // chagne intakeInput
  else if (e.className == 'intakeInput'){
    var thisFood = e.parentElement.parentElement.children[0].children[0];
    var thisCal = e.parentElement.parentElement.children[2].children[0];
    var newArrDate = $('.dateDaily').text();
    var newArrFood = thisFood.value;
    var newArrIntake = e.value;
    var newArrCal = thisCal.value;
    var newArr = [newArrDate, newArrFood, newArrIntake, newArrCal];
    // if input is already exist in array
    if (getInputIs(target) == false){
      if (thisFood.value.trim() !== ''){
        // if both type input and calories input aren't empty
        setNewArrNum(target, getArr(target).length);
        setArr(target, getNewArrNum(target), newArr);
      }
    } else if (getInputIs(target) == true){
      setArr(target, getNewArrNum(target), newArr);
    }
  }
  // change calInput
  else if (e.className == 'calInput'){
    var table = e.parentElement.parentElement.parentElement.parentElement;
    if (table.classList.contains('intake-table')){
      var thisType = e.parentElement.parentElement.children[0].children[0];
      var thisIntake = e.parentElement.parentElement.children[1].children[0];
      var newArrDate = $('.dateDaily').text();
      var newArrType = thisType.value;
      var newArrIntake = thisIntake.value;
      var newArrCal = e.value;
      var newArr = [newArrDate, newArrType, newArrIntake, newArrCal];
    } else {
      var thisType = e.parentElement.parentElement.children[0].children[0];
      var thisDes = e.parentElement.parentElement.children[1].children[0];
      var thisLink = e.parentElement.parentElement.children[2].children[0];
      var newArrDate = $('.dateDaily').text();
      var newArrType = thisType.value;
      var newArrDes = thisDes.value;
      var newArrLink = thisLink.value;
      var newArrCal = e.value;
      var newArr = [newArrDate, newArrType, newArrDes, newArrLink, newArrCal];
    }
    // if input is already exist in array
    if (getInputIs(target) == false){
      if (thisType.value.trim() !== ''){
        // if both type input and calories input aren't empty
        setNewArrNum(target, getArr(target).length);
        setArr(target, getNewArrNum(target), newArr);
      }
    } else if (getInputIs(target) == true){
      if (e.value.trim() === ''){
        getArr(target).splice(getNewArrNum(target), 1);
        return;
      }
      setArr(target, getNewArrNum(target), newArr);
    }
  }

  // change typeInput
  else if (e.className == 'typeInput'){
    // thisCal => calInput in same row
    var thisDes = e.parentElement.parentElement.children[1].children[0];
    var thisLink = e.parentElement.parentElement.children[2].children[0];
    var thisCal = e.parentElement.parentElement.children[3].children[0];

    // fill in new row
    var newArrDate = $('.dateDaily').text();
    var newArrType = e.value;
    var newArrDes = thisDes.value;
    var newArrLink = thisLink.value;
    var newArrCal = thisCal.value;
    var newArr = [newArrDate, newArrType, newArrDes, newArrLink, newArrCal];
    // if input is alreday exist in array
    if (getInputIs(target) == false){
      // if both type input and calories input aren't empty
      if (thisCal.value.trim() !== ''){
        setNewArrNum(target, getArr(target).length);
        setArr(target, getNewArrNum(target), newArr);
      }
    } else if (getInputIs(target) == true){
      if (e.value.trim() === ''){
        getArr(target).splice(getNewArrNum(target), 1);
        return;
      }
      setArr(target, getNewArrNum(target), newArr);
    }
  }
  // change Description
  else if (e.className == 'desInput'){
    var thisType = e.parentElement.parentElement.children[0].children[0];
    var thisLink = e.parentElement.parentElement.children[2].children[0];
    var thisCal = e.parentElement.parentElement.children[3].children[0];
    var newArrDate = $('.dateDaily').text();
    var newArrType = thisType.value;
    var newArrDes = e.value;
    var newArrLink = thisLink.value;
    var newArrCal = thisCal.value;
    var newArr = [newArrDate, newArrType, newArrDes, newArrLink, newArrCal];
    // if input is already exist in array
    if (getInputIs(target) == false){
      if ((thisType.value.trim() !== '') && (thisCal.value.trim() !== '')){
        // if both type input and calories input aren't empty
        setNewArrNum(target, getArr(target).length);
        setArr(target, getNewArrNum(target), newArr);
      }
    } else if (getInputIs(target) == true){
      setArr(target, getNewArrNum(target), newArr);
    }
  }
  // change link
  else if (e.className == 'linkInput'){
    var thisType = e.parentElement.parentElement.children[0].children[0];
    var thisDes = e.parentElement.parentElement.children[1].children[0];
    var thisCal = e.parentElement.parentElement.children[3].children[0];
    var newArrDate = $('.dateDaily').text();
    var newArrFood = thisType.value;
    var newArrDes = thisDes.value;
    var newArrLink = e.value;
    var newArrCal = thisCal.value;
    var newArr = [newArrDate, newArrType, newArrDes, newArrLink, newArrCal];
    // if input is already exist in array
    if (getInputIs(target) == false){
      if ((thisType.value.trim() !== '') && (thisCal.value.trim() !== '')){
        // if both type input and calories input aren't empty
        setNewArrNum(target, getArr(target).length);
        setArr(target, getNewArrNum(target), newArr);
      }
    } else if (getInputIs(target) == true){
      setArr(target, getNewArrNum(target), newArr);
    }
  }
}

function changeMemo(e){
  target = 'memo';
  var newArrDate = $('.dateDaily').text();
  var newArrMemo = e.value;
  var memoListLen = memoList.length;
  var newArr = [newArrDate, newArrMemo];
  for (let i=0; i<memoListLen; i++){
    if (memoList[i][0] == newArrDate){
      setArr(target, i, newArr);
      return;
    }
  }
  setArr(target, memoListLen, newArr);
}

function changeBody(e){
  var target = 'body';
  var bodyListLen = bodyList.length;
  for (let i=0; i<bodyListLen; i++){
    if (bodyList[i][0] == $('.dateDaily').text()){
      switch(e.className){
        case 'weightInput':
          bodyList[i][1] = e.value; return;
        case 'waistInput':
          bodyList[i][2] = e.value; return;
        case 'thighInput':
          bodyList[i][3] = e.value; return;
      }
    }
  }
  var newDate = $('.dateDaily').text();
  var newWeight = document.querySelector('.weightInput').value;
  var newWaist = document.querySelector('.waistInput').value;
  var newThigh = document.querySelector('.thighInput').value;
  var newArr = [newDate, newWeight, newWaist, newThigh];
  setArr(target, bodyListLen, newArr);
}

// resizing textarea function
function resize(obj) {
  obj.style.height = '100%';
  obj.style.height = (obj.scrollHeight) + 'px';
}

// remove row function
function removeRow(e){
  var tBody = e.parentElement.parentElement.parentElement.children[1];
  while(tBody.hasChildNodes()){
    tBody.removeChild(tBody.firstChild);
  }
}

// add row function
function addRow(e){
  // case 1: intake table(breakfast table, lunch table, or dinner table)
  var parentTable = e.parentElement.parentElement.parentElement;
  if (parentTable.classList.contains('intake-table')){
    var newTr = document.createElement('tr');

    var newFoodTd = document.createElement('td');
    var newIntakeTd = document.createElement('td');
    var newCalTd = document.createElement('td');

    var newFoodInput = document.createElement('input');
    newFoodInput.setAttribute('type', 'text');
    newFoodInput.setAttribute('onclick', 'clickInput(this)');
    newFoodInput.setAttribute('onchange', 'changeInput(this)');
    newFoodInput.classList.add('foodInput');
    var newIntakeInput = document.createElement('input');
    newIntakeInput.setAttribute('type', 'text');
    newIntakeInput.setAttribute('onclick', 'clickInput(this)');
    newIntakeInput.setAttribute('onchange', 'changeInput(this)');
    newIntakeInput.classList.add('intakeInput');
    var newCalInput = document.createElement('input');
    newCalInput.setAttribute('type', 'number');
    newCalInput.setAttribute('onclick', 'clickInput(this)');
    newCalInput.setAttribute('onchange', 'changeInput(this)');
    newCalInput.classList.add('calInput');

    newFoodTd.appendChild(newFoodInput);
    newIntakeTd.appendChild(newIntakeInput);
    newCalTd.appendChild(newCalInput);

    newTr.appendChild(newFoodTd);
    newTr.appendChild(newIntakeTd);
    newTr.appendChild(newCalTd);

    var tBody = parentTable.children[1];
    tBody.appendChild(newTr);
  }
  else if (parentTable.classList.contains('burn-table')){
    var newTr = document.createElement('tr');

    var newTypeTd = document.createElement('td');
    var newDesTd = document.createElement('td');
    var newLiTd = document.createElement('td');
    var newCalTd = document.createElement('td');

    var newTypeInput = document.createElement('input');
    newTypeInput.setAttribute('type', 'text');
    newTypeInput.setAttribute('onclick', 'clickInput(this)');
    newTypeInput.setAttribute('onchange', 'changeInput(this)');
    newTypeInput.classList.add('typeInput');
    var newDesInput = document.createElement('input');
    newDesInput.setAttribute('type', 'text');
    newDesInput.setAttribute('onclick', 'clickInput(this)');
    newDesInput.setAttribute('onchange', 'changeInput(this)');
    newDesInput.classList.add('desInput');
    var newLiInput = document.createElement('textarea');
    newLiInput.setAttribute('cols', '80');
    newLiInput.setAttribute('onclick', 'clickInput(this)');
    newLiInput.setAttribute('onchange', 'resize(this); changeInput(this)');
    newLiInput.classList.add('linkInput');
    var newCalInput = document.createElement('input');
    newCalInput.setAttribute('type', 'number');
    newCalInput.setAttribute('onclick', 'clickInput(this)');
    newCalInput.setAttribute('onchange', 'changeInput(this)');
    newCalInput.classList.add('calInput');

    newTypeTd.appendChild(newTypeInput);
    newDesTd.appendChild(newDesInput);
    newLiTd.appendChild(newLiInput);
    newCalTd.appendChild(newCalInput);

    newTr.appendChild(newTypeTd);
    newTr.appendChild(newDesTd);
    newTr.appendChild(newLiTd);
    newTr.appendChild(newCalTd);

    var tBody = parentTable.children[1];
    tBody.appendChild(newTr);
  }
}

// --------------------------
// mypage
// go to mypage function
function goToMypage(){
  $('.daily-wrapper').hide();
  $('.calendar-wrapper').hide();
  $('.chart-wrapper').hide();
  $('.bestday-wrapper').hide();
  $('.mypage-wrapper').show();
}

function changeMypage(e){
  var curAccountNum;
  for (let i=0; i<accounts.length; i++){
    if (accounts[i][0] == curID){
      curAccountNum = i;
    }
  }
  var newNick = $('.mypageNick').val();
  var newPW = $('.mypagePW').val();
  var newPWconfirm = $('.mypagePWconfirm').val();

  if (newNick !== ''){
    accounts[curAccountNum][2] = newNick;
  }

  if (newPW !== ''){
    if (newPWconfirm == ''){
      $('.mypage-warning').show();
      return;
    } else {
      if (newPW !== newPWconfirm){
        $('.mypage-warning').show();
        return;
      } else {
        $('.mypage-warning').hide();
        accounts[curAccountNum][1] = newNick;
      }
    }
  }

  $('input').val('');
}

// --------------------------
// best day Page
// go to best day function
function goToBestday(){
  $('.daily-wrapper').hide();
  $('.calendar-wrapper').hide();
  $('.mypage-wrapper').hide();
  $('.chart-wrapper').hide();
  $('.bestday-wrapper').show();
}

// function definition finish
// --------------------------
// --------------------------
// start

// render calendar
renderCalendar();

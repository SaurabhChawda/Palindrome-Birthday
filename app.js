var InputValue = document.querySelector("#DOB");
var clickbutton = document.querySelector("#ClickOn");
var outputDOB = document.querySelector("#OutputDOB");

clickbutton.addEventListener('click', clickHandler);

function clickHandler(e){
    var bdayStr = InputValue.value;
    if(bdayStr!== ''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);

        if(isPalindrome){
            outputDOB.innerText= `Your Birthday is Palindrome!!`
            
        }
        else{
            var[ctr,nextDate]= getNextPalindromeDate(date);
            var[ptr,previousDate]= getPreviousPalindromeDate(date);
             outputDOB.innerText="The previous Date Palindrome date is " +previousDate.day+"-"+previousDate.month+"-"+previousDate.year+"\n You missed it by" +ptr+"days"+"\n The next Palindrome date is " +nextDate.day+"-"+nextDate.month+"-"+nextDate.year+"\n You missed it by"+ctr+"days"
            
        }
    }

}
function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date);
    var flag = false;
    for (var i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}
function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return[ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function convertDateToStr(date) {
    var dateStr = { day: '', month: '', year: '' };

    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    }else {
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}
function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse; 
}
function reverseStr(str) {
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
}
function getNextPalindromeDate(date){
    var ctr = 0;
    var nextDate = getNextDate(date);

    while(1){
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
          break;
        }
        nextDate = getNextDate(nextDate);
    }
    return[ctr,nextDate];
}
function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        }
    else {
            if (day > 28) {
            day = 1;
            month++;
        }
    }
 } 
    else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    return {
        day: day,
        month: month,
        year: year
    };

}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
        return false;
}
function getPreviousPalindromeDate(date) {
  var ptr = 0;
  var previousDate = getPreviousDate(date);
  while (1) {
    ptr++;
    var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ptr, previousDate];
}
function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

  if (month === 3) {
    if (isLeapYear(year)) {
      if (day < 1) {
        day = 29;
        month--;
      }
    } else {
      if (day < 1) {
        day = 28;
        month--;
      }
    }
  } else {
    if (day < 1) {
      month--;
      if (month !== 0) {
        day = daysInMonth[month - 1];
      }
    }
  }

  if (month < 1) {
    month = 12;
    day = daysInMonth[month - 1];
    year--;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}
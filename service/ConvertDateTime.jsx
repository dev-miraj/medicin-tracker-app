import moment from "moment";

// ✅ Date কে Start of the Day-তে সেট করা
export const FormatDate = (timestamp) => {
  return new Date(timestamp)
};

// ✅ Date ফরম্যাট করা (MM/DD/YYYY)
export const formatDateForText = (date) => {
  return moment(date).format("L");
};

// ✅ Time ফরম্যাট করা (9:00 AM)
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, 
  });
};

export const getDateRange=(startdate,endDate)=>{
  const start=moment(startdate,'MM/DD/YYYY')
  const end=moment(endDate,'MM/DD/YYYY')
  const dates=[]
  while(start.isSameOrBefore(end)){
    dates.push(start.format('MM/DD/YYYY'))
    start.add(1,'days')
  }
  return dates
}

export const getDateRangeToDisplay=()=>{
   const dateList=[]
   for(let i=0;i<7;i++){
    dateList.push({
      date:moment().add(i,'days').format('DD'),
      day:moment().add(i,'days').format('dd'),
      formattedDate:moment().add(i,'days').format('L')
    })
   }
   return dateList
}
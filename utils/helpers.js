module.exports = {
  format_date: (date) => {
      return date.toLocaleTimeString();
  },
created_at: (date)=>{
    return `${new Date(date)}`
}
}

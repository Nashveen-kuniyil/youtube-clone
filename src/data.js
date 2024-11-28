
export const API_KEY='AIzaSyDY3g9t6O9S77KDnLrOWxvNX_1vM60uAes';

export const value_convertor=(value)=>{
    if(value>=1000000){
       return (value/1000000).toFixed(2)+"M";
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K";
    }
    else{
        return value;
    }
}
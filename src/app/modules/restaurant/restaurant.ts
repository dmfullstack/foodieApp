export interface Restaurant{
     fav_id:number;
     user_id: string;
     address: string;
     city: string;
     average_cost_for_two : string;
     currency: string;
     cuisines: string;
     review : string;
     

     id:string;
     name:string;
     url:string;
     featured_image:string;
     
     location:Location;
     
}

export interface Location{
    address: string;
    city: string;
    zipcode:string;
    latitude:string;
    longitude:string;
}
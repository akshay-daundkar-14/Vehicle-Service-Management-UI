export interface EditVehicleRequest{
    vehicleId:number | null;
    vehicleCategory?:string;
    vehicleRegNo?:string;
    vehicleNumber?:string;
    vehicleModel?:string;
    vehicleBrand?:string;
}
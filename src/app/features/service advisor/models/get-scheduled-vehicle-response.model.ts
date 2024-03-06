export interface GetScheduledVehicles{
    scheduledServiceId:number;
    scheduledDate? : Date;
    vehicleID : number;
    serviceAdvisorID?:number;
}
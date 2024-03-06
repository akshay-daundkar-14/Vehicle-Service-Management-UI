export interface AddScheduledServiceRequest{
    vehicleID : number | null ,
    serviceAdvisorID : number |null;
    scheduledDate?:Date ;
}
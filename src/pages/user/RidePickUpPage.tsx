import PickUpLocation from "../../components/User/PublishRide/RideDetails/PickUpLocation"



const RidePickUpPage = () => {
  return (
    <PickUpLocation 
  heading="Where would you like to pick up passengers?" 
  navigateRoute="/ride-dropoff" 
  storageKey="pickUpLocation" 
/>
  )
}

export default RidePickUpPage
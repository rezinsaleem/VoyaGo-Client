import PickUpLocation from "../../components/User/PublishRide/RideDetails/PickUpLocation"


const RideDropOffPage = () => {
  return (
    <PickUpLocation 
    heading="Where would you like to drop off passengers?" 
    navigateRoute="/ride-route" 
    storageKey="dropOffLocation" 
  />
  )
}

export default RideDropOffPage
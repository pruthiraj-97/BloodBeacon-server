import axios from 'axios'
import { AddressI } from '../Interface/interface'
export async  function extractLocation(longitude:number,latitude:number){
   try {
        console.log(longitude,latitude)
        const apiendpoint=`https://api.opencagedata.com/geocode/v1/json`
        const apikey=process.env.GEOMAP_APIKEY
        const query=`${latitude},${longitude}`
        const url=`${apiendpoint}?key=${apikey}&q=${query}&pretty=1`
        const response=await axios.get(url)
        const data=response.data
        const result=data.results[0]
        const components=result.components
        console.log(components)
        const address:AddressI={
        region:components.county,
        state:components.state,
        country:components.country
    }
    console.log(address)
    return address
   } catch (error) {
       return error
   }
}
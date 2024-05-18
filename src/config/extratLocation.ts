import axios from 'axios'
import { AddressI } from '../Interface/interface'
export async  function extractLocation(longitude:number,latitude:number){
   try {
    const apiendpoint=`https://api.opencagedata.com/geocode/v1/json`
    const Apikey=process.env.MAP_KEY
    const query=`${latitude},${longitude}`
    const url=`${apiendpoint}?key=${Apikey}&q=${query}&pretty=1`
    const response=await axios.get(url)
    const data=await response.data
    const result=data.result[0]
    const components=result.components
    const address:AddressI={
        region:components.region,
        state:components.state,
        postcode:components.postcode,
        country:components.country
    }
    return address
   } catch (error) {
       return error
   }
}